/**
 * Triangulation object which draws a BST object as a triangulated polygon on 
 * the HTML canvas triangulation-canvas.  
 * 
 * Reference: http://www.arungudelli.com/html5/html5-canvas-polygon/
 */
var Triangulation = function() {
	// clear canvas
	var c = document.getElementById('triangulation-canvas');
	var ctx = c.getContext('2d');

	const radius = 100; // radius of (n+2)-gon
	const xStart = 180; 
	const yStart = 80;  
	const labelScale = 1.1; 

	/** 
	 * Clears the canvas 
	 */
	this.clearCanvas = function() {
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, c.width, c.height);
	}

	/** 
	* Computes the coordinates of the vertices of the (n+2)-gon. 
	* 
	* @param labels    A list of numerically sorted labels for the vertices.
	* @return vertices A map of (label, [x-coordiante, y-coordinate]) where
	* the vertex label belongs at (x-coordiante, y-coordinate) on the canvas. 
	*/ 
	this.getVertices = function(labels) {
		var vertices = new Map(); 
		var sides = labels.length;
		var angle = ((Math.PI * 2)/sides);
		for (var i = 0; i < sides; i++) {
			// +/- 0.5*radius to center at origin
			vertices.set(labels[i], 
					 	 [radius*Math.cos(angle*i) - 0.5*radius, 
					  	  radius*Math.sin(angle*i) + 0.5*radius]);
		}
		return vertices; 
	};

	/**
	 * Uses position of vertices computed by getVertices to put down all of the
	 * vertex labels. 
	 * 
	 * @param vertices A map of (label, [x-coordiante, y-coordinate])	
	 */ 
  	this.labelVertices = function(vertices) {
		ctx.beginPath();
		ctx.translate(xStart, yStart);
		ctx.moveTo(radius, 0);
		vertices.forEach(function (value, key, mapObj) {  
			ctx.lineTo(value[0], value[1]);
			ctx.fillText(key, (value[0]) * labelScale, value[1] * labelScale);
		});
		ctx.closePath();
	};

	/**
	 * Triangulates the (n+2)-gon based on the constructed BST. Triangulation 
	 * works by starting at the vertex corresponding to a particular node and 
	 * drawing a line to its left and right parents (which could be +/-inf). 
	 * 
	 * @param bst 			The BST to base the triangulation on. 
	 * @param vertices  A map of (label, [x-coordiante, y-coordinate])	
	 */ 
	this.triangulate = function(bst, vertices) {
		/**
		 * Draws a line from point c1 to c2. 
		 * 
		 * @param c1, c2	Coordinates represented as [x-coordiante, y-coordinate]
		 */ 
		var drawLine = function(c1, c2) {
			ctx.beginPath();
			ctx.moveTo(c1[0], c1[1]);
			ctx.lineTo(c2[0], c2[1]); 
			ctx.closePath();
		  	ctx.stroke();
		};

		/**
		 * Recursively triangulates the (n+2)-gon level by level starting at
		 * the root. 
		 * 
		 * @param node 		  Node object corresponding to the current node being
		 * 					  drawn into the (n+2)-gon. 
		 * @param leftParent  Value of node's left parent. 
		 * @param rightParent Value of node's right parent. 
		 */ 
		var triangulateLevel = function(node, leftParent, rightParent) {
			if (node == null) {
				return;
			}
			var valueCoords = vertices.get(node.value); 
			var rightParentCoords = vertices.get(rightParent); 
			var leftParentCoords = vertices.get(leftParent); 

			// draw lines from current node to its left and right parent
			drawLine(valueCoords, leftParentCoords); 
			drawLine(valueCoords, rightParentCoords);

			// node's left inherits node's leftParent and has node as a right parent
			// node's right has node as a left parent and inherits node's rightParent
			triangulateLevel(node.left, leftParent, node.value); 
			triangulateLevel(node.right, node.value, rightParent); 
		}

		drawLine(vertices.get('-inf'), vertices.get('inf')); 
		triangulateLevel(bst.root, '-inf', 'inf'); 
	};
};

/**
 * Public method which draws the specified BST as a (n+2)-gon triangulation. 
 * 
 * @param bst       	  The BST to draw. 
 * @param triangulation   Triangulation object to use.
 * @param input			  A space separate string containing the values inserted
 * 						  into the BST. 
 */
var drawTriangulation = function(bst, triangulation, input) {
	// sort input in ascending order to label vertices
	var valuesToAdd = input.trim().split(' ').map(Number).sort((a, b) => b - a);
	valuesToAdd.push('-inf');
	valuesToAdd.push('inf');

	var vertices = triangulation.getVertices(valuesToAdd);
	triangulation.clearCanvas();
	triangulation.labelVertices(vertices);
	triangulation.triangulate(bst, vertices); 
};