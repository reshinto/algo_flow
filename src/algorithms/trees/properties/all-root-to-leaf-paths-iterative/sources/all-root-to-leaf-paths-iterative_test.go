package main

import "testing"

func makeARTLPINode(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func artlpiLeaf(value int) *TreeNode {
	return &TreeNode{value: value}
}

func containsPath(paths []string, target string) bool {
	for _, path := range paths {
		if path == target {
			return true
		}
	}
	return false
}

func TestAllRootToLeafPathsIterative4Paths(t *testing.T) {
	root := makeARTLPINode(4,
		makeARTLPINode(2, artlpiLeaf(1), artlpiLeaf(3)),
		makeARTLPINode(6, artlpiLeaf(5), artlpiLeaf(7)))
	paths := allRootToLeafPathsIterative(root)
	if len(paths) != 4 {
		t.Errorf("expected 4 paths, got %d", len(paths))
	}
	if !containsPath(paths, "4->2->1") {
		t.Error("should contain path 4->2->1")
	}
}

func TestAllRootToLeafPathsIterativeNull(t *testing.T) {
	paths := allRootToLeafPathsIterative(nil)
	if len(paths) != 0 {
		t.Error("null root should return empty")
	}
}

func TestAllRootToLeafPathsIterativeSingleNode(t *testing.T) {
	paths := allRootToLeafPathsIterative(artlpiLeaf(5))
	if len(paths) != 1 || paths[0] != "5" {
		t.Error("single node should return ['5']")
	}
}
