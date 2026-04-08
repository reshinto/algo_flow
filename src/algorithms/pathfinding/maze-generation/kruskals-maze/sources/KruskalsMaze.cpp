// Kruskal's Maze — Union-Find based maze generation by randomly removing walls
#include <algorithm>
#include <cstdlib>
#include <string>
#include <tuple>
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

int findSet(const std::vector<std::vector<int>>& setId, int row, int col) {
  // @step:initialize
  return setId[row][col];
}

void mergeSets(std::vector<std::vector<int>>& setId, int rowA, int colA, int rowB, int colB,
               int rowCount, int colCount) {
  // @step:initialize
  int idA = findSet(setId, rowA, colA);
  int idB = findSet(setId, rowB, colB);
  if (idA == idB) return;
  for (int rowIndex = 0; rowIndex < rowCount; rowIndex++)
    for (int colIndex = 0; colIndex < colCount; colIndex++)
      if (setId[rowIndex][colIndex] == idB) setId[rowIndex][colIndex] = idA;
}

MazeResult kruskalsMaze(std::vector<std::vector<GridCell>>& grid) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  int passagesCarved = 0; // @step:initialize

  // Union-Find: each cell has a set ID
  std::vector<std::vector<int>> setId(rowCount, std::vector<int>(colCount));
  for (int rowIndex = 0; rowIndex < rowCount; rowIndex++)
    for (int colIndex = 0; colIndex < colCount; colIndex++)
      setId[rowIndex][colIndex] = rowIndex * colCount + colIndex; // @step:initialize

  // Collect all internal walls between passage cells
  using Wall = std::tuple<int,int,int,int,int,int>;
  std::vector<Wall> walls; // @step:initialize

  for (int rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
    for (int colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
      if (grid[rowIndex][colIndex].cellType == CellType::Wall) {
        grid[rowIndex][colIndex].cellType = CellType::Empty; // @step:merge-cells
        passagesCarved++;
      }
      if (colIndex + 2 < colCount - 1)
        walls.push_back({rowIndex, colIndex+1, rowIndex, colIndex, rowIndex, colIndex+2});
      if (rowIndex + 2 < rowCount - 1)
        walls.push_back({rowIndex+1, colIndex, rowIndex, colIndex, rowIndex+2, colIndex});
    }
  }

  // Shuffle walls randomly (Fisher-Yates)
  for (int wallIndex = static_cast<int>(walls.size()) - 1; wallIndex > 0; wallIndex--) {
    int swapIndex = rand() % (wallIndex + 1);
    std::swap(walls[wallIndex], walls[swapIndex]);
  } // @step:merge-cells

  // Process each wall
  for (const auto& wall : walls) {
    auto [wallRow, wallCol, cellARow, cellACol, cellBRow, cellBCol] = wall;
    if (findSet(setId, cellARow, cellACol) != findSet(setId, cellBRow, cellBCol)) {
      // @step:merge-cells
      grid[wallRow][wallCol].cellType = CellType::Empty; // @step:merge-cells
      passagesCarved++;
      mergeSets(setId, cellARow, cellACol, cellBRow, cellBCol, rowCount, colCount); // @step:merge-cells
    }
  }

  return {passagesCarved}; // @step:complete
}
