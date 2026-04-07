// Find Node by Value — walk the list comparing each node's value to a target, returning the node or null
package main

type ListNode struct {
	value int
	next  *ListNode
}

func findNodeByValue(head *ListNode, target int) *ListNode {
	current := head // @step:initialize
	for current != nil {
		if current.value == target {
			// @step:compare
			return current // @step:found
		}
		current = current.next // @step:traverse-next
	}
	return nil // @step:complete
}
