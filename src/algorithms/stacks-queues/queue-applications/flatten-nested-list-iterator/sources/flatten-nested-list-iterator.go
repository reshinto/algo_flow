// Flatten Nested List Iterator — use a stack to peel nested lists layer by layer
package main

import "fmt"

// NestedItem represents either a single integer or a list of nested items
type NestedItem struct {
	isValue bool
	value   int
	items   []NestedItem
}

func flattenNestedListIterator(nestedList []NestedItem) []int {
	// Push in reverse order so first element is processed first
	stack := make([]NestedItem, len(nestedList)) // @step:initialize
	for itemIdx := range nestedList {
		stack[itemIdx] = nestedList[len(nestedList)-1-itemIdx]
	}
	result := []int{} // @step:initialize
	for len(stack) > 0 {
		top := stack[len(stack)-1] // @step:pop
		stack = stack[:len(stack)-1] // @step:pop
		if top.isValue {
			result = append(result, top.value) // @step:visit
		} else {
			for itemIdx := len(top.items) - 1; itemIdx >= 0; itemIdx-- {
				stack = append(stack, top.items[itemIdx]) // @step:push
			}
		}
	}
	return result // @step:complete
}

func main() {
	nested := []NestedItem{
		{isValue: false, items: []NestedItem{{isValue: true, value: 1}, {isValue: true, value: 1}}},
		{isValue: true, value: 2},
		{isValue: false, items: []NestedItem{{isValue: true, value: 1}, {isValue: true, value: 1}}},
	}
	fmt.Println(flattenNestedListIterator(nested))
}
