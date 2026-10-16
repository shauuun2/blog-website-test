// Progressive enhancement only: all recipe content and navigation are already in HTML.
(function () {
'use strict';
const { recipes, matches } = window.LeanForLess;
const estimateNote = '<p class="estimate-note">*Illustrative demo estimates per serving. Actual prices and nutrition will vary.</p>';
const icons = {
 arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>', chevron: '<path d="m9 5 7 7-7 7"/>', clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 bolt:'<path d="m13 2-9 12h7l-1 8 10-12h-7z"/>', heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
 leaf:'<path d="M20 3C9 1 2 8 6 15s17 3 14-12Z"/><path d="m4 21 11-12"/>', check:'<path d="m5 12 4 4L19 6"/>',
 wallet:'<path d="M20 7H5a2 2 0 0 1 0-4h13v4M4 5v14a2 2 0 0 0 2 2h14V7m0 4h-6v5h6"/>', coin:'<circle cx="12" cy="12" r="9"/><path d="M15 8h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9m3-10v12"/>', box:'<path d="m3 7 9-4 9 4v11l-9 4-9-4Zm0 0 9 4 9-4M12 11v11M7 5l9 4"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>', close:'<path d="m6 6 12 12M6 18 18 6"/>', search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>', print:'<path d="M6 9V3h12v6M6 17H3V9h18v8h-3M6 14h12v7H6Z"/>', people:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-4a6 6 0 0 1 12 0v4m2-17a3 3 0 0 1 0 6m2 4a6 6 0 0 1 2 4v3"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>'
};
const icon = (name, cls='') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.leaf}</svg>`;
const money = n => `$${n.toFixed(2)}`;
const root = document.body.dataset.root || './';
const url = r => `${root}recipes/${r.slug}.html`;
const categoryFiles = { 'under-150': 'recipes.html', 'under-1': 'under-1.html', 'high-protein': '40g-protein.html', quick: '20-minute-meals.html', 'meal-prep': 'meal-prep.html' };
const catURL = f => root + (categoryFiles[f] || categoryFiles['under-150']);
const esc = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// file:// storage is browser-dependent. Carry this tab's collection between local pages too.
const storageKey = 'leanforless-saved';
const tabPrefix = 'leanforless-saved:';
let saved = new Set();
try {
  const tabState = location.protocol === 'file:' && window.name.startsWith(tabPrefix) ? window.name.slice(tabPrefix.length) : null;
  const raw = tabState || localStorage.getItem(storageKey) || '[]';
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) saved = new Set(parsed.filter(slug => recipes.some(r => r.slug === slug)));
} catch { /* Restricted storage never prevents recipes or in-page saving from working. */ }
function persistSaved() {
  const state = JSON.stringify([...saved]);
  let persisted = false;
  try { localStorage.setItem(storageKey, state); persisted = true; } catch { /* Keep in memory. */ }
  if (location.protocol === 'file:' && (!window.name || window.name.startsWith(tabPrefix))) {
    try { window.name = tabPrefix + state; persisted = true; } catch { /* Keep in memory. */ }
  }
  return persisted;
}
const currentRecipe = recipes.find(r => r.slug === document.body.dataset.recipe);
const photo = (r, extra='', eager=false) => `<div class="food-photo photo-${r.photo} ${extra}" role="img" aria-label="${esc(r.title)} — illustrative serving suggestion">${extra === 'recipe-photo' ? '<span class="photo-note">Illustrative serving suggestion</span>' : ''}</div>`;
function saveButton(r) { return `<button class="save-button ${saved.has(r.slug)?'is-saved':''}" data-save="${r.slug}" aria-label="${saved.has(r.slug)?'Unsave':'Save'} ${esc(r.title)}" aria-pressed="${saved.has(r.slug)}">${icon('heart')}</button>`; }
function card(r) { return `<article class="recipe-card"><div class="card-image"><a href="${url(r)}" aria-label="View ${esc(r.title)}">${photo(r)}</a><span class="price-tag">${money(r.cost)} <small>/ serving*</small></span>${saveButton(r)}</div><div class="card-content"><span class="card-kicker">${r.label}</span><h3><a href="${url(r)}">${r.title}</a></h3><p>${r.description}</p><div class="card-meta"><span>${icon('bolt')} <strong>${r.protein}g</strong> protein*</span><span>${icon('clock')} ${r.prep+r.cook} min</span><a href="${url(r)}" class="card-arrow" aria-label="Cook ${esc(r.title)}">${icon('arrow')}</a></div></div></article>`; }

let toastTimer;
function toast(message) { const el=document.querySelector('.toast'); el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2600); }
function syncSaves() { document.querySelectorAll('[data-save]').forEach(b=>{const yes=saved.has(b.dataset.save);const r=recipes.find(r=>r.slug===b.dataset.save);b.classList.toggle('is-saved',yes);b.setAttribute('aria-pressed',yes);if(b.classList.contains('save-button'))b.setAttribute('aria-label',`${yes?'Unsave':'Save'} ${r.title}`);else if(b.querySelector('span')) b.querySelector('span').textContent=yes?'Saved':'Save recipe';});document.querySelector('.saved-count').textContent=saved.size; }
function renderSaved() { const selected=recipes.filter(r=>saved.has(r.slug));document.querySelector('#saved-content').innerHTML=selected.length?selected.map(r=>`<div class="saved-item"><a href="${url(r)}">${photo(r)}<span><strong>${r.title}</strong><small>${money(r.cost)} / serving* · ${r.protein}g protein*</small></span></a><button class="icon-button" data-save="${r.slug}" aria-label="Remove ${esc(r.title)} from saved recipes">${icon('close')}</button></div>`).join('')+estimateNote:'<div class="saved-empty">'+icon('heart')+'<h3>Good things are worth keeping.</h3><p>Tap the heart on any recipe to save it here.<br>Your recipes stay in this browser.</p><a class="button" href="'+catURL('under-150')+'">Find a favorite '+icon('arrow')+'</a></div>'; }
document.addEventListener('click',e=>{const save=e.target.closest('[data-save]');if(save){const slug=save.dataset.save;saved.has(slug)?saved.delete(slug):saved.add(slug);const persisted=persistSaved();syncSaves();if(document.querySelector('#saved-dialog').open)renderSaved();else toast(!persisted?'Saved for this page visit. Browser storage is unavailable.':saved.has(slug)?'A little goodness saved for later.':'Recipe removed from your saved collection.');}
if(e.target.closest('[data-open-saved]')) {renderSaved();document.querySelector('#saved-dialog').showModal();}
if(e.target.closest('[data-close-saved]')) document.querySelector('#saved-dialog').close();
if(e.target.closest('[data-print]')) window.print();
});
const dialog=document.querySelector('#saved-dialog');dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const menu=document.querySelector('.menu-button');menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',!expanded);document.querySelector('#main-nav').classList.toggle('open',!expanded);menu.innerHTML=icon(expanded?'menu':'close');});
if(document.body.dataset.page==='category') { const results=document.querySelector('#category-results'); const update=()=>{let found=recipes.filter(r=>matches(r,results.dataset.filter));const query=document.querySelector('#recipe-search').value.toLowerCase().trim();found=found.filter(r=>(r.title+' '+r.ingredients.flat().join(' ')).toLowerCase().includes(query));const sort=document.querySelector('#recipe-sort').value;found.sort((a,b)=>sort==='price'?a.cost-b.cost:sort==='protein'?b.protein-a.protein:sort==='time'?(a.prep+a.cook)-(b.prep+b.cook):0);results.innerHTML=found.length?found.map(card).join(''):'<div class="no-results"><h3>No recipes in this little corner yet.</h3><p>Try another ingredient or clear your search.</p><button class="button outline" id="clear-search">Clear search</button></div>';document.querySelector('#results-count').textContent=`${found.length} ${found.length===1?'recipe':'recipes'} · All prices and nutrition are demo estimates`;document.querySelector('#clear-search')?.addEventListener('click',()=>{document.querySelector('#recipe-search').value='';update();document.querySelector('#recipe-search').focus();});};document.querySelector('#recipe-search').addEventListener('input',update);document.querySelector('#recipe-sort').addEventListener('change',update);update(); }
function scaledQuantity(q, factor) { if(factor===1)return q;const fractions={'¼':.25,'½':.5,'¾':.75,'1½':1.5};const m=q.match(/^(1½|[¼½¾]|\d+(?:\.\d+)?)(.*)$/);if(!m)return q;const n=(fractions[m[1]]??Number(m[1]))*factor;return `${Number(n.toFixed(3))}${m[2]}`; }
if(currentRecipe) {let servings=4;const update=()=>{const factor=servings/currentRecipe.servings;document.querySelector('#serving-count').textContent=servings;document.querySelector('#recipe-yield').textContent=`${servings} servings`;document.querySelectorAll('.method-steps li').forEach((li,i)=>li.querySelector('p').textContent=currentRecipe.steps[i][1].replace(/\bfour\b/g,String(servings)).replace('a quarter of the Greek yogurt','an equal share of the Greek yogurt'));document.querySelector('#less-servings').disabled=servings<=2;document.querySelector('#more-servings').disabled=servings>=12;document.querySelector('#ingredients-list').innerHTML=currentRecipe.ingredients.map(([q,name],i)=>`<li><label><input type="checkbox" id="ingredient-${i}"><span><strong>${scaledQuantity(q,factor)}</strong> ${name}</span></label></li>`).join('');document.querySelector('#cost-servings').textContent=servings;document.querySelector('#cost-rows').innerHTML=currentRecipe.ingredients.map(([q,name,cost])=>`<tr><th scope="row">${name}</th><td>${scaledQuantity(q,factor)}</td><td>${money(cost*factor)}</td></tr>`).join('');document.querySelector('#total-cost').textContent=money(currentRecipe.ingredients.reduce((n,i)=>n+i[2],0)*factor);};document.querySelector('#less-servings').addEventListener('click',()=>{servings=Math.max(2,servings-2);update();});document.querySelector('#more-servings').addEventListener('click',()=>{servings=Math.min(12,servings+2);update();});update(); }

syncSaves();
})();
