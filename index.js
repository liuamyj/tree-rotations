/**
 * Onclick event handler for when user runs the tree visualization. 
 * - We grab the inputted tree insertion order (a spaced separated string) and
 *   build a BST, inserting values in the specified order. 
 * - That BST is then passed to a BSTDraw object which draws the tree as an 
 *   actual tree on the HTML canvas bst-canvas. 
 * - That BST is also passed to a Triangulation object which draws the tree as
 *   a triangulated polygon on the HTML canvas triangulation-canvas. 
 */
function draw() {
	var bst = new BST(); 
	var bstDraw = new BSTDraw();
	var triangulation = new Triangulation(); 

	var treeInsertionOrder = document.getElementById('treeInsertionOrder').value; 
	
    if (treeInsertionOrder) {
    	addToBST(bst, treeInsertionOrder); 
    	drawBST(bst, bstDraw);
    	drawTriangulation(bst, triangulation, treeInsertionOrder);
    }
};
