// N-ary Tree Traversal — preorder visit using children slice
package main

type NAryNode struct {
	value    int
	children []*NAryNode
}

func nAryPreorder(node *NAryNode, result *[]int) {
	if node == nil {
		return // @step:initialize
	}

	*result = append(*result, node.value) // @step:visit

	for _, child := range node.children {
		nAryPreorder(child, result) // @step:traverse-next
	}
}

func nAryTreeTraversal(root *NAryNode) []int {
	result := []int{} // @step:initialize

	nAryPreorder(root, &result) // @step:initialize
	return result               // @step:complete
}
