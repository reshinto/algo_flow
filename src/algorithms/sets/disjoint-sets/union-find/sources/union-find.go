// Union-Find (Disjoint Set Union) — Path Compression + Union by Rank
// Maintains a partition of elements into disjoint sets.
// find(x): returns the root representative of x's set, compressing the path.
// union(x, y): merges the sets containing x and y using rank heuristic.
// Time: O(α(n)) amortized per operation — Space: O(n)

package main

import "fmt"

func findRoot(parent []int, element int) int {
	// @step:find-root
	if parent[element] != element {
		parent[element] = findRoot(parent, parent[element]) // @step:find-root
	}
	return parent[element]
}

func unionSets(parent []int, rank []int, elemA int, elemB int) {
	rootA := findRoot(parent, elemA) // @step:find-root
	rootB := findRoot(parent, elemB) // @step:find-root
	if rootA == rootB {
		return
	}

	if rank[rootA] >= rank[rootB] {
		parent[rootB] = rootA // @step:union-sets
		if rank[rootA] == rank[rootB] {
			rank[rootA]++
		}
	} else {
		parent[rootA] = rootB // @step:union-sets
	}
}

type Operation struct {
	elemA, elemB int
}

func unionFind(elementCount int, operations []Operation) [][]int {
	parent := make([]int, elementCount) // @step:initialize
	rank := make([]int, elementCount)   // @step:initialize
	for idx := range parent {
		parent[idx] = idx
	}

	for _, op := range operations {
		unionSets(parent, rank, op.elemA, op.elemB)
	}

	// Build final components
	componentMap := make(map[int][]int)
	for elemIdx := 0; elemIdx < elementCount; elemIdx++ {
		root := findRoot(parent, elemIdx)
		componentMap[root] = append(componentMap[root], elemIdx)
	}

	components := make([][]int, 0, len(componentMap))
	for _, group := range componentMap {
		components = append(components, group)
	}
	return components // @step:complete
}

func main() {
	operations := []Operation{{0, 1}, {2, 3}, {4, 5}, {6, 7}, {0, 2}, {4, 6}, {0, 4}}
	components := unionFind(8, operations)
	fmt.Println(components)
}
