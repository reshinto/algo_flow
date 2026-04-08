// BST Insert (Iterative) — track parent, insert at correct leaf position
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstInsertIterative(root *BSTNode, insertValue int) *BSTNode {
	newNode := &BSTNode{value: insertValue} // @step:initialize

	if root == nil {
		return newNode // @step:insert-child
	}

	current := root

	for {
		if insertValue < current.value {
			// Go left — if no left child, insert here
			if current.left == nil {
				current.left = newNode // @step:insert-child
				break
			}
			current = current.left // @step:search-node
		} else if insertValue > current.value {
			// Go right — if no right child, insert here
			if current.right == nil {
				current.right = newNode // @step:insert-child
				break
			}
			current = current.right // @step:search-node
		} else {
			// Duplicate value — do nothing
			break
		}
	}

	return root // @step:complete
}
