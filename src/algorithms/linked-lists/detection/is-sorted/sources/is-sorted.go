// Check if Sorted — verify each node's value <= the next
package main

type ListNode struct {
	value int
	next  *ListNode
}

func isSorted(head *ListNode) bool {
	current := head // @step:initialize
	for current != nil && current.next != nil {
		if current.value > current.next.value {
			// @step:compare
			return false // @step:complete
		}
		current = current.next // @step:traverse-next
	}
	return true // @step:complete
}
