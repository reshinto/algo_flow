package main

import (
	"reflect"
	"testing"
)

func makeBSTNodeInorder(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafInorder(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestBstInorderBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodeInorder(4,
		makeBSTNodeInorder(2, leafInorder(1), leafInorder(3)),
		makeBSTNodeInorder(6, leafInorder(5), leafInorder(7)))
	if !reflect.DeepEqual(bstInorder(root), []int{1, 2, 3, 4, 5, 6, 7}) {
		t.Errorf("expected sorted order")
	}
}

func TestBstInorderNullRoot(t *testing.T) {
	if len(bstInorder(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestBstInorderSingleNode(t *testing.T) {
	if !reflect.DeepEqual(bstInorder(leafInorder(42)), []int{42}) {
		t.Errorf("expected [42]")
	}
}

func TestBstInorderLeftSkewed(t *testing.T) {
	root := makeBSTNodeInorder(5, makeBSTNodeInorder(4, makeBSTNodeInorder(3, makeBSTNodeInorder(2, leafInorder(1), nil), nil), nil), nil)
	if !reflect.DeepEqual(bstInorder(root), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1,2,3,4,5]")
	}
}

func TestBstInorderRightSkewed(t *testing.T) {
	root := makeBSTNodeInorder(1, nil, makeBSTNodeInorder(2, nil, makeBSTNodeInorder(3, nil, makeBSTNodeInorder(4, nil, leafInorder(5)))))
	if !reflect.DeepEqual(bstInorder(root), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1,2,3,4,5]")
	}
}

func TestBstInorderLeftChildOnly(t *testing.T) {
	if !reflect.DeepEqual(bstInorder(makeBSTNodeInorder(5, leafInorder(3), nil)), []int{3, 5}) {
		t.Errorf("expected [3,5]")
	}
}

func TestBstInorderRightChildOnly(t *testing.T) {
	if !reflect.DeepEqual(bstInorder(makeBSTNodeInorder(5, nil, leafInorder(8))), []int{5, 8}) {
		t.Errorf("expected [5,8]")
	}
}
