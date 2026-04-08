package main

import (
	"reflect"
	"testing"
)

func makeFLNode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func flLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func rightChainFL(root *BinaryNode) []int {
	var result []int
	current := root
	for current != nil {
		result = append(result, current.value)
		current = current.right
	}
	return result
}

func TestFlattenToLinkedListSingleNode(t *testing.T) {
	single := flLeaf(1)
	flattenToLinkedList(single)
	if single.left != nil || single.right != nil {
		t.Error("single node should be unchanged")
	}
}

func TestFlattenToLinkedListTwoNode(t *testing.T) {
	root := makeFLNode(1, flLeaf(2), nil)
	flattenToLinkedList(root)
	if !reflect.DeepEqual(rightChainFL(root), []int{1, 2}) {
		t.Error("two-node flatten failed")
	}
}

func TestFlattenToLinkedList7Node(t *testing.T) {
	root := makeFLNode(4,
		makeFLNode(2, flLeaf(1), flLeaf(3)),
		makeFLNode(6, flLeaf(5), flLeaf(7)))
	flattenToLinkedList(root)
	if !reflect.DeepEqual(rightChainFL(root), []int{4, 2, 1, 3, 6, 5, 7}) {
		t.Error("7-node preorder flatten failed")
	}
}

func TestFlattenToLinkedListAllLeftNull(t *testing.T) {
	root := makeFLNode(4,
		makeFLNode(2, flLeaf(1), flLeaf(3)),
		makeFLNode(6, flLeaf(5), flLeaf(7)))
	flattenToLinkedList(root)
	current := root
	for current != nil {
		if current.left != nil {
			t.Error("left pointer should be nil after flatten")
		}
		current = current.right
	}
}
