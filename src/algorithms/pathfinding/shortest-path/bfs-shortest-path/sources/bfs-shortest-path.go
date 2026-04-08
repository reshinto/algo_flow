// BFS Shortest Path — find shortest path on an unweighted grid using breadth-first search
package bfsshortestpath

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

type BfsResult struct {
	Path    [][2]int
	Visited [][2]int
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

func BfsShortestPath(grid [][]GridCell, start, end [2]int) BfsResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	noParent := [2]int{-1, -1}
	parent := make([][][2]int, rowCount)
	for rowIndex := range parent {
		parent[rowIndex] = make([][2]int, colCount)
		for colIndex := range parent[rowIndex] {
			parent[rowIndex][colIndex] = noParent
		}
	} // @step:initialize
	visited := [][2]int{} // @step:initialize
	// Seed the queue with the start cell
	queue := [][2]int{start} // @step:initialize,open-node
	visitedSet := make([][]bool, rowCount)
	for rowIndex := range visitedSet {
		visitedSet[rowIndex] = make([]bool, colCount)
	} // @step:initialize,open-node
	visitedSet[start[0]][start[1]] = true // @step:open-node

	deltaRows := []int{-1, 1, 0, 0}
	deltaCols := []int{0, 0, -1, 1}

	for len(queue) > 0 {
		// Dequeue the front cell — BFS explores level by level
		current := queue[0] // @step:close-node
		queue = queue[1:]
		currentRow, currentCol := current[0], current[1] // @step:close-node
		visited = append(visited, [2]int{currentRow, currentCol}) // @step:close-node

		// Check if we reached the end
		if currentRow == end[0] && currentCol == end[1] {
			// @step:trace-path
			return BfsResult{Path: reconstructPath(parent, end), Visited: visited} // @step:trace-path
		}

		// Explore 4-directional neighbors (up, down, left, right)
		for dirIndex := 0; dirIndex < 4; dirIndex++ {
			neighborRow := currentRow + deltaRows[dirIndex]
			neighborCol := currentCol + deltaCols[dirIndex]
			if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
				continue
			}
			if grid[neighborRow][neighborCol].CellType == CellWall { continue }
			if visitedSet[neighborRow][neighborCol] { continue }
			// Mark visited immediately on enqueue to avoid duplicates
			visitedSet[neighborRow][neighborCol] = true                                    // @step:open-node
			parent[neighborRow][neighborCol] = [2]int{currentRow, currentCol}              // @step:open-node
			queue = append(queue, [2]int{neighborRow, neighborCol})                        // @step:open-node
		}
	}

	return BfsResult{Path: [][2]int{}, Visited: visited} // @step:complete
}
