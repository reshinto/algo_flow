package main

import (
	"reflect"
	"testing"
)

func makeBSTNodePreorder(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafPreorder(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBstPreorderBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodePreorder(4,
		makeBSTNodePreorder(2, leafPreorder(1), leafPreorder(3)),
		makeBSTNodePreorder(6, leafPreorder(5), leafPreorder(7)))
	if !reflect.DeepEqual(bstPreorder(root), []int{4, 2, 1, 3, 6, 5, 7}) {
		t.Errorf("expected pre-order")
	}
}

func TestBstPreorderNullRoot(t *testing.T) {
	if len(bstPreorder(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestBstPreorderSingleNode(t *testing.T) {
	if !reflect.DeepEqual(bstPreorder(leafPreorder(42)), []int{42}) {
		t.Errorf("expected [42]")
	}
}

func TestBstPreorderLeftSkewed(t *testing.T) {
	root := makeBSTNodePreorder(5, makeBSTNodePreorder(4, makeBSTNodePreorder(3, makeBSTNodePreorder(2, leafPreorder(1), nil), nil), nil), nil)
	if !reflect.DeepEqual(bstPreorder(root), []int{5, 4, 3, 2, 1}) {
		t.Errorf("expected [5,4,3,2,1]")
	}
}

func TestBstPreorderRightSkewed(t *testing.T) {
	root := makeBSTNodePreorder(1, nil, makeBSTNodePreorder(2, nil, makeBSTNodePreorder(3, nil, makeBSTNodePreorder(4, nil, leafPreorder(5)))))
	if !reflect.DeepEqual(bstPreorder(root), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1,2,3,4,5]")
	}
}

func TestBstPreorderLeftChildOnly(t *testing.T) {
	if !reflect.DeepEqual(bstPreorder(makeBSTNodePreorder(5, leafPreorder(3), nil)), []int{5, 3}) {
		t.Errorf("expected [5,3]")
	}
}

func TestBstPreorderRightChildOnly(t *testing.T) {
	if !reflect.DeepEqual(bstPreorder(makeBSTNodePreorder(5, nil, leafPreorder(8))), []int{5, 8}) {
		t.Errorf("expected [5,8]")
	}
}
