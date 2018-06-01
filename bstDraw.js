/**
 * BSTDraw object which draws a BST object as an actual tree on the 
 * HTML canvas bst-canvas.  
 */
var BSTDraw = function() {
  const radius = 15; // radius of node
  const yOffset = 45; // vertical space between levels of the tree
  const xOffset = 25; // horizontal space between nodes

  // clear canvas
  var c = document.getElementById('bst-canvas');
  var ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);

  /** 
   * Draws a node at the designated coordinates with specified label. 
   * 
   * @param x      x-coordinate of node. 
   * @param y      y-coordinate of node.
   * @param value  label for node.
   */ 
  this.drawNode = function(x, y, value) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI); 
    ctx.stroke();
    ctx.closePath();
    ctx.strokeText(value, x, y);
  }

  /** 
   * Draws an edge from one point to another. 
   * 
   * @param xStart  starting x-coordinate of edge.
   * @param yStart  starting y-coordiante of edge. 
   * @param xEnd    ending x-coordinate of edge. 
   * @param yEnd    ending y-coordiante of edge. 
   */
  this.drawEdge = function(xStart, yStart, xEnd, yEnd) {
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd); 
    ctx.closePath();
    ctx.stroke();
  }

  /**
   * Recursively draws the BST level by level. 
   * 
   * @param x      x-coordinate of starting node. 
   * @param y      y-coordinate of starting node.
   * @param node   Node in the BST object currently being drawn. 
   */ 
  this.drawLevel = function(x, y, node) {
    if (node === null) return; 

    this.drawNode(x, y, node.value);  

    if (node.left !== null) {
      this.drawLevel(x - xOffset, y + yOffset, node.left);
      this.drawEdge(x, y, x - xOffset, y + yOffset); 
    }
    if (node.right !== null) {
      this.drawLevel(x + xOffset, y + yOffset, node.right); 
      this.drawEdge(x, y, x + xOffset, y + yOffset); 
    }
  }
};

/**
 * Public method which draws the specified BST as a tree. 
 * 
 * @param bst       The BST to draw. 
 * @param bstDraw   BSTDraw object to use. 
 */
var drawBST = function(bst, bstDraw) {
  // starting coordinates of root node
  const xStart = 150; 
  const yStart = 40; 
  bstDraw.drawLevel(xStart, yStart, bst.root);
};