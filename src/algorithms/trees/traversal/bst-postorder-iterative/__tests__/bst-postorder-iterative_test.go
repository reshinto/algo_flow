package main

import (
	"reflect"
	"testing"
)

func makeBSTNodePostorderIter(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafPostorderIter(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBstPostorderIterativeBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodePostorderIter(4,
		makeBSTNodePostorderIter(2, leafPostorderIter(1), leafPostorderIter(3)),
		makeBSTNodePostorderIter(6, leafPostorderIter(5), leafPostorderIter(7)))
	if !reflect.DeepEqual(bstPostorderIterative(root), []int{1, 3, 2, 5, 7, 6, 4}) {
		t.Errorf("expected post-order")
	}
}

func TestBstPostorderIterativeNullRoot(t *testing.T) {
	if len(bstPostorderIterative(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestBstPostorderIterativeSingleNode(t *testing.T) {
	if !reflect.DeepEqual(bstPostorderIterative(leafPostorderIter(42)), []int{42}) {
		t.Errorf("expected [42]")
	}
}

func TestBstPostorderIterativeLeftSkewed(t *testing.T) {
	root := makeBSTNodePostorderIter(5, makeBSTNodePostorderIter(4, makeBSTNodePostorderIter(3, makeBSTNodePostorderIter(2, leafPostorderIter(1), nil), nil), nil), nil)
	if !reflect.DeepEqual(bstPostorderIterative(root), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1,2,3,4,5]")
	}
}

func TestBstPostorderIterativeRightSkewed(t *testing.T) {
	root := makeBSTNodePostorderIter(1, nil, makeBSTNodePostorderIter(2, nil, makeBSTNodePostorderIter(3, nil, makeBSTNodePostorderIter(4, nil, leafPostorderIter(5)))))
	if !reflect.DeepEqual(bstPostorderIterative(root), []int{5, 4, 3, 2, 1}) {
		t.Errorf("expected [5,4,3,2,1]")
	}
}

func TestBstPostorderIterativeLeftChildOnly(t *testing.T) {
	if !reflect.DeepEqual(bstPostorderIterative(makeBSTNodePostorderIter(5, leafPostorderIter(3), nil)), []int{3, 5}) {
		t.Errorf("expected [3,5]")
	}
}

func TestBstPostorderIterativeRightChildOnly(t *testing.T) {
	if !reflect.DeepEqual(bstPostorderIterative(makeBSTNodePostorderIter(5, nil, leafPostorderIter(8))), []int{8, 5}) {
		t.Errorf("expected [8,5]")
	}
}
