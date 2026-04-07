// Binary Tree Maze — for each cell, randomly carve north or east
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
  int passagesCarved;
};

MazeResult binaryTreeMaze(std::vector<std::vector<GridCell>>& grid) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  int passagesCarved = 0; // @step:initialize

  // Carve all passage cells first
  for (int rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
    for (int colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
      if (grid[rowIndex][colIndex].cellType == CellType::Wall) {
        grid[rowIndex][colIndex].cellType = CellType::Empty; // @step:carve-cell
        passagesCarved++;
      }

      // Determine which directions are available: north (row-1) and east (col+1)
      bool canGoNorth = rowIndex - 2 >= 1; // @step:carve-cell
      bool canGoEast = colIndex + 2 <= colCount - 2; // @step:carve-cell

      if (canGoNorth && canGoEast) {
        if (rand() % 2 == 0) {
          grid[rowIndex - 1][colIndex].cellType = CellType::Empty; // @step:carve-cell — carve north
          passagesCarved++;
        } else {
          grid[rowIndex][colIndex + 1].cellType = CellType::Empty; // @step:carve-cell — carve east
          passagesCarved++;
        }
      } else if (canGoNorth) {
        grid[rowIndex - 1][colIndex].cellType = CellType::Empty; // @step:carve-cell — only north available
        passagesCarved++;
      } else if (canGoEast) {
        grid[rowIndex][colIndex + 1].cellType = CellType::Empty; // @step:carve-cell — only east available
        passagesCarved++;
      }
      // Corner cell (top-right): no north or east — leave isolated
    }
  }

  return {passagesCarved}; // @step:complete
}
