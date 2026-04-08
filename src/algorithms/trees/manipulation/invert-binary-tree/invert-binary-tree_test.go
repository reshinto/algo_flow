package main

import (
	"reflect"
	"testing"
)

func makeIBTNode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func ibtLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func levelOrderIBT(root *BinaryNode) []int {
	if root == nil {
		return []int{}
	}
	var result []int
	queue := []*BinaryNode{root}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		result = append(result, node.value)
		if node.left != nil {
			queue = append(queue, node.left)
		}
		if node.right != nil {
			queue = append(queue, node.right)
		}
	}
	return result
}

func TestInvertBinaryTreeNull(t *testing.T) {
	if invertBinaryTree(nil) != nil {
		t.Error("null should return nil")
	}
}

func TestInvertBinaryTreeSingleNode(t *testing.T) {
	result := invertBinaryTree(ibtLeaf(1))
	if result == nil || result.value != 1 {
		t.Error("single node value should be 1")
	}
}

func TestInvertBinaryTree7Node(t *testing.T) {
	root := makeIBTNode(4,
		makeIBTNode(2, ibtLeaf(1), ibtLeaf(3)),
		makeIBTNode(6, ibtLeaf(5), ibtLeaf(7)))
	result := invertBinaryTree(root)
	if !reflect.DeepEqual(levelOrderIBT(result), []int{4, 6, 2, 7, 5, 3, 1}) {
		t.Error("7-node invert level-order failed")
	}
}
