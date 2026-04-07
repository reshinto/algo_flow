// Recursive Division Maze — builds walls in an open grid, leaving one gap per wall
#include <cstdlib>
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
  int wallsBuilt;
};

void buildWallsInRegion(std::vector<std::vector<GridCell>>& grid,
                         int topRow, int leftCol, int bottomRow, int rightCol,
                         std::pair<int,int> startPos, std::pair<int,int> endPos,
                         int& wallsBuilt) {
  int regionHeight = bottomRow - topRow; // @step:carve-cell
  int regionWidth = rightCol - leftCol; // @step:carve-cell

  if (regionHeight < 2 || regionWidth < 2) return; // @step:carve-cell

  // Choose orientation: horizontal wall if taller, vertical if wider
  bool buildHorizontal = regionHeight >= regionWidth; // @step:carve-cell

  if (buildHorizontal) {
    int wallRow = topRow + 2 * (rand() % (regionHeight / 2)) + 1; // @step:carve-cell
    int gapCol = leftCol + 2 * (rand() % ((regionWidth + 2) / 2)); // @step:carve-cell

    for (int colIndex = leftCol; colIndex <= rightCol; colIndex++) {
      // @step:carve-cell
      if (wallRow < 0 || wallRow >= static_cast<int>(grid.size())) continue;
      if (colIndex < 0 || colIndex >= static_cast<int>(grid[0].size())) continue;
      auto& cell = grid[wallRow][colIndex];
      if (cell.cellType == CellType::Start || cell.cellType == CellType::End) continue;
      if (colIndex == gapCol) continue;
      cell.cellType = CellType::Wall; // @step:carve-cell
      wallsBuilt++;
    }

    buildWallsInRegion(grid, topRow, leftCol, wallRow - 1, rightCol, startPos, endPos, wallsBuilt); // @step:carve-cell
    buildWallsInRegion(grid, wallRow + 1, leftCol, bottomRow, rightCol, startPos, endPos, wallsBuilt); // @step:carve-cell
  } else {
    int wallCol = leftCol + 2 * (rand() % (regionWidth / 2)) + 1; // @step:carve-cell
    int gapRow = topRow + 2 * (rand() % ((regionHeight + 2) / 2)); // @step:carve-cell

    for (int rowIndex = topRow; rowIndex <= bottomRow; rowIndex++) {
      // @step:carve-cell
      if (rowIndex < 0 || rowIndex >= static_cast<int>(grid.size())) continue;
      if (wallCol < 0 || wallCol >= static_cast<int>(grid[0].size())) continue;
      auto& cell = grid[rowIndex][wallCol];
      if (cell.cellType == CellType::Start || cell.cellType == CellType::End) continue;
      if (rowIndex == gapRow) continue;
      cell.cellType = CellType::Wall; // @step:carve-cell
      wallsBuilt++;
    }

    buildWallsInRegion(grid, topRow, leftCol, bottomRow, wallCol - 1, startPos, endPos, wallsBuilt); // @step:carve-cell
    buildWallsInRegion(grid, topRow, wallCol + 1, bottomRow, rightCol, startPos, endPos, wallsBuilt); // @step:carve-cell
  }
}

MazeResult recursiveDivision(std::vector<std::vector<GridCell>>& grid,
                               std::pair<int,int> startPos, std::pair<int,int> endPos) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  int wallsBuilt = 0; // @step:initialize

  buildWallsInRegion(grid, 0, 0, rowCount - 1, colCount - 1, startPos, endPos, wallsBuilt); // @step:carve-cell

  return {wallsBuilt}; // @step:complete
}
