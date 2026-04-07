// Bellman-Ford Grid — shortest path via V-1 edge relaxation iterations
package bellmanfordgrid

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

type BellmanFordResult struct {
	Path    [][2]int
	Visited [][2]int
}

type edge struct {
	fromRow, fromCol, toRow, toCol int
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

func BellmanFordGrid(grid [][]GridCell, start, end [2]int) BellmanFordResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	vertexCount := rowCount * colCount // @step:initialize
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

	// Collect all passable edges: (fromRow, fromCol) -> (toRow, toCol)
	edges := []edge{} // @step:initialize
	deltaRows := []int{-1, 1, 0, 0}
	deltaCols := []int{0, 0, -1, 1}
	for rowIndex := 0; rowIndex < rowCount; rowIndex++ {
		for colIndex := 0; colIndex < colCount; colIndex++ {
			if grid[rowIndex][colIndex].CellType == CellWall { continue }
			for dirIndex := 0; dirIndex < 4; dirIndex++ {
				neighborRow := rowIndex + deltaRows[dirIndex]
				neighborCol := colIndex + deltaCols[dirIndex]
				if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
					continue
				}
				if grid[neighborRow][neighborCol].CellType == CellWall { continue }
				edges = append(edges, edge{rowIndex, colIndex, neighborRow, neighborCol})
			}
		}
	}

	// Relax all edges V-1 times
	for iteration := 0; iteration < vertexCount-1; iteration++ {
		updated := false
		for _, edgeItem := range edges {
			if distance[edgeItem.fromRow][edgeItem.fromCol] == maxDist { continue }
			newDistance := distance[edgeItem.fromRow][edgeItem.fromCol] + 1 // @step:update-cost
			if newDistance < distance[edgeItem.toRow][edgeItem.toCol] {
				// @step:update-cost
				distance[edgeItem.toRow][edgeItem.toCol] = newDistance // @step:update-cost
				parent[edgeItem.toRow][edgeItem.toCol] = [2]int{edgeItem.fromRow, edgeItem.fromCol}
				updated = true
			}
		}
		if !updated { break } // Early termination if no updates
	}

	// Collect visited cells (all cells that were reached with finite distance)
	visited := [][2]int{} // @step:close-node
	for rowIndex := 0; rowIndex < rowCount; rowIndex++ {
		for colIndex := 0; colIndex < colCount; colIndex++ {
			if distance[rowIndex][colIndex] < maxDist {
				visited = append(visited, [2]int{rowIndex, colIndex}) // @step:close-node
			}
		}
	}

	if distance[end[0]][end[1]] == maxDist {
		return BellmanFordResult{Path: [][2]int{}, Visited: visited} // @step:complete
	}

	path := reconstructPath(parent, end) // @step:trace-path
	return BellmanFordResult{Path: path, Visited: visited} // @step:trace-path
}
