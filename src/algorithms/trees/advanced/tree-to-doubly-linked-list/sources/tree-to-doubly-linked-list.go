// BST to Sorted Circular Doubly Linked List — in-place pointer manipulation
package main

type DLLNode struct {
	value int
	left  *DLLNode
	right *DLLNode
}

func dllInorder(node *DLLNode, head **DLLNode, tail **DLLNode) {
	if node == nil {
		return // @step:initialize
	}

	dllInorder(node.left, head, tail) // @step:traverse-left

	// Visit: connect current node to the doubly linked list
	if *tail == nil {
		*head = node // @step:visit
	} else {
		(*tail).right = node // @step:visit
		node.left = *tail    // @step:visit
	}
	*tail = node // @step:visit

	dllInorder(node.right, head, tail) // @step:traverse-right
}

func treeToDoublyLinkedList(root *DLLNode) *DLLNode {
	if root == nil {
		return nil // @step:initialize
	}

	var head *DLLNode // @step:initialize
	var tail *DLLNode // @step:initialize

	dllInorder(root, &head, &tail)

	// Close the circular link
	if head != nil && tail != nil {
		tail.right = head // @step:visit
		head.left = tail  // @step:visit
	}

	return head // @step:complete
}
