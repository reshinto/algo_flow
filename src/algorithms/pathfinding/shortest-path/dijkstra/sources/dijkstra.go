// Dijkstra's Algorithm — find shortest path on a weighted grid
package dijkstra

import "sort"

type CellType int

const (
	CellEmpty CellType = iota
	CellWall
	CellStart
	CellEnd
)

type GridCell struct {
	Row      int
	Col      int
	CellType CellType
	State    string
}

type DijkstraResult struct {
	Path    [][2]int
	Visited [][2]int
}

type dijkstraNode struct {
	dist int
	row  int
	col  int
}

func reconstructPath(parent [][][2]int, end [2]int) [][2]int {
	noParent := [2]int{-1, -1}
	path := [][2]int{}
	current := end
	for parent[current[0]][current[1]] != noParent {
		path = append([][2]int{current}, path...)
		current = parent[current[0]][current[1]]
	}
	path = append([][2]int{current}, path...)
	return path
}

func Dijkstra(grid [][]GridCell, start, end [2]int) DijkstraResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	noParent := [2]int{-1, -1}
	maxDist := 1<<31 - 1
	distance := make([][]int, rowCount)
	for rowIndex := range distance {
		distance[rowIndex] = make([]int, colCount)
		for colIndex := range distance[rowIndex] {
			distance[rowIndex][colIndex] = maxDist
		}
	} // @step:initialize
	distance[start[0]][start[1]] = 0 // @step:initialize
	parent := make([][][2]int, rowCount)
	for rowIndex := range parent {
		parent[rowIndex] = make([][2]int, colCount)
		for colIndex := range parent[rowIndex] {
			parent[rowIndex][colIndex] = noParent
		}
	} // @step:initialize
	// Seed the frontier with the start cell
	openSet := []dijkstraNode{{dist: 0, row: start[0], col: start[1]}} // @step:initialize,open-node
	visitedSet := make([][]bool, rowCount)
	for rowIndex := range visitedSet {
		visitedSet[rowIndex] = make([]bool, colCount)
	} // @step:initialize,open-node
	visited := [][2]int{} // @step:initialize

	deltaRows := []int{-1, 1, 0, 0}
	deltaCols := []int{0, 0, -1, 1}

	for len(openSet) > 0 {
		// Extract the node with the smallest tentative distance
		sort.Slice(openSet, func(indexA, indexB int) bool {
			return openSet[indexA].dist < openSet[indexB].dist
		}) // @step:close-node
		current := openSet[0] // @step:close-node
		openSet = openSet[1:]
		if visitedSet[current.row][current.col] { continue } // @step:close-node
		visitedSet[current.row][current.col] = true           // @step:close-node
		visited = append(visited, [2]int{current.row, current.col}) // @step:close-node

		// Check if we reached the end — reconstruct path via parent pointers
		if current.row == end[0] && current.col == end[1] {
			// @step:trace-path
			return DijkstraResult{Path: reconstructPath(parent, end), Visited: visited} // @step:trace-path
		}

		// Explore 4-directional neighbors (up, down, left, right)
		for dirIndex := 0; dirIndex < 4; dirIndex++ {
			neighborRow := current.row + deltaRows[dirIndex]
			neighborCol := current.col + deltaCols[dirIndex]
			if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
				continue
			}
			if grid[neighborRow][neighborCol].CellType == CellWall || visitedSet[neighborRow][neighborCol] {
				continue
			}
			// Relax the edge: update distance if a shorter path is found
			newDistance := distance[current.row][current.col] + 1 // @step:update-cost
			if newDistance < distance[neighborRow][neighborCol] {
				// @step:update-cost
				distance[neighborRow][neighborCol] = newDistance // @step:update-cost
				parent[neighborRow][neighborCol] = [2]int{current.row, current.col}
				openSet = append(openSet, dijkstraNode{dist: newDistance, row: neighborRow, col: neighborCol})
			}
		}
	}

	return DijkstraResult{Path: [][2]int{}, Visited: visited} // @step:complete
}
