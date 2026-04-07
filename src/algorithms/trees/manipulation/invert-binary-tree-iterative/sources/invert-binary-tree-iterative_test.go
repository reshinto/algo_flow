package main

import (
	"reflect"
	"testing"
)

func makeIBTINode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func ibtiLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func levelOrderIBTI(root *BinaryNode) []int {
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

func TestInvertBinaryTreeIterativeNull(t *testing.T) {
	if invertBinaryTreeIterative(nil) != nil {
		t.Error("null should return nil")
	}
}

func TestInvertBinaryTreeIterativeSingleNode(t *testing.T) {
	result := invertBinaryTreeIterative(ibtiLeaf(1))
	if result == nil || result.value != 1 {
		t.Error("single node value should be 1")
	}
}

func TestInvertBinaryTreeIterative7Node(t *testing.T) {
	root := makeIBTINode(4,
		makeIBTINode(2, ibtiLeaf(1), ibtiLeaf(3)),
		makeIBTINode(6, ibtiLeaf(5), ibtiLeaf(7)))
	result := invertBinaryTreeIterative(root)
	if !reflect.DeepEqual(levelOrderIBTI(result), []int{4, 6, 2, 7, 5, 3, 1}) {
		t.Error("7-node invert level-order failed")
	}
}
