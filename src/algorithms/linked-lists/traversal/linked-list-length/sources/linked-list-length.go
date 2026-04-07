// Linked List Length — count nodes by traversing from head to null
package main

type ListNode struct {
	value int
	next  *ListNode
}

func linkedListLength(head *ListNode) int {
	count := 0        // @step:initialize
	current := head   // @step:initialize
	for current != nil {
		count++              // @step:traverse-next
		current = current.next // @step:traverse-next
	}
	return count // @step:complete
}
