// BST Delete (Recursive) — 3 cases: leaf, one child, two children with inorder successor
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstFindMin(node *BSTNode) int {
	if node.left == nil {
		return node.value
	}
	return bstFindMin(node.left) // @step:search-node
}

func bstDelete(root *BSTNode, deleteValue int) *BSTNode {
	if root == nil {
		return nil // @step:initialize
	}

	if deleteValue < root.value {
		// Target is in the left subtree
		root.left = bstDelete(root.left, deleteValue) // @step:search-node
	} else if deleteValue > root.value {
		// Target is in the right subtree
		root.right = bstDelete(root.right, deleteValue) // @step:search-node
	} else {
		// Found the node to delete
		if root.left == nil {
			return root.right // @step:delete-child
		}
		if root.right == nil {
			return root.left // @step:delete-child
		}

		// Two children: find inorder successor (smallest in right subtree)
		successor := root.right
		for successor.left != nil {
			successor = successor.left // @step:search-node
		}
		// Replace value with successor's value, then delete the successor
		root.value = successor.value // @step:delete-child
		root.right = bstDelete(root.right, successor.value)
	}

	return root // @step:complete
}
