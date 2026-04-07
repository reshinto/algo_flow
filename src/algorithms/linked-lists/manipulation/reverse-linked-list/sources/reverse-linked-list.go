// Reverse Linked List — iteratively redirect each node's next pointer to its predecessor
package main

type ListNode struct {
	value int
	next  *ListNode
}

func reverseLinkedList(head *ListNode) *ListNode {
	var prev *ListNode  // @step:initialize
	current := head     // @step:initialize
	for current != nil {
		nextNode := current.next // @step:traverse-next
		current.next = prev      // @step:reverse-pointer
		prev = current           // @step:reverse-pointer
		current = nextNode       // @step:traverse-next
	}
	return prev // @step:complete
}
