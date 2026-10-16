import { test, expect } from '@playwright/test';
import { recipes } from '../src/recipes.js';

test('homepage, category, recipe, and breadcrumbs form a working flow', async ({ page }) => {
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading',{level:1})).toHaveText('High Protein.Low Cost.');
  await page.getByRole('link',{name:'Find your next meal'}).click();
  await expect(page.getByRole('heading',{level:1})).toHaveText('Under $1.50 High-Protein Meals.');
  await expect(page.locator('.recipe-card')).toHaveCount(4);
  await page.getByRole('heading',{name:'Lemon Chicken & Rice Bowls'}).getByRole('link').click();
  await expect(page.locator('h1')).toHaveText('Lemon Chicken & Rice Bowls.');
  await page.getByRole('link',{name:'Jump to recipe'}).click();
  await expect(page).toHaveURL(/#recipe-details$/);
  await expect(page.locator('#ingredients-list li')).toHaveCount(8);
  await expect(page.locator('.method-steps li')).toHaveCount(5);
  await page.getByRole('navigation',{name:'Breadcrumb'}).getByRole('link',{name:'Under $1.50 meals'}).click();
  await expect(page.locator('h1')).toHaveText('Under $1.50 High-Protein Meals.');
  expect(errors).toEqual([]);
});

test('categories, search, sorting, and empty state work', async ({ page }) => {
  await page.goto('/recipes?filter=under-1');
  await expect(page.locator('.recipe-card')).toHaveCount(1);
  await expect(page.locator('.recipe-card h3')).toHaveText('Cozy Red Lentil Bowls');
  await page.locator('.category-pills').getByRole('link',{name:'40g+ Protein'}).click();
  await expect(page.locator('.recipe-card')).toHaveCount(1);
  await page.locator('.category-pills').getByRole('link',{name:'20-Minute Meals'}).click();
  await expect(page.locator('.recipe-card')).toHaveCount(2);
  await page.locator('.category-pills').getByRole('link',{name:'Meal Prep'}).click();
  await expect(page.locator('.recipe-card')).toHaveCount(3);
  await page.locator('.category-pills').getByRole('link',{name:'Under $1.50'}).click();
  await page.getByRole('searchbox').fill('tuna');
  await expect(page.locator('.recipe-card')).toHaveCount(1);
  await page.getByRole('searchbox').fill('nothing-like-this');
  await expect(page.locator('.recipe-card')).toHaveCount(0);
  await page.getByRole('button',{name:'Clear search'}).click();
  await page.getByLabel('Sort recipes').selectOption('price');
  await expect(page.locator('.recipe-card h3').first()).toHaveText('Cozy Red Lentil Bowls');
  await page.getByLabel('Sort recipes').selectOption('protein');
  await expect(page.locator('.recipe-card h3').first()).toHaveText('Lemon Chicken & Rice Bowls');
  await page.getByLabel('Sort recipes').selectOption('time');
  await expect(page.locator('.recipe-card h3').first()).toHaveText('Tuna & White Bean Salad');
});

test('saved recipes persist and can be removed from the dialog', async ({ page }) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await page.getByRole('button',{name:'Save Lemon Chicken & Rice Bowls',exact:true}).click();
  await expect(page.locator('.saved-count')).toHaveText('1');
  await page.reload();
  await expect(page.getByRole('button',{name:'Unsave Lemon Chicken & Rice Bowls',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:/Saved recipes/}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('.saved-item')).toHaveCount(1);
  await page.getByRole('button',{name:'Remove Lemon Chicken & Rice Bowls from saved recipes'}).click();
  await expect(page.locator('.saved-empty')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  expect(errors).toEqual([]);
});

test('servings, checklist, ingredient totals and structured data are consistent', async ({ page }) => {
  for(const r of recipes){
    await page.goto(`/recipes/${r.slug}`);
    expect(r.ingredients.reduce((sum,i)=>sum+Math.round(i[2]*100),0)).toBe(Math.round(r.cost*400));
    await expect(page.locator('#total-cost')).toHaveText(`$${(r.cost*4).toFixed(2)}`);
    const schema=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
    expect(schema['@type']).toBe('Recipe');
    expect(schema.recipeIngredient).toHaveLength(r.ingredients.length);
    expect(schema.recipeInstructions).toHaveLength(r.steps.length);
    expect(schema.nutrition.proteinContent).toBe(`${r.protein} g`);
    await page.getByRole('button',{name:'Increase servings'}).click();
    await expect(page.locator('#serving-count')).toHaveText('6');
    await expect(page.locator('#total-cost')).toHaveText(`$${(r.cost*6).toFixed(2)}`);
    await page.locator('.ingredients-list input').first().check();
    await expect(page.locator('.ingredients-list input').first()).toBeChecked();
    await page.getByRole('button',{name:'Decrease servings'}).click();
    await page.getByRole('button',{name:'Decrease servings'}).click();
    await expect(page.locator('#serving-count')).toHaveText('2');
    await expect(page.getByRole('button',{name:'Decrease servings'})).toBeDisabled();
    await expect(page.locator('#total-cost')).toHaveText(`$${(r.cost*2).toFixed(2)}`);
  }
});

for(const width of [320,375,390,768,1024,1440]){
  test(`no horizontal overflow or missing images at ${width}px`, async({ page })=>{
    await page.setViewportSize({width,height:900});
    for(const path of ['/','/recipes?filter=under-150','/recipes/lemon-chicken-rice-bowls']){
      await page.goto(path);
      await page.evaluate(()=>document.fonts.ready);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path).toBe(true);
      expect(await page.locator('.food-photo').first().evaluate(async el=>{const url=getComputedStyle(el).backgroundImage.slice(5,-2);const img=new Image();img.src=url;await img.decode();return img.naturalWidth>0;})).toBe(true);
      if(width===375 || width===1440) await page.screenshot({path:`test-results/${width}-${path==='/'?'home':path.includes('?')?'category':'recipe'}.png`,fullPage:true});
    }
    if(width<600){await page.getByRole('button',{name:'Toggle navigation'}).click();await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Explore recipes'}).click();await expect(page.locator('h1')).toContainText('Under $1.50');}
  });
}

test('all page links and fragment targets resolve',async({page})=>{
  const paths=['/','/recipes?filter=under-150',...recipes.map(r=>`/recipes/${r.slug}`)];
  for(const path of paths){
    await page.goto(path);
    const links=await page.locator('a[href]').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
    for(const link of new Set(links)){
      const target=new URL(link,'http://127.0.0.1:5173'+path);
      expect(target.origin).toBe('http://127.0.0.1:5173');
      expect(target.pathname==='/'||target.pathname==='/recipes'||recipes.some(r=>target.pathname===`/recipes/${r.slug}`)).toBe(true);
      if(target.hash && target.pathname===new URL(path,'http://127.0.0.1:5173').pathname)await expect(page.locator(target.hash)).toHaveCount(1);
    }
  }
});
