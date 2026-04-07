// AVL Tree Insertion with Rotations — maintains balance via LL/RR/LR/RL rotations
package main

type AvlNode struct {
	value  int
	height int
	left   *AvlNode
	right  *AvlNode
}

func newAvlNode(value int) *AvlNode {
	return &AvlNode{value: value, height: 1}
}

func avlHeight(node *AvlNode) int {
	if node == nil {
		return 0
	}
	return node.height // @step:check-balance
}

func avlUpdateHeight(node *AvlNode) {
	leftH := avlHeight(node.left)
	rightH := avlHeight(node.right)
	if leftH > rightH {
		node.height = 1 + leftH
	} else {
		node.height = 1 + rightH
	} // @step:update-height
}

func avlBalanceFactor(node *AvlNode) int {
	return avlHeight(node.left) - avlHeight(node.right) // @step:check-balance
}

func avlRotateRight(pivot *AvlNode) *AvlNode {
	leftChild := pivot.left // @step:rotate-right
	pivot.left = leftChild.right
	leftChild.right = pivot
	avlUpdateHeight(pivot)
	avlUpdateHeight(leftChild)
	return leftChild // @step:rotate-right
}

func avlRotateLeft(pivot *AvlNode) *AvlNode {
	rightChild := pivot.right // @step:rotate-left
	pivot.right = rightChild.left
	rightChild.left = pivot
	avlUpdateHeight(pivot)
	avlUpdateHeight(rightChild)
	return rightChild // @step:rotate-left
}

func avlInsert(node *AvlNode, value int) *AvlNode {
	if node == nil {
		return newAvlNode(value) // @step:insert-node
	}

	if value < node.value {
		node.left = avlInsert(node.left, value) // @step:traverse-left
	} else if value > node.value {
		node.right = avlInsert(node.right, value) // @step:traverse-right
	} else {
		return node // @step:visit
	}

	avlUpdateHeight(node)
	balance := avlBalanceFactor(node) // @step:check-balance

	// LL case
	if balance > 1 && node.left != nil && value < node.left.value {
		return avlRotateRight(node) // @step:rotate-right
	}
	// RR case
	if balance < -1 && node.right != nil && value > node.right.value {
		return avlRotateLeft(node) // @step:rotate-left
	}
	// LR case
	if balance > 1 && node.left != nil {
		node.left = avlRotateLeft(node.left) // @step:rotate-left
		return avlRotateRight(node)          // @step:rotate-right
	}
	// RL case
	if balance < -1 && node.right != nil {
		node.right = avlRotateRight(node.right) // @step:rotate-right
		return avlRotateLeft(node)              // @step:rotate-left
	}

	return node
}

func avlInorder(node *AvlNode, result *[]int) {
	if node == nil {
		return
	}
	avlInorder(node.left, result)
	*result = append(*result, node.value)
	avlInorder(node.right, result)
}

func avlInsertRotation(values []int) []int {
	var root *AvlNode // @step:initialize

	for _, value := range values {
		root = avlInsert(root, value) // @step:insert-node
	}

	result := []int{}
	avlInorder(root, &result)
	return result // @step:complete
}
