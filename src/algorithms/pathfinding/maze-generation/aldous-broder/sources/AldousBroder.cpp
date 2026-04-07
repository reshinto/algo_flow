// Aldous-Broder Maze — uniform random spanning tree via random walk
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

MazeResult aldousBroder(std::vector<std::vector<GridCell>>& grid, std::pair<int,int> start) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  std::vector<std::vector<bool>> visited(rowCount, std::vector<bool>(colCount, false)); // @step:initialize
  int passagesCarved = 0; // @step:initialize

  // Count total passage cells (odd row and odd col)
  int totalPassageCells = 0; // @step:initialize
  for (int rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2)
    for (int colIndex = 1; colIndex < colCount - 1; colIndex += 2)
      totalPassageCells++;

  int visitedCount = 0; // @step:initialize
  int currentRow = start.first; // @step:initialize
  int currentCol = start.second; // @step:initialize

  // Mark start as visited and carve it
  visited[currentRow][currentCol] = true; // @step:visit
  if (grid[currentRow][currentCol].cellType == CellType::Wall) {
    grid[currentRow][currentCol].cellType = CellType::Empty; // @step:carve-cell
    passagesCarved++;
  }
  visitedCount++;

  const int deltaRows[] = {-2, 2, 0, 0};
  const int deltaCols[] = {0, 0, -2, 2};
  int maxIterations = rowCount * colCount * 10;

  for (int iterations = 0; visitedCount < totalPassageCells && iterations < maxIterations; iterations++) {
    // Collect valid passage-cell neighbors
    std::vector<std::pair<int,int>> validNeighbors; // @step:visit
    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = currentRow + deltaRows[dirIndex];
      int neighborCol = currentCol + deltaCols[dirIndex];
      if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
      if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
      validNeighbors.push_back({neighborRow, neighborCol});
    }
    if (validNeighbors.empty()) break;

    // Pick a random neighbor (random walk)
    int chosenIndex = rand() % static_cast<int>(validNeighbors.size());
    auto [nextRow, nextCol] = validNeighbors[chosenIndex]; // @step:visit

    if (!visited[nextRow][nextCol]) {
      // Carve the wall between current and next
      int wallRow = currentRow + (nextRow - currentRow) / 2;
      int wallCol = currentCol + (nextCol - currentCol) / 2;
      grid[wallRow][wallCol].cellType = CellType::Empty; // @step:carve-cell
      passagesCarved++;

      if (grid[nextRow][nextCol].cellType == CellType::Wall) {
        grid[nextRow][nextCol].cellType = CellType::Empty; // @step:carve-cell
        passagesCarved++;
      }

      visited[nextRow][nextCol] = true; // @step:carve-cell
      visitedCount++;
    }

    currentRow = nextRow; // @step:visit
    currentCol = nextCol; // @step:visit
  }

  return {passagesCarved}; // @step:complete
}
