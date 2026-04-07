// A* Search — find shortest path using Manhattan distance heuristic
package astar

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

type AStarResult struct {
	Path    [][2]int
	Visited [][2]int
}

type aStarNode struct {
	fCost int
	hCost int
	row   int
	col   int
}

func manhattanDistance(rowA, colA, rowB, colB int) int {
	rowDiff := rowA - rowB
	if rowDiff < 0 { rowDiff = -rowDiff }
	colDiff := colA - colB
	if colDiff < 0 { colDiff = -colDiff }
	return rowDiff + colDiff
}

func reconstructPath(parent [][][2]int, end [2]int) [][2]int {
	path := [][2]int{}
	current := end
	for parent[current[0]][current[1]] != [2]int{-1, -1} {
		path = append([][2]int{current}, path...)
		current = parent[current[0]][current[1]]
	}
	path = append([][2]int{current}, path...)
	return path
}

func AStarGrid(grid [][]GridCell, start, end [2]int) AStarResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	noParent := [2]int{-1, -1}
	gCost := make([][]int, rowCount)
	for rowIndex := range gCost {
		gCost[rowIndex] = make([]int, colCount)
		for colIndex := range gCost[rowIndex] {
			gCost[rowIndex][colIndex] = 1<<31 - 1
		}
	} // @step:initialize
	gCost[start[0]][start[1]] = 0 // @step:initialize
	parent := make([][][2]int, rowCount)
	for rowIndex := range parent {
		parent[rowIndex] = make([][2]int, colCount)
		for colIndex := range parent[rowIndex] {
			parent[rowIndex][colIndex] = noParent
		}
	} // @step:initialize
	closedSet := make([][]bool, rowCount)
	for rowIndex := range closedSet {
		closedSet[rowIndex] = make([]bool, colCount)
	} // @step:initialize
	visited := [][2]int{} // @step:initialize

	// Priority queue ordered by fCost = gCost + hCost
	startHCost := manhattanDistance(start[0], start[1], end[0], end[1])
	openSet := []aStarNode{{fCost: startHCost, hCost: startHCost, row: start[0], col: start[1]}} // @step:initialize,open-node

	deltaRows := []int{-1, 1, 0, 0}
	deltaCols := []int{0, 0, -1, 1}

	for len(openSet) > 0 {
		// Extract node with lowest fCost
		sort.Slice(openSet, func(indexA, indexB int) bool {
			if openSet[indexA].fCost != openSet[indexB].fCost {
				return openSet[indexA].fCost < openSet[indexB].fCost
			}
			return openSet[indexA].hCost < openSet[indexB].hCost
		}) // @step:close-node
		current := openSet[0] // @step:close-node
		openSet = openSet[1:]
		if closedSet[current.row][current.col] { continue } // @step:close-node
		closedSet[current.row][current.col] = true           // @step:close-node
		visited = append(visited, [2]int{current.row, current.col}) // @step:close-node

		// Check if we reached the end
		if current.row == end[0] && current.col == end[1] {
			// @step:trace-path
			return AStarResult{Path: reconstructPath(parent, end), Visited: visited} // @step:trace-path
		}

		// Explore 4-directional neighbors
		for dirIndex := 0; dirIndex < 4; dirIndex++ {
			neighborRow := current.row + deltaRows[dirIndex]
			neighborCol := current.col + deltaCols[dirIndex]
			if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
				continue
			}
			if grid[neighborRow][neighborCol].CellType == CellWall { continue }
			if closedSet[neighborRow][neighborCol] { continue }

			tentativeGCost := gCost[current.row][current.col] + 1 // @step:update-cost
			if tentativeGCost < gCost[neighborRow][neighborCol] {
				// @step:update-cost
				gCost[neighborRow][neighborCol] = tentativeGCost // @step:update-cost
				parent[neighborRow][neighborCol] = [2]int{current.row, current.col}
				neighborHCost := manhattanDistance(neighborRow, neighborCol, end[0], end[1])
				neighborFCost := tentativeGCost + neighborHCost
				openSet = append(openSet, aStarNode{fCost: neighborFCost, hCost: neighborHCost, row: neighborRow, col: neighborCol})
			}
		}
	}

	return AStarResult{Path: [][2]int{}, Visited: visited} // @step:complete
}
