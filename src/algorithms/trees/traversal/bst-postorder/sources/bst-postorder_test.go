package main

import (
	"reflect"
	"testing"
)

func makeBSTNodePostorder(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafPostorder(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBstPostorderBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodePostorder(4,
		makeBSTNodePostorder(2, leafPostorder(1), leafPostorder(3)),
		makeBSTNodePostorder(6, leafPostorder(5), leafPostorder(7)))
	if !reflect.DeepEqual(bstPostorder(root), []int{1, 3, 2, 5, 7, 6, 4}) {
		t.Errorf("expected post-order")
	}
}

func TestBstPostorderNullRoot(t *testing.T) {
	if len(bstPostorder(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestBstPostorderSingleNode(t *testing.T) {
	if !reflect.DeepEqual(bstPostorder(leafPostorder(42)), []int{42}) {
		t.Errorf("expected [42]")
	}
}

func TestBstPostorderLeftSkewed(t *testing.T) {
	root := makeBSTNodePostorder(5, makeBSTNodePostorder(4, makeBSTNodePostorder(3, makeBSTNodePostorder(2, leafPostorder(1), nil), nil), nil), nil)
	if !reflect.DeepEqual(bstPostorder(root), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1,2,3,4,5]")
	}
}

func TestBstPostorderRightSkewed(t *testing.T) {
	root := makeBSTNodePostorder(1, nil, makeBSTNodePostorder(2, nil, makeBSTNodePostorder(3, nil, makeBSTNodePostorder(4, nil, leafPostorder(5)))))
	if !reflect.DeepEqual(bstPostorder(root), []int{5, 4, 3, 2, 1}) {
		t.Errorf("expected [5,4,3,2,1]")
	}
}

func TestBstPostorderLeftChildOnly(t *testing.T) {
	if !reflect.DeepEqual(bstPostorder(makeBSTNodePostorder(5, leafPostorder(3), nil)), []int{3, 5}) {
		t.Errorf("expected [3,5]")
	}
}

func TestBstPostorderRightChildOnly(t *testing.T) {
	if !reflect.DeepEqual(bstPostorder(makeBSTNodePostorder(5, nil, leafPostorder(8))), []int{8, 5}) {
		t.Errorf("expected [8,5]")
	}
}
