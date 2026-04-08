package main

import (
	"reflect"
	"testing"
)

func makeBSTNodeInorderIter(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafInorderIter(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBstInorderIterativeBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodeInorderIter(4,
		makeBSTNodeInorderIter(2, leafInorderIter(1), leafInorderIter(3)),
		makeBSTNodeInorderIter(6, leafInorderIter(5), leafInorderIter(7)))
	if !reflect.DeepEqual(bstInorderIterative(root), []int{1, 2, 3, 4, 5, 6, 7}) {
		t.Errorf("expected sorted order")
	}
}

func TestBstInorderIterativeNullRoot(t *testing.T) {
	if len(bstInorderIterative(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestBstInorderIterativeSingleNode(t *testing.T) {
	if !reflect.DeepEqual(bstInorderIterative(leafInorderIter(42)), []int{42}) {
		t.Errorf("expected [42]")
	}
}

func TestBstInorderIterativeLeftSkewed(t *testing.T) {
	root := makeBSTNodeInorderIter(5, makeBSTNodeInorderIter(4, makeBSTNodeInorderIter(3, makeBSTNodeInorderIter(2, leafInorderIter(1), nil), nil), nil), nil)
	if !reflect.DeepEqual(bstInorderIterative(root), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1,2,3,4,5]")
	}
}

func TestBstInorderIterativeRightSkewed(t *testing.T) {
	root := makeBSTNodeInorderIter(1, nil, makeBSTNodeInorderIter(2, nil, makeBSTNodeInorderIter(3, nil, makeBSTNodeInorderIter(4, nil, leafInorderIter(5)))))
	if !reflect.DeepEqual(bstInorderIterative(root), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1,2,3,4,5]")
	}
}

func TestBstInorderIterativeLeftChildOnly(t *testing.T) {
	if !reflect.DeepEqual(bstInorderIterative(makeBSTNodeInorderIter(5, leafInorderIter(3), nil)), []int{3, 5}) {
		t.Errorf("expected [3,5]")
	}
}

func TestBstInorderIterativeRightChildOnly(t *testing.T) {
	if !reflect.DeepEqual(bstInorderIterative(makeBSTNodeInorderIter(5, nil, leafInorderIter(8))), []int{5, 8}) {
		t.Errorf("expected [5,8]")
	}
}
