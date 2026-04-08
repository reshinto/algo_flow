package main

import (
	"reflect"
	"testing"
)

func makeFLINode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func fliLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func rightChainFLI(root *BinaryNode) []int {
	var result []int
	current := root
	for current != nil {
		result = append(result, current.value)
		current = current.right
	}
	return result
}

func TestFlattenToLinkedListIterativeSingleNode(t *testing.T) {
	single := fliLeaf(1)
	flattenToLinkedListIterative(single)
	if single.left != nil || single.right != nil {
		t.Error("single node should be unchanged")
	}
}

func TestFlattenToLinkedListIterativeTwoNode(t *testing.T) {
	root := makeFLINode(1, fliLeaf(2), nil)
	flattenToLinkedListIterative(root)
	if !reflect.DeepEqual(rightChainFLI(root), []int{1, 2}) {
		t.Error("two-node flatten failed")
	}
}

func TestFlattenToLinkedListIterative7Node(t *testing.T) {
	root := makeFLINode(4,
		makeFLINode(2, fliLeaf(1), fliLeaf(3)),
		makeFLINode(6, fliLeaf(5), fliLeaf(7)))
	flattenToLinkedListIterative(root)
	if !reflect.DeepEqual(rightChainFLI(root), []int{4, 2, 1, 3, 6, 5, 7}) {
		t.Error("7-node preorder flatten failed")
	}
}

func TestFlattenToLinkedListIterativeAllLeftNull(t *testing.T) {
	root := makeFLINode(4,
		makeFLINode(2, fliLeaf(1), fliLeaf(3)),
		makeFLINode(6, fliLeaf(5), fliLeaf(7)))
	flattenToLinkedListIterative(root)
	current := root
	for current != nil {
		if current.left != nil {
			t.Error("left pointer should be nil after flatten")
		}
		current = current.right
	}
}
