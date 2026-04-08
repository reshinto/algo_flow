// Delete by Value — find and remove the first node matching a target value
package main

type ListNode struct {
	value int
	next  *ListNode
}

func deleteByValue(head *ListNode, target int) *ListNode {
	if head == nil {
		// @step:initialize
		return nil // @step:complete
	}

	if head.value == target {
		// @step:initialize
		// @step:compare
		return head.next // @step:delete-node
	}

	current := head   // @step:initialize
	var previous *ListNode // @step:initialize

	for current != nil {
		// @step:traverse-next
		if current.value == target {
			// @step:compare
			if previous != nil {
				previous.next = current.next // @step:delete-node
			}
			return head // @step:complete
		}

		previous = current      // @step:traverse-next
		current = current.next  // @step:traverse-next
	}

	return head // @step:complete
}
