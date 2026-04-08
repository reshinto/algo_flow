// Remove Duplicates from Sorted List — skip duplicate nodes in a sorted list
package main

type ListNode struct {
	value int
	next  *ListNode
}

func removeDuplicatesSorted(head *ListNode) *ListNode {
	current := head // @step:initialize
	for current != nil && current.next != nil {
		// @step:compare
		if current.value == current.next.value {
			// @step:delete-node
			current.next = current.next.next
		} else {
			current = current.next // @step:traverse-next
		}
	}
	return head // @step:complete
}
