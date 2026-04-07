// Merge Two Sorted Lists — combine two sorted lists by comparing heads
package main

type ListNode struct {
	value int
	next  *ListNode
}

func mergeTwoSorted(headA *ListNode, headB *ListNode) *ListNode {
	dummy := &ListNode{value: -1, next: nil} // @step:initialize
	tail := dummy                            // @step:initialize
	currentA := headA                        // @step:initialize
	currentB := headB                        // @step:initialize

	for currentA != nil && currentB != nil {
		if currentA.value <= currentB.value {
			// @step:compare
			tail.next = currentA   // @step:traverse-next
			currentA = currentA.next // @step:traverse-next
		} else {
			tail.next = currentB   // @step:traverse-next
			currentB = currentB.next // @step:traverse-next
		}
		tail = tail.next // @step:traverse-next
	}
	if currentA != nil {
		tail.next = currentA // @step:complete
	} else {
		tail.next = currentB // @step:complete
	}
	return dummy.next // @step:complete
}
