package main

import "testing"

func makeARTLPNode(value int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{value: value, left: left, right: right}
}

func artlpLeaf(value int) *TreeNode {
	return &TreeNode{value: value}
}

func artlpContainsPath(paths []string, target string) bool {
	for _, path := range paths {
		if path == target {
			return true
		}
	}
	return false
}

func TestAllRootToLeafPaths4Paths(t *testing.T) {
	root := makeARTLPNode(4,
		makeARTLPNode(2, artlpLeaf(1), artlpLeaf(3)),
		makeARTLPNode(6, artlpLeaf(5), artlpLeaf(7)))
	paths := allRootToLeafPaths(root)
	if len(paths) != 4 {
		t.Errorf("expected 4 paths, got %d", len(paths))
	}
	if !artlpContainsPath(paths, "4->2->1") {
		t.Error("should contain path 4->2->1")
	}
	if !artlpContainsPath(paths, "4->2->3") {
		t.Error("should contain path 4->2->3")
	}
}

func TestAllRootToLeafPathsNull(t *testing.T) {
	paths := allRootToLeafPaths(nil)
	if len(paths) != 0 {
		t.Error("null root should return empty")
	}
}

func TestAllRootToLeafPathsSingleNode(t *testing.T) {
	paths := allRootToLeafPaths(artlpLeaf(5))
	if len(paths) != 1 || paths[0] != "5" {
		t.Error("single node should return ['5']")
	}
}
