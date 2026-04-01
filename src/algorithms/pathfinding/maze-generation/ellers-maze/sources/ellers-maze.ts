// Eller's Maze — row-by-row maze generation with set merging and vertical extensions
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface MazeResult {
  grid: GridCell[][];
  passagesCarved: number;
}

function ellersMaze(grid: GridCell[][]): MazeResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  let passagesCarved = 0; // @step:initialize

  // Passage column indices (odd columns)
  const passageCols: number[] = []; // @step:initialize
  for (let colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
    passageCols.push(colIndex);
  }
  const passageColCount = passageCols.length; // @step:initialize

  // Assign each cell in the first passage row its own set
  let nextSetId = 1; // @step:initialize
  let currentSets: number[] = Array.from({ length: passageColCount }, () => nextSetId++); // @step:initialize

  // Process each passage row
  const passageRows: number[] = [];
  for (let rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
    passageRows.push(rowIndex);
  }

  for (let passageRowPos = 0; passageRowPos < passageRows.length; passageRowPos++) {
    const passageRow = passageRows[passageRowPos]!;
    const isLastRow = passageRowPos === passageRows.length - 1; // @step:carve-cell

    // Step 1: Carve all passage cells in this row
    for (const passageCol of passageCols) {
      if (grid[passageRow]![passageCol]!.type === "wall") {
        grid[passageRow]![passageCol]!.type = "empty"; // @step:carve-cell
        passagesCarved++;
      }
    }

    // Step 2: Randomly merge adjacent cells in different sets (or always merge on last row)
    for (let cellPos = 0; cellPos < passageColCount - 1; cellPos++) {
      const leftSetId = currentSets[cellPos]!;
      const rightSetId = currentSets[cellPos + 1]!;
      const wallCol = passageCols[cellPos]! + 1; // @step:merge-cells

      const shouldMerge = isLastRow
        ? leftSetId !== rightSetId // Must merge all different sets on last row
        : Math.random() < 0.5 && leftSetId !== rightSetId; // @step:merge-cells

      if (shouldMerge) {
        // Carve the wall between left and right
        grid[passageRow]![wallCol]!.type = "empty"; // @step:merge-cells
        passagesCarved++;
        // Update all cells with rightSetId to use leftSetId
        for (let updatePos = 0; updatePos < passageColCount; updatePos++) {
          if (currentSets[updatePos] === rightSetId) {
            currentSets[updatePos] = leftSetId;
          }
        }
      }
    }

    if (isLastRow) break; // No vertical extensions needed on the last row

    // Step 3: For each set, carve at least one downward connection
    const nextRow = passageRows[passageRowPos + 1]!;

    // Carve the row between passage rows
    for (const passageCol of passageCols) {
      const betweenRow = passageRow + 1;
      if (grid[betweenRow]?.[passageCol]?.type === "wall") {
        // Will be opened if we extend down through this cell
      }
    }

    // Group cells by set
    const setGroups: Map<number, number[]> = new Map(); // @step:carve-cell
    for (let cellPos = 0; cellPos < passageColCount; cellPos++) {
      const setId = currentSets[cellPos]!;
      const existing = setGroups.get(setId) ?? [];
      existing.push(cellPos);
      setGroups.set(setId, existing);
    }

    const nextSets: number[] = new Array(passageColCount).fill(0);

    // For each set, randomly choose which cells extend downward (at least one must)
    for (const [setId, positions] of setGroups) {
      const shuffled = [...positions].sort(() => Math.random() - 0.5);
      const extensionCount = Math.max(1, Math.floor(Math.random() * positions.length) + 1);

      for (let extIndex = 0; extIndex < shuffled.length; extIndex++) {
        const cellPos = shuffled[extIndex]!;
        const passageCol = passageCols[cellPos]!;
        const betweenRow = passageRow + 1;

        if (extIndex < extensionCount) {
          // Carve downward
          grid[betweenRow]![passageCol]!.type = "empty"; // @step:carve-cell
          passagesCarved++;
          nextSets[cellPos] = setId; // Inherit parent set
        } else {
          // No downward extension — assign new set for next row
          nextSets[cellPos] = nextSetId++;
        }
      }
    }

    // Carve the next row passage cells
    for (const passageCol of passageCols) {
      if (grid[nextRow]![passageCol]!.type === "wall") {
        grid[nextRow]![passageCol]!.type = "empty"; // @step:carve-cell
        passagesCarved++;
      }
    }

    currentSets = nextSets;
  }

  return { grid, passagesCarved }; // @step:complete
}
