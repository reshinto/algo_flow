// Red-Black Tree Insertion — maintains balance via color rebalancing and rotations
package main

type RBColor int

const (
	Red   RBColor = iota
	Black RBColor = iota
)

type RBNode struct {
	value  int
	color  RBColor
	left   *RBNode
	right  *RBNode
	parent *RBNode
}

type RedBlackTree struct {
	root *RBNode // @step:initialize
}

func (tree *RedBlackTree) rotateLeft(node *RBNode) {
	rightChild := node.right // @step:rotate-left
	node.right = rightChild.left
	if rightChild.left != nil {
		rightChild.left.parent = node
	}
	rightChild.parent = node.parent
	if node.parent == nil {
		tree.root = rightChild
	} else if node == node.parent.left {
		node.parent.left = rightChild
	} else {
		node.parent.right = rightChild
	}
	rightChild.left = node
	node.parent = rightChild // @step:rotate-left
}

func (tree *RedBlackTree) rotateRight(node *RBNode) {
	leftChild := node.left // @step:rotate-right
	node.left = leftChild.right
	if leftChild.right != nil {
		leftChild.right.parent = node
	}
	leftChild.parent = node.parent
	if node.parent == nil {
		tree.root = leftChild
	} else if node == node.parent.right {
		node.parent.right = leftChild
	} else {
		node.parent.left = leftChild
	}
	leftChild.right = node
	node.parent = leftChild // @step:rotate-right
}

func (tree *RedBlackTree) fixInsert(inserted *RBNode) {
	currentNode := inserted
	for currentNode.parent != nil && currentNode.parent.color == Red { // @step:recolor-node
		parentNode := currentNode.parent
		grandparent := parentNode.parent
		if parentNode == grandparent.left {
			uncle := grandparent.right
			if uncle != nil && uncle.color == Red {
				parentNode.color = Black   // @step:recolor-node
				uncle.color = Black        // @step:recolor-node
				grandparent.color = Red    // @step:recolor-node
				currentNode = grandparent
			} else {
				if currentNode == parentNode.right {
					currentNode = parentNode
					tree.rotateLeft(currentNode) // @step:rotate-left
				}
				currentNode.parent.color = Black // @step:recolor-node
				grandparent.color = Red          // @step:recolor-node
				tree.rotateRight(grandparent)    // @step:rotate-right
			}
		} else {
			uncle := grandparent.left
			if uncle != nil && uncle.color == Red {
				parentNode.color = Black   // @step:recolor-node
				uncle.color = Black        // @step:recolor-node
				grandparent.color = Red    // @step:recolor-node
				currentNode = grandparent
			} else {
				if currentNode == parentNode.left {
					currentNode = parentNode
					tree.rotateRight(currentNode) // @step:rotate-right
				}
				currentNode.parent.color = Black // @step:recolor-node
				grandparent.color = Red          // @step:recolor-node
				tree.rotateLeft(grandparent)     // @step:rotate-left
			}
		}
	}
	tree.root.color = Black // @step:recolor-node
}

func (tree *RedBlackTree) insert(value int) {
	newNode := &RBNode{value: value, color: Red}
	if tree.root == nil {
		tree.root = newNode
		tree.root.color = Black // @step:recolor-node
		return
	}
	currentNode := tree.root
	for {
		if value < currentNode.value {
			if currentNode.left == nil {
				currentNode.left = newNode
				newNode.parent = currentNode
				break
			}
			currentNode = currentNode.left
		} else {
			if currentNode.right == nil {
				currentNode.right = newNode
				newNode.parent = currentNode
				break
			}
			currentNode = currentNode.right
		}
	}
	tree.fixInsert(newNode) // @step:recolor-node
}

func rbInorder(node *RBNode, result *[]int) {
	if node == nil {
		return
	}
	rbInorder(node.left, result)
	*result = append(*result, node.value)
	rbInorder(node.right, result)
}

func redBlackInsert(values []int) []int {
	tree := &RedBlackTree{}
	for _, value := range values {
		tree.insert(value) // @step:insert-node
	}
	result := []int{}
	rbInorder(tree.root, &result)
	return result // @step:complete
}
