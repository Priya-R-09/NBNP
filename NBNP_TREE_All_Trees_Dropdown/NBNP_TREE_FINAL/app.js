const panel = document.getElementById('directoryPanel');
const directoryBtn = document.getElementById('directoryBtn');
const treeSearch = document.getElementById('treeSearch');
const treeList = document.getElementById('treeList');
const treeSelect = document.getElementById('treeSelect');
const openSelected = document.getElementById('openSelected');

function openTree(id){ window.location.href = `tree.html?id=${id}`; }
function treeText(t){ return `${t.common} ${t.binomial} ${t.family} ${t.tamil}`.toLowerCase(); }

function renderTreeList(query=''){
  const q=query.toLowerCase().trim();
  const items=TREE_DATA.filter(t=>!q || treeText(t).includes(q));
  treeList.innerHTML=items.length ? items.map(t=>`
    <button class="tree-item" data-id="${t.id}">
      <span class="tree-num">${String(t.id).padStart(2,'0')}</span>
      <span class="tree-name"><b>${escapeHTML(t.common)}</b><small>${escapeHTML(t.binomial)} · ${escapeHTML(t.tamil)}</small></span>
      <span class="tree-arrow">→</span>
    </button>`).join('') : '<div class="no-result">No matching tree found.</div>';
  treeList.querySelectorAll('.tree-item').forEach(btn=>btn.addEventListener('click',()=>openTree(btn.dataset.id)));
}

function fillSelect(){
  TREE_DATA.forEach(t=>{
    const o=document.createElement('option');
    o.value=t.id;
    o.textContent=`${String(t.id).padStart(2,'0')} — ${t.common} — ${t.tamil}`;
    treeSelect.appendChild(o);
  });
}

function escapeHTML(value=''){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

directoryBtn.addEventListener('click',e=>{e.stopPropagation();panel.classList.toggle('show'); if(panel.classList.contains('show')) treeSearch.focus();});
panel.addEventListener('click',e=>e.stopPropagation());
document.addEventListener('click',()=>panel.classList.remove('show'));
treeSearch.addEventListener('input',e=>renderTreeList(e.target.value));
treeSelect.addEventListener('change',()=>{ if(treeSelect.value) openTree(treeSelect.value); });
openSelected.addEventListener('click',()=>{ if(treeSelect.value) openTree(treeSelect.value); else treeSelect.focus(); });

renderTreeList(); fillSelect();