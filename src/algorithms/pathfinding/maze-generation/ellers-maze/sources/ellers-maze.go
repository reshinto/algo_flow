// Eller's Maze — row-by-row maze generation with set merging and vertical extensions
package ellersmaze

import "math/rand"

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

type MazeResult struct {
	PassagesCarved int
}

func EllersMaze(grid [][]GridCell) MazeResult {
	rowCount := len(grid) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(grid[0]) // @step:initialize
	}
	passagesCarved := 0 // @step:initialize

	// Passage column indices (odd columns)
	var passageCols []int // @step:initialize
	for colIndex := 1; colIndex < colCount-1; colIndex += 2 {
		passageCols = append(passageCols, colIndex)
	}
	passageColCount := len(passageCols) // @step:initialize

	// Assign each cell in the first passage row its own set
	nextSetId := 1 // @step:initialize
	currentSets := make([]int, passageColCount)
	for idx := range currentSets {
		currentSets[idx] = nextSetId
		nextSetId++
	} // @step:initialize

	var passageRows []int
	for rowIndex := 1; rowIndex < rowCount-1; rowIndex += 2 {
		passageRows = append(passageRows, rowIndex)
	}

	for passRowPos, passageRow := range passageRows {
		isLastRow := passRowPos == len(passageRows)-1 // @step:carve-cell

		// Step 1: Carve all passage cells in this row
		for _, passageCol := range passageCols {
			if grid[passageRow][passageCol].CellType == CellWall {
				grid[passageRow][passageCol].CellType = CellEmpty // @step:carve-cell
				passagesCarved++
			}
		}

		// Step 2: Randomly merge adjacent cells in different sets
		for cellPos := 0; cellPos < passageColCount-1; cellPos++ {
			leftSetId := currentSets[cellPos]
			rightSetId := currentSets[cellPos+1]
			wallCol := passageCols[cellPos] + 1 // @step:merge-cells

			shouldMerge := false
			if isLastRow {
				shouldMerge = leftSetId != rightSetId
			} else {
				shouldMerge = rand.Float64() < 0.5 && leftSetId != rightSetId
			} // @step:merge-cells

			if shouldMerge {
				grid[passageRow][wallCol].CellType = CellEmpty // @step:merge-cells
				passagesCarved++
				for updatePos := 0; updatePos < passageColCount; updatePos++ {
					if currentSets[updatePos] == rightSetId {
						currentSets[updatePos] = leftSetId
					}
				}
			}
		}

		if isLastRow { break }

		// Step 3: For each set, carve at least one downward connection
		nextRow := passageRows[passRowPos+1]

		setGroups := make(map[int][]int) // @step:carve-cell
		for cellPos := 0; cellPos < passageColCount; cellPos++ {
			setID := currentSets[cellPos]
			setGroups[setID] = append(setGroups[setID], cellPos)
		}

		nextSets := make([]int, passageColCount)

		for setId, positions := range setGroups {
			extensionCount := len(positions)/2 + 1
			if extensionCount < 1 { extensionCount = 1 }
			for extIndex, cellPos := range positions {
				passageCol := passageCols[cellPos]
				betweenRow := passageRow + 1
				if extIndex < extensionCount {
					grid[betweenRow][passageCol].CellType = CellEmpty // @step:carve-cell
					passagesCarved++
					nextSets[cellPos] = setId
				} else {
					nextSets[cellPos] = nextSetId
					nextSetId++
				}
			}
		}

		for _, passageCol := range passageCols {
			if grid[nextRow][passageCol].CellType == CellWall {
				grid[nextRow][passageCol].CellType = CellEmpty // @step:carve-cell
				passagesCarved++
			}
		}

		currentSets = nextSets
	}

	return MazeResult{PassagesCarved: passagesCarved} // @step:complete
}
