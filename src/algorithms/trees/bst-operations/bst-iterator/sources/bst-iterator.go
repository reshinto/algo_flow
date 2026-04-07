// BST Iterator — stack-based controlled in-order traversal (hasNext/next interface)
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

type BSTIterator struct {
	stack []*BSTNode // @step:initialize
}

func newBSTIterator(root *BSTNode) *BSTIterator {
	iter := &BSTIterator{}
	iter.pushLeft(root) // @step:initialize
	return iter
}

func (iter *BSTIterator) pushLeft(node *BSTNode) {
	for node != nil {
		iter.stack = append(iter.stack, node) // @step:search-node
		node = node.left
	}
}

func (iter *BSTIterator) hasNext() bool {
	return len(iter.stack) > 0 // @step:search-node
}

func (iter *BSTIterator) next() int {
	node := iter.stack[len(iter.stack)-1]
	iter.stack = iter.stack[:len(iter.stack)-1] // @step:found
	iter.pushLeft(node.right)
	return node.value
}

// Convenience function to collect all values via iterator
func bstIterator(root *BSTNode) []int {
	iterator := newBSTIterator(root) // @step:initialize
	result := []int{}

	for iterator.hasNext() {
		result = append(result, iterator.next()) // @step:found
	}

	return result // @step:complete
}
