/**
 * Node object representing a node in a binary search tree. 
 * Member variables: 
 * - value stores the key (an integer)
 * - left and right store the left and right children, respectively.   
 */
var Node = function(value) {
	this.value = value;
  	this.left = null;
  	this.right = null;
}

/** 
 * Binary search tree object which acts as a wrapper around the Nodes 
 * comprising the tree. 
 * Member variables: 
 * - root is a Node representing the root of the BST. 
 */
var BST = function() {
	this.root = null;

	/**
	 * Inserts specified value into the BST. 
	 */ 
	this.insert = function(value) {
		if (this.root === null) {
	      	this.root = new Node(value);
	   	} else {
	   		this.insertInto(this.root, value); 
	   	}
	}

	/** 
	 * Helper method for insert which recursively looks in the left or right
	 * subtree until the appropriate insertion location is found. 
	 */
	this.insertInto = function(root, value) {
		if (value < root.value) {
			if (root.left === null) root.left = new Node(value); 
			else this.insertInto(root.left, value); 
		} else {
			if (root.right === null) root.right = new Node(value); 
			else this.insertInto(root.right, value); 
		}
	}

	this.rotateUp = function(direction, currNode, parentNode, grandparentNode) {
		if (currNode === null) return;
		if (direction === 0) { // rotate left
			var currNodeLeft = currNode.left;
			currNode.left = parentNode; 
			parentNode.right = currNodeLeft;
		} else { // rotate right
			var currNodeRight = currNode.right;
			currNode.right = parentNode; 
			parentNode.left = currNodeRight;
		}
		// potentially update root
		if (parentNode === this.root) {
			this.root = currNode;
		}
		// potentially update grandparent node to point at new parent
		else if (grandparentNode) {
			if (parentNode.value < grandparentNode.value) {
				grandparentNode.left = currNode; 
			} else {
				grandparentNode.right = currNode;
			}
		}
	}

	this.rotateNode = function(node, direction) {
		// find node to rotate
		var grandparentNode;
		var parentNode; 
		var currNode = this.root; 
		while (true) {
			if (currNode === null) return; // node not present in tree
			else if (node === currNode.value) break; // found node
			else {
				grandparentNode = parentNode; 
				parentNode = currNode;
				currNode = (node < currNode.value) ? currNode.left : currNode.right;
			}
		}
		// if rotation would move node downwards, instead rotate 
		// right child for left rotation or left child for right rotation
		if (currNode === this.root || 
			(direction === 0 && currNode.value < parentNode.value) ||
			(direction === 1 && currNode.value > parentNode.value)) {
			grandparentNode = parentNode; 
			parentNode = currNode; 
			currNode = (direction === 0) ? currNode.right : currNode.left;
		}
		this.rotateUp(direction, currNode, parentNode, grandparentNode); 
	}
}

/**
 * Public method which populates a BST object with the given input values. 
 * 
 * @param bst 	The BST to insert values into. 
 * @param input A space separate string containing the values to insert, in
 * 				the order they should be inserted.   
 */
var addToBST = function(bst, input) {
	var valuesToAdd = input.trim().split(' ');
	valuesToAdd.forEach(function(element) {
		bst.insert(parseInt(element));
  	});
};