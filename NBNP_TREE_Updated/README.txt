NBNP TREE - Professional Tree Website

Folder structure:
- index.html -> Main homepage
- style.css -> Shared website design
- data.js -> All 66 tree records
- app.js -> Homepage search, filters and tree navigation
- trees/ -> Individual folder for every tree

Each tree is now stored separately:
trees/
  01_sago-palm/
    index.html
  02_alexandrian-laurel/
    index.html
  03_crocodile-bark-tree/
    index.html
  ...
  66_<tree-name>/
    index.html

How to run:
1. Open the NBNP_TREE folder in VS Code.
2. Install the Live Server extension.
3. Right-click index.html -> Open with Live Server.
4. Use Tree Directory or the collection search.
5. Clicking a tree opens that tree's own folder/index.html page.

Important:
- Each tree has its own separate folder and page.
- All individual tree pages link back to the main homepage.
- QR codes are removed.
- The website keeps English and Tamil information.

Update log (this version):
- Background redesigned: the hero and each tree's detail-hero now use a
  deep forest-toned overlay on the tree photo (professional, not washed out).
  The rest of the site uses a softer sage-toned background instead of flat
  bright white.
- Content heading sizes left as-is (confirmed okay by client).
- To add a new tree: duplicate any folder in trees/, rename it
  "NN_tree-name", edit its index.html content, and add a matching
  entry to data.js so it appears in search/filter and the directory list.
