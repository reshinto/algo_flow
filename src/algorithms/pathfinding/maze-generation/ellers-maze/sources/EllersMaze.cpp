// Eller's Maze — row-by-row maze generation with set merging and vertical extensions
#include <algorithm>
#include <cstdlib>
#include <map>
#include <string>
#include <vector>

enum class CellType { Empty, Wall, Start, End };

struct GridCell {
  int row;
  int col;
  CellType cellType;
  std::string state;
};

struct MazeResult {
  int passagesCarved;
};

MazeResult ellersMaze(std::vector<std::vector<GridCell>>& grid) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  int passagesCarved = 0; // @step:initialize

  // Passage column indices (odd columns)
  std::vector<int> passageCols; // @step:initialize
  for (int colIndex = 1; colIndex < colCount - 1; colIndex += 2) passageCols.push_back(colIndex);
  int passageColCount = static_cast<int>(passageCols.size()); // @step:initialize

  // Assign each cell in the first passage row its own set
  int nextSetId = 1; // @step:initialize
  std::vector<int> currentSets(passageColCount);
  for (int idx = 0; idx < passageColCount; idx++) currentSets[idx] = nextSetId++; // @step:initialize

  std::vector<int> passageRows;
  for (int rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) passageRows.push_back(rowIndex);

  for (int passRowPos = 0; passRowPos < static_cast<int>(passageRows.size()); passRowPos++) {
    int passageRow = passageRows[passRowPos];
    bool isLastRow = passRowPos == static_cast<int>(passageRows.size()) - 1; // @step:carve-cell

    // Step 1: Carve all passage cells in this row
    for (int passageCol : passageCols) {
      if (grid[passageRow][passageCol].cellType == CellType::Wall) {
        grid[passageRow][passageCol].cellType = CellType::Empty; // @step:carve-cell
        passagesCarved++;
      }
    }

    // Step 2: Randomly merge adjacent cells in different sets
    for (int cellPos = 0; cellPos < passageColCount - 1; cellPos++) {
      int leftSetId = currentSets[cellPos];
      int rightSetId = currentSets[cellPos + 1];
      int wallCol = passageCols[cellPos] + 1; // @step:merge-cells

      bool shouldMerge = isLastRow ? leftSetId != rightSetId
                                   : (rand() % 2 == 0 && leftSetId != rightSetId); // @step:merge-cells

      if (shouldMerge) {
        grid[passageRow][wallCol].cellType = CellType::Empty; // @step:merge-cells
        passagesCarved++;
        for (int updatePos = 0; updatePos < passageColCount; updatePos++) {
          if (currentSets[updatePos] == rightSetId) currentSets[updatePos] = leftSetId;
        }
      }
    }

    if (isLastRow) break;

    // Step 3: For each set, carve at least one downward connection
    int nextRow = passageRows[passRowPos + 1];

    std::map<int, std::vector<int>> setGroups; // @step:carve-cell
    for (int cellPos = 0; cellPos < passageColCount; cellPos++)
      setGroups[currentSets[cellPos]].push_back(cellPos);

    std::vector<int> nextSets(passageColCount, 0);

    for (auto& [setId, positions] : setGroups) {
      int extensionCount = std::max(1, static_cast<int>(positions.size()) / 2 + 1);
      for (int extIndex = 0; extIndex < static_cast<int>(positions.size()); extIndex++) {
        int cellPos = positions[extIndex];
        int passageCol = passageCols[cellPos];
        int betweenRow = passageRow + 1;
        if (extIndex < extensionCount) {
          grid[betweenRow][passageCol].cellType = CellType::Empty; // @step:carve-cell
          passagesCarved++;
          nextSets[cellPos] = setId;
        } else {
          nextSets[cellPos] = nextSetId++;
        }
      }
    }

    for (int passageCol : passageCols) {
      if (grid[nextRow][passageCol].cellType == CellType::Wall) {
        grid[nextRow][passageCol].cellType = CellType::Empty; // @step:carve-cell
        passagesCarved++;
      }
    }

    currentSets = nextSets;
  }

  return {passagesCarved}; // @step:complete
}
