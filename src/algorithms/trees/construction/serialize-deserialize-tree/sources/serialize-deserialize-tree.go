// Serialize and Deserialize Binary Tree (BFS / Level-Order)
// Serialization: BFS level-by-level, null nodes represented as "null"
// Deserialization: parse the string back into a tree using a queue

package main

import (
	"strconv"
	"strings"
)

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func serializeTree(root *TreeNode) string {
	if root == nil {
		return "null" // @step:initialize
	}

	queue := []*TreeNode{root} // @step:initialize
	parts := []string{}        // @step:initialize

	for len(queue) > 0 {
		// @step:search-node
		node := queue[0]   // @step:search-node
		queue = queue[1:]

		if node == nil {
			parts = append(parts, "null") // @step:visit
		} else {
			parts = append(parts, strconv.Itoa(node.value)) // @step:visit
			queue = append(queue, node.left)                // @step:build-node
			queue = append(queue, node.right)               // @step:build-node
		}
	}

	return strings.Join(parts, ",") // @step:complete
}

func deserializeTree(data string) *TreeNode {
	if data == "null" || data == "" {
		return nil // @step:initialize
	}

	parts := strings.Split(data, ",") // @step:initialize
	firstValue := parts[0]            // @step:select-element
	if firstValue == "null" {
		return nil
	}

	rootVal, _ := strconv.Atoi(firstValue)
	root := &TreeNode{value: rootVal}   // @step:build-node
	queue := []*TreeNode{root}          // @step:initialize
	partIndex := 1                      // @step:initialize

	for len(queue) > 0 && partIndex < len(parts) {
		// @step:search-node
		currentNode := queue[0] // @step:search-node
		queue = queue[1:]

		leftValue := parts[partIndex] // @step:select-element
		partIndex++                   // @step:select-element

		if leftValue != "null" {
			leftVal, _ := strconv.Atoi(leftValue)
			leftNode := &TreeNode{value: leftVal}   // @step:build-node
			currentNode.left = leftNode             // @step:connect-child
			queue = append(queue, leftNode)         // @step:visit
		}

		if partIndex < len(parts) {
			rightValue := parts[partIndex] // @step:select-element
			partIndex++                    // @step:select-element

			if rightValue != "null" {
				rightVal, _ := strconv.Atoi(rightValue)
				rightNode := &TreeNode{value: rightVal}  // @step:build-node
				currentNode.right = rightNode            // @step:connect-child
				queue = append(queue, rightNode)         // @step:visit
			}
		}
	}

	return root // @step:complete
}
