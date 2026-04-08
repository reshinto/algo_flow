// Prim's Maze — randomized Prim's algorithm for maze generation
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

MazeResult primsMaze(std::vector<std::vector<GridCell>>& grid, std::pair<int,int> start) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  std::vector<std::vector<bool>> inMaze(rowCount, std::vector<bool>(colCount, false)); // @step:initialize
  int passagesCarved = 0; // @step:initialize

  // Each frontier entry is (wallRow, wallCol, originRow, originCol)
  using FrontierCell = std::tuple<int,int,int,int>;
  std::vector<FrontierCell> frontier; // @step:initialize
  int startRow = start.first; // @step:initialize
  int startCol = start.second; // @step:initialize

  // Add start cell to maze
  inMaze[startRow][startCol] = true; // @step:open-node
  if (grid[startRow][startCol].cellType == CellType::Wall) {
    grid[startRow][startCol].cellType = CellType::Empty; // @step:open-node
    passagesCarved++;
  }

  const int deltaRows[] = {-2, 2, 0, 0};
  const int deltaCols[] = {0, 0, -2, 2};

  // Add initial frontier walls
  for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
    int neighborRow = startRow + deltaRows[dirIndex];
    int neighborCol = startCol + deltaCols[dirIndex];
    if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
    if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
    if (!inMaze[neighborRow][neighborCol]) {
      frontier.push_back({neighborRow, neighborCol, startRow, startCol}); // @step:open-node
    }
  }

  while (!frontier.empty()) {
    // Randomly pick a frontier wall
    int pickedIndex = rand() % static_cast<int>(frontier.size());
    auto [pickedRow, pickedCol, originRow, originCol] = frontier[pickedIndex]; // @step:carve-cell
    frontier.erase(frontier.begin() + pickedIndex);

    if (inMaze[pickedRow][pickedCol]) continue; // @step:carve-cell

    // Carve the passage cell
    inMaze[pickedRow][pickedCol] = true; // @step:carve-cell
    if (grid[pickedRow][pickedCol].cellType == CellType::Wall) {
      grid[pickedRow][pickedCol].cellType = CellType::Empty; // @step:carve-cell
      passagesCarved++;
    }

    // Carve the wall between origin and picked
    int wallRow = originRow + (pickedRow - originRow) / 2;
    int wallCol = originCol + (pickedCol - originCol) / 2;
    if (grid[wallRow][wallCol].cellType == CellType::Wall) {
      grid[wallRow][wallCol].cellType = CellType::Empty; // @step:carve-cell
      passagesCarved++;
    }

    // Add new frontier neighbors
    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = pickedRow + deltaRows[dirIndex];
      int neighborCol = pickedCol + deltaCols[dirIndex];
      if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
      if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
      if (!inMaze[neighborRow][neighborCol]) {
        frontier.push_back({neighborRow, neighborCol, pickedRow, pickedCol}); // @step:open-node
      }
    }
  }

  return {passagesCarved}; // @step:complete
}
