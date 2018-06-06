var myApp = {}; 

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
	myApp.bst = new BST(); 
	myApp.bstDraw = new BSTDraw();
	myApp.triangulation = new Triangulation(); 

	myApp.treeInsertionOrder = document.getElementById('tree-insertion-order').value; 
	
    if (myApp.treeInsertionOrder) {
    	addToBST(myApp.bst, myApp.treeInsertionOrder); 
    	drawBST(myApp.bst, myApp.bstDraw);
    	drawTriangulation(myApp.bst, myApp.triangulation, myApp.treeInsertionOrder);
    }

    // unhide controls to rotate a node left/right
    var rotateNodeControls = document.getElementById('rotate-node-controls');
    rotateNodeControls.classList.remove('hidden');
};

/**
 * Onclick event handler for rotating a node in the tree. 
 * - We grab the inputted node to rotate and the direction (0 = rotate left, 
 *	 1 = rotate right) and update the stored BST accordingly. 
 * - Nothing will happen if trying to perform an illegal rotation 
 *   (eg. rotating a node that does not exist).
 */
function rotate(direction) {
	var node = document.getElementById('rotate-node').value;
	myApp.bst.rotateNode(parseInt(node), direction); 

	// redraw the tree visualizations after rotation
	drawBST(myApp.bst, myApp.bstDraw);
    drawTriangulation(myApp.bst, myApp.triangulation, myApp.treeInsertionOrder);
};