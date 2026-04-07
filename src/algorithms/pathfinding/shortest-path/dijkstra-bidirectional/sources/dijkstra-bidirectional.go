// Dijkstra Bidirectional — two simultaneous Dijkstra searches meeting in the middle
package dijkstrabidirectional

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

type BidirectionalResult struct {
	Path    [][2]int
	Visited [][2]int
}

type biDirNode struct {
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

func reconstructReversePath(reverseParent [][][2]int, meetingPoint [2]int) [][2]int {
	noParent := [2]int{-1, -1}
	path := [][2]int{}
	current := meetingPoint
	for reverseParent[current[0]][current[1]] != noParent {
		path = append(path, current)
		current = reverseParent[current[0]][current[1]]
	}
	path = append(path, current)
	return path
}

func DijkstraBidirectional(grid [][]GridCell, start, end [2]int) BidirectionalResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	noParent := [2]int{-1, -1}
	maxDist := 1<<31 - 1

	// Forward search from start
	forwardDistance := make([][]int, rowCount)
	for rowIndex := range forwardDistance {
		forwardDistance[rowIndex] = make([]int, colCount)
		for colIndex := range forwardDistance[rowIndex] {
			forwardDistance[rowIndex][colIndex] = maxDist
		}
	} // @step:initialize
	forwardDistance[start[0]][start[1]] = 0 // @step:initialize
	forwardParent := make([][][2]int, rowCount)
	for rowIndex := range forwardParent {
		forwardParent[rowIndex] = make([][2]int, colCount)
		for colIndex := range forwardParent[rowIndex] {
			forwardParent[rowIndex][colIndex] = noParent
		}
	} // @step:initialize
	forwardVisited := make([][]bool, rowCount)
	for rowIndex := range forwardVisited {
		forwardVisited[rowIndex] = make([]bool, colCount)
	} // @step:initialize

	// Reverse search from end
	reverseDistance := make([][]int, rowCount)
	for rowIndex := range reverseDistance {
		reverseDistance[rowIndex] = make([]int, colCount)
		for colIndex := range reverseDistance[rowIndex] {
			reverseDistance[rowIndex][colIndex] = maxDist
		}
	} // @step:initialize
	reverseDistance[end[0]][end[1]] = 0 // @step:initialize
	reverseParent := make([][][2]int, rowCount)
	for rowIndex := range reverseParent {
		reverseParent[rowIndex] = make([][2]int, colCount)
		for colIndex := range reverseParent[rowIndex] {
			reverseParent[rowIndex][colIndex] = noParent
		}
	} // @step:initialize
	reverseVisited := make([][]bool, rowCount)
	for rowIndex := range reverseVisited {
		reverseVisited[rowIndex] = make([]bool, colCount)
	} // @step:initialize

	forwardQueue := []biDirNode{{dist: 0, row: start[0], col: start[1]}}  // @step:initialize,open-node
	reverseQueue := []biDirNode{{dist: 0, row: end[0], col: end[1]}}      // @step:initialize,open-node

	deltaRows := []int{-1, 1, 0, 0}
	deltaCols := []int{0, 0, -1, 1}
	allVisited := [][2]int{}
	bestCost := maxDist
	meetingPoint := noParent
	hasMeeting := false

	for len(forwardQueue) > 0 || len(reverseQueue) > 0 {
		// Alternate between forward and reverse searches
		if len(forwardQueue) > 0 {
			sort.Slice(forwardQueue, func(indexA, indexB int) bool {
				return forwardQueue[indexA].dist < forwardQueue[indexB].dist
			}) // @step:close-node
			current := forwardQueue[0] // @step:close-node
			forwardQueue = forwardQueue[1:]
			if !forwardVisited[current.row][current.col] {
				forwardVisited[current.row][current.col] = true // @step:close-node
				allVisited = append(allVisited, [2]int{current.row, current.col}) // @step:close-node

				// Check if this cell has been visited by reverse search
				if reverseVisited[current.row][current.col] {
					totalCost := forwardDistance[current.row][current.col] + reverseDistance[current.row][current.col]
					if totalCost < bestCost {
						bestCost = totalCost
						meetingPoint = [2]int{current.row, current.col}
						hasMeeting = true
					}
				}

				for dirIndex := 0; dirIndex < 4; dirIndex++ {
					neighborRow := current.row + deltaRows[dirIndex]
					neighborCol := current.col + deltaCols[dirIndex]
					if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
						continue
					}
					if grid[neighborRow][neighborCol].CellType == CellWall { continue }
					if forwardVisited[neighborRow][neighborCol] { continue }
					newDist := forwardDistance[current.row][current.col] + 1
					if newDist < forwardDistance[neighborRow][neighborCol] {
						forwardDistance[neighborRow][neighborCol] = newDist // @step:open-node
						forwardParent[neighborRow][neighborCol] = [2]int{current.row, current.col}
						forwardQueue = append(forwardQueue, biDirNode{dist: newDist, row: neighborRow, col: neighborCol})
					}
				}
			}
		}

		if len(reverseQueue) > 0 {
			sort.Slice(reverseQueue, func(indexA, indexB int) bool {
				return reverseQueue[indexA].dist < reverseQueue[indexB].dist
			}) // @step:close-node
			current := reverseQueue[0] // @step:close-node
			reverseQueue = reverseQueue[1:]
			if !reverseVisited[current.row][current.col] {
				reverseVisited[current.row][current.col] = true // @step:close-node
				allVisited = append(allVisited, [2]int{current.row, current.col}) // @step:close-node

				// Check if this cell has been visited by forward search
				if forwardVisited[current.row][current.col] {
					totalCost := forwardDistance[current.row][current.col] + reverseDistance[current.row][current.col]
					if totalCost < bestCost {
						bestCost = totalCost
						meetingPoint = [2]int{current.row, current.col}
						hasMeeting = true
					}
				}

				for dirIndex := 0; dirIndex < 4; dirIndex++ {
					neighborRow := current.row + deltaRows[dirIndex]
					neighborCol := current.col + deltaCols[dirIndex]
					if neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount {
						continue
					}
					if grid[neighborRow][neighborCol].CellType == CellWall { continue }
					if reverseVisited[neighborRow][neighborCol] { continue }
					newDist := reverseDistance[current.row][current.col] + 1
					if newDist < reverseDistance[neighborRow][neighborCol] {
						reverseDistance[neighborRow][neighborCol] = newDist // @step:open-node
						reverseParent[neighborRow][neighborCol] = [2]int{current.row, current.col}
						reverseQueue = append(reverseQueue, biDirNode{dist: newDist, row: neighborRow, col: neighborCol})
					}
				}
			}
		}

		// Early termination when meeting point is found and queues can't improve it
		if hasMeeting {
			forwardMin := maxDist
			if len(forwardQueue) > 0 { forwardMin = forwardQueue[0].dist }
			reverseMin := maxDist
			if len(reverseQueue) > 0 { reverseMin = reverseQueue[0].dist }
			if forwardMin+reverseMin >= bestCost { break }
		}
	}

	if !hasMeeting {
		return BidirectionalResult{Path: [][2]int{}, Visited: allVisited} // @step:complete
	}

	// Reconstruct path: forward half + reverse half
	forwardPath := reconstructPath(forwardParent, meetingPoint) // @step:trace-path
	reversePath := reconstructReversePath(reverseParent, meetingPoint) // @step:trace-path
	path := append(forwardPath, reversePath[1:]...) // @step:trace-path
	return BidirectionalResult{Path: path, Visited: allVisited} // @step:trace-path
}
