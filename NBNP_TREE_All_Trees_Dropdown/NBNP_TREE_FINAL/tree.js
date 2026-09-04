const id=new URLSearchParams(location.search).get('id');
const tree=TREE_DATA.find(t=>String(t.id)===String(id));
const root=document.getElementById('treeContent');

function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function blocks(text=''){return text.split(/\n+/).filter(Boolean).map(x=>`<p>${esc(x)}</p>`).join('');}

if(!tree){root.innerHTML=`<section class="not-found"><h1>Tree not found.</h1><a href="index.html#choose">Return to Tree Directory</a></section>`;}
else{
 document.title=`${tree.common} | NBNP TREE`;
 root.innerHTML=`
 <section class="tree-hero">
   <div class="tree-hero-inner">
     <a class="back" href="index.html#choose">← Back to Tree Directory</a>
     <div class="tree-index">TREE ${String(tree.id).padStart(2,'0')} / 66</div>
     <div class="family-tag">${esc(tree.family)}</div>
     <h1>${esc(tree.common)}</h1>
     <div class="botanical">${esc(tree.binomial)}</div>
     <div class="tamil-title">${esc(tree.tamil)}</div>
   </div>
 </section>
 <section class="tree-details section">
   <div class="detail-grid">
     <article><span>BOTANICAL NAME</span><h3>${esc(tree.binomial)}</h3></article>
     <article><span>FAMILY</span><h3>${esc(tree.family)}</h3></article>
     <article><span>COMMON NAME</span><h3>${esc(tree.common)}</h3></article>
     <article><span>TAMIL NAME</span><h3 class="tamil">${esc(tree.tamil)}</h3></article>
   </div>
   <div class="info-layout">
     <div>
       <div class="section-no">01 / SEASONAL INFORMATION</div>
       <div class="season-grid"><div><span>FLOWERING</span><b>${esc(tree.flowering)}</b></div><div><span>FRUITING</span><b>${esc(tree.fruiting)}</b></div></div>
     </div>
     <div class="med-card"><div class="section-no">02 / MEDICINAL VALUE</div><h2>${esc(tree.medicinal || 'Traditional information')}</h2><div class="language"><span>ENGLISH</span>${blocks(tree.english)}</div><div class="language tamil"><span>தமிழ்</span>${blocks(tree.tamilInfo)}</div></div>
   </div>
 </section>`;
}