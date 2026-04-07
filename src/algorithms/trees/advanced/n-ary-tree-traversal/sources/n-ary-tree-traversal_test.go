package main

import "testing"

func makeNAryNode(value int, children ...*NAryNode) *NAryNode {
	return &NAryNode{value: value, children: children}
}

func TestNAryNullRootReturnsEmpty(t *testing.T) {
	result := nAryTreeTraversal(nil)
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestNArySingleNode(t *testing.T) {
	result := nAryTreeTraversal(makeNAryNode(5))
	if len(result) != 1 || result[0] != 5 {
		t.Errorf("expected [5], got %v", result)
	}
}

func TestNAryCorrectPreorder(t *testing.T) {
	root := makeNAryNode(1,
		makeNAryNode(3, makeNAryNode(5), makeNAryNode(6)),
		makeNAryNode(2, makeNAryNode(7), makeNAryNode(8)),
		makeNAryNode(4, makeNAryNode(9), makeNAryNode(10)),
	)
	result := nAryTreeTraversal(root)
	expected := []int{1, 3, 5, 6, 2, 7, 8, 4, 9, 10}
	if len(result) != len(expected) {
		t.Fatalf("expected len %d, got len %d: %v", len(expected), len(result), result)
	}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("index %d: expected %d, got %d", idx, val, result[idx])
		}
	}
}

func TestNAryRootBeforeChildren(t *testing.T) {
	root := makeNAryNode(1,
		makeNAryNode(3, makeNAryNode(5), makeNAryNode(6)),
		makeNAryNode(2, makeNAryNode(7), makeNAryNode(8)),
		makeNAryNode(4, makeNAryNode(9), makeNAryNode(10)),
	)
	result := nAryTreeTraversal(root)
	if result[0] != 1 || result[1] != 3 || len(result) != 10 {
		t.Errorf("unexpected result: %v", result)
	}
}
