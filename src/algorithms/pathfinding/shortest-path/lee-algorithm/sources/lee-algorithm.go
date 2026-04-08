// Lee Algorithm — BFS wavefront shortest path with distance numbering
package leealgorithm

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

type LeeResult struct {
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

func LeeAlgorithm(grid [][]GridCell, start, end [2]int) LeeResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	// Wave number map: each cell gets the wavefront distance from start
	noParent := [2]int{-1, -1}
	waveMap := make([][]int, rowCount)
	for rowIndex := range waveMap {
		waveMap[rowIndex] = make([]int, colCount)
		for colIndex := range waveMap[rowIndex] {
			waveMap[rowIndex][colIndex] = -1
		}
	} // @step:initialize
	waveMap[start[0]][start[1]] = 0 // @step:initialize
	parent := make([][][2]int, rowCount)
	for rowIndex := range parent {
		parent[rowIndex] = make([][2]int, colCount)
		for colIndex := range parent[rowIndex] {
			parent[rowIndex][colIndex] = noParent
		}
	} // @step:initialize

	// Phase 1: BFS wavefront expansion — label each reachable cell with its wave number
	queue := [][2]int{start} // @step:initialize,open-node
	visited := [][2]int{}

	deltaRows := []int{-1, 1, 0, 0}
	deltaCols := []int{0, 0, -1, 1}

	for len(queue) > 0 {
		current := queue[0] // @step:close-node
		queue = queue[1:]
		currentRow, currentCol := current[0], current[1]      // @step:close-node
		visited = append(visited, [2]int{currentRow, currentCol}) // @step:close-node
		currentWave := waveMap[currentRow][currentCol]            // @step:close-node

		// Check if we reached the end — begin backtracking
		if currentRow == end[0] && currentCol == end[1] { break } // @step:update-cost

		// Expand wavefront to 4-directional neighbors
		for dirIndex := 0; dirIndex < 4; dirIndex++ {
			neighborRow := currentRow + deltaRows[dirIndex]
			neighborCol := currentCol + deltaCols[dirIndex]
			if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
				continue
			}
			if grid[neighborRow][neighborCol].CellType == CellWall { continue }
			if waveMap[neighborRow][neighborCol] != -1 { continue }
			// Stamp the neighbor with the next wave number
			waveMap[neighborRow][neighborCol] = currentWave + 1 // @step:update-cost
			parent[neighborRow][neighborCol] = [2]int{currentRow, currentCol}
			queue = append(queue, [2]int{neighborRow, neighborCol}) // @step:open-node
		}
	}

	if waveMap[end[0]][end[1]] == -1 {
		return LeeResult{Path: [][2]int{}, Visited: visited} // @step:complete
	}

	// Phase 2: Backtrack from end using parent pointers
	path := reconstructPath(parent, end) // @step:trace-path
	return LeeResult{Path: path, Visited: visited} // @step:trace-path
}
