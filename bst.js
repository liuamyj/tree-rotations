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
}

/**
 * Public method which populates a BST object with the given input values. 
 * 
 * @param bst 	The BST to insert values into. 
 * @param input A space separate string containing the values to insert, in
 * 				the order they should be inserted.   
 */
var addToBST = function(bst, input) {
	var valuesToAdd = input.split(' ');
	valuesToAdd.forEach(function(element) {
		bst.insert(parseInt(element));
  	});
};