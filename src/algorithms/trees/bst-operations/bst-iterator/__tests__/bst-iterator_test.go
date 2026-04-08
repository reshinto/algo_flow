package main

import "testing"

func makeIterNode(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func iterLeaf(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBSTIteratorSortedAscendingOrder(t *testing.T) {
	tree := makeIterNode(4, makeIterNode(2, iterLeaf(1), iterLeaf(3)), makeIterNode(6, iterLeaf(5), iterLeaf(7)))
	result := bstIterator(tree)
	expected := []int{1, 2, 3, 4, 5, 6, 7}
	if len(result) != len(expected) {
		t.Fatalf("expected %v, got %v", expected, result)
	}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("index %d: expected %d, got %d", idx, val, result[idx])
		}
	}
}

func TestBSTIteratorNullTreeReturnsEmpty(t *testing.T) {
	result := bstIterator(nil)
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestBSTIteratorSingleElement(t *testing.T) {
	result := bstIterator(iterLeaf(42))
	if len(result) != 1 || result[0] != 42 {
		t.Errorf("expected [42], got %v", result)
	}
}

func TestBSTIteratorRightSkewed(t *testing.T) {
	skewed := makeIterNode(1, nil, makeIterNode(2, nil, iterLeaf(3)))
	result := bstIterator(skewed)
	expected := []int{1, 2, 3}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("index %d: expected %d, got %d", idx, val, result[idx])
		}
	}
}
