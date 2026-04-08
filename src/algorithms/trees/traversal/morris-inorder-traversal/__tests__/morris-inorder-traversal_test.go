package main

import (
	"reflect"
	"testing"
)

func makeBSTNodeMorris(value int, left *BSTNode, right *BSTNode) *BSTNode {
	return &BSTNode{value: value, left: left, right: right}
}

func leafMorris(value int) *BSTNode {
	return &BSTNode{value: value}
}

func TestMorrisInorderTraversalBalanced7NodeBST(t *testing.T) {
	root := makeBSTNodeMorris(4,
		makeBSTNodeMorris(2, leafMorris(1), leafMorris(3)),
		makeBSTNodeMorris(6, leafMorris(5), leafMorris(7)))
	if !reflect.DeepEqual(morrisInorderTraversal(root), []int{1, 2, 3, 4, 5, 6, 7}) {
		t.Errorf("expected sorted order")
	}
}

func TestMorrisInorderTraversalNullRoot(t *testing.T) {
	if len(morrisInorderTraversal(nil)) != 0 {
		t.Errorf("expected empty slice for nil root")
	}
}

func TestMorrisInorderTraversalSingleNode(t *testing.T) {
	if !reflect.DeepEqual(morrisInorderTraversal(leafMorris(42)), []int{42}) {
		t.Errorf("expected [42]")
	}
}

func TestMorrisInorderTraversalLeftSkewed(t *testing.T) {
	root := makeBSTNodeMorris(5, makeBSTNodeMorris(4, makeBSTNodeMorris(3, makeBSTNodeMorris(2, leafMorris(1), nil), nil), nil), nil)
	if !reflect.DeepEqual(morrisInorderTraversal(root), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1,2,3,4,5]")
	}
}

func TestMorrisInorderTraversalRightSkewed(t *testing.T) {
	root := makeBSTNodeMorris(1, nil, makeBSTNodeMorris(2, nil, makeBSTNodeMorris(3, nil, makeBSTNodeMorris(4, nil, leafMorris(5)))))
	if !reflect.DeepEqual(morrisInorderTraversal(root), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1,2,3,4,5]")
	}
}
