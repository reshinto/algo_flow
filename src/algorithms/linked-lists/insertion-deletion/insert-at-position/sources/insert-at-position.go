// Insert at Position — insert a new node at a specified index
package main

type ListNode struct {
	value int
	next  *ListNode
}

func insertAtPosition(head *ListNode, value int, position int) *ListNode {
	newNode := &ListNode{value: value, next: nil} // @step:initialize

	if position == 0 {
		// @step:initialize
		newNode.next = head // @step:insert-node
		return newNode      // @step:complete
	}

	current := head       // @step:initialize
	currentPosition := 0  // @step:initialize

	for current != nil && currentPosition < position-1 {
		current = current.next // @step:traverse-next
		currentPosition++      // @step:traverse-next
	}

	if current != nil {
		newNode.next = current.next // @step:insert-node
		current.next = newNode      // @step:insert-node
	}

	return head // @step:complete
}
