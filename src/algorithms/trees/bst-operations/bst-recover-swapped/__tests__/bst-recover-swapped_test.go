package main

import "testing"

func makeRecNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func recLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func collectInorderRec(root *BSTNode) []int {
	if root == nil {
		return nil
	}
	result := collectInorderRec(root.left)
	result = append(result, root.value)
	result = append(result, collectInorderRec(root.right)...)
	return result
}

func TestBSTRecoverNonAdjacentSwapped(t *testing.T) {
	// Swap 3 and 7
	invalid := makeRecNode(4,
		makeRecNode(2, recLeaf(1), recLeaf(7)),
		makeRecNode(6, recLeaf(5), recLeaf(3)),
	)
	bstRecoverSwapped(invalid)
	result := collectInorderRec(invalid)
	expected := []int{1, 2, 3, 4, 5, 6, 7}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("index %d: expected %d, got %d", idx, val, result[idx])
		}
	}
}

func TestBSTRecoverAdjacentSwapped(t *testing.T) {
	// Swap 2 and 3
	tree := makeRecNode(4,
		makeRecNode(3, recLeaf(1), recLeaf(2)),
		makeRecNode(6, recLeaf(5), recLeaf(7)),
	)
	bstRecoverSwapped(tree)
	result := collectInorderRec(tree)
	expected := []int{1, 2, 3, 4, 5, 6, 7}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("index %d: expected %d, got %d", idx, val, result[idx])
		}
	}
}

func TestBSTRecoverValidBSTUnchanged(t *testing.T) {
	tree := makeRecNode(4,
		makeRecNode(2, recLeaf(1), recLeaf(3)),
		makeRecNode(6, recLeaf(5), recLeaf(7)),
	)
	bstRecoverSwapped(tree)
	result := collectInorderRec(tree)
	expected := []int{1, 2, 3, 4, 5, 6, 7}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("index %d: expected %d, got %d", idx, val, result[idx])
		}
	}
}
