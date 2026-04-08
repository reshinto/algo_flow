package main

import "testing"

func makeDLLNode(value int, left *DLLNode, right *DLLNode) *DLLNode {
	return &DLLNode{value: value, left: left, right: right}
}

func dllLeaf(value int) *DLLNode {
	return &DLLNode{value: value}
}

func TestDLLNilInput(t *testing.T) {
	if treeToDoublyLinkedList(nil) != nil {
		t.Error("nil input should return nil")
	}
}

func TestDLLSingleNodeCircular(t *testing.T) {
	single := dllLeaf(5)
	head := treeToDoublyLinkedList(single)
	if head == nil || head.value != 5 {
		t.Fatal("single node value should be 5")
	}
	if head.right != head {
		t.Error("single node right should point to itself")
	}
	if head.left != head {
		t.Error("single node left should point to itself")
	}
}

func TestDLL3NodeBST(t *testing.T) {
	root := makeDLLNode(2, dllLeaf(1), dllLeaf(3))
	head := treeToDoublyLinkedList(root)
	if head.value != 1 {
		t.Errorf("expected head value 1, got %d", head.value)
	}
	if head.right.value != 2 {
		t.Errorf("expected 2, got %d", head.right.value)
	}
	if head.right.right.value != 3 {
		t.Errorf("expected 3, got %d", head.right.right.value)
	}
	if head.right.right.right != head {
		t.Error("tail.right should wrap to head")
	}
}

func TestDLL7NodeBST(t *testing.T) {
	root := makeDLLNode(4,
		makeDLLNode(2, dllLeaf(1), dllLeaf(3)),
		makeDLLNode(6, dllLeaf(5), dllLeaf(7)),
	)
	head := treeToDoublyLinkedList(root)
	expectedValues := []int{1, 2, 3, 4, 5, 6, 7}
	current := head
	for _, val := range expectedValues {
		if current.value != val {
			t.Errorf("expected %d, got %d", val, current.value)
		}
		current = current.right
	}
}
