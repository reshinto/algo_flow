// All Root-to-Leaf Paths — recursive DFS collecting all paths as strings

package main

import "fmt"

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func dfsAllPaths(node *TreeNode, currentPath string, paths *[]string) {
	if node == nil {
		return // @step:initialize
	}

	var pathSoFar string
	if currentPath == "" {
		pathSoFar = fmt.Sprintf("%d", node.value)
	} else {
		pathSoFar = fmt.Sprintf("%s->%d", currentPath, node.value)
	} // @step:visit

	// Leaf node — record this complete path
	if node.left == nil && node.right == nil {
		// @step:visit
		*paths = append(*paths, pathSoFar) // @step:add-to-result
		return
	}

	dfsAllPaths(node.left, pathSoFar, paths)  // @step:traverse-left
	dfsAllPaths(node.right, pathSoFar, paths) // @step:traverse-right
}

func allRootToLeafPaths(root *TreeNode) []string {
	paths := []string{} // @step:initialize
	dfsAllPaths(root, "", &paths) // @step:initialize
	return paths // @step:complete
}
