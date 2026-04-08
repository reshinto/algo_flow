// Multi-Source BFS — computes distance from nearest wall for every empty cell simultaneously
#include <queue>
#include <string>
#include <vector>

enum class CellType { Empty, Wall, Start, End };

struct GridCell {
  int row;
  int col;
  CellType cellType;
  std::string state;
};

struct MultiSourceResult {
  std::vector<std::vector<int>> distances;
  int maxDistance;
};

MultiSourceResult multiSourceBfs(const std::vector<std::vector<GridCell>>& grid) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  std::vector<std::vector<int>> distances(rowCount, std::vector<int>(colCount, -1)); // @step:initialize

  // Seed queue with ALL empty cells adjacent to a wall (distance = 1)
  std::queue<std::pair<int, int>> bfsQueue; // @step:initialize,open-node
  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  for (int rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (int colIndex = 0; colIndex < colCount; colIndex++) {
      if (grid[rowIndex][colIndex].cellType == CellType::Wall) continue;
      // Check if any neighbor is a wall
      bool adjacentToWall = false;
      for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
        int neighborRow = rowIndex + deltaRows[dirIndex];
        int neighborCol = colIndex + deltaCols[dirIndex];
        if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) {
          adjacentToWall = true; // grid boundary counts as wall
          break;
        }
        if (grid[neighborRow][neighborCol].cellType == CellType::Wall) {
          // @step:open-node
          adjacentToWall = true;
          break;
        }
      }
      if (adjacentToWall) {
        distances[rowIndex][colIndex] = 1; // @step:open-node
        bfsQueue.push({rowIndex, colIndex}); // @step:open-node
      }
    }
  }

  int maxDistance = 1;

  while (!bfsQueue.empty()) {
    auto current = bfsQueue.front(); // @step:close-node
    bfsQueue.pop();
    int currentRow = current.first; // @step:close-node
    int currentCol = current.second; // @step:close-node
    int currentDistance = distances[currentRow][currentCol]; // @step:update-cost

    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = currentRow + deltaRows[dirIndex];
      int neighborCol = currentCol + deltaCols[dirIndex];
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount)
        continue;
      if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
      if (distances[neighborRow][neighborCol] != -1) continue;
      int neighborDistance = currentDistance + 1;
      distances[neighborRow][neighborCol] = neighborDistance; // @step:update-cost
      if (neighborDistance > maxDistance) maxDistance = neighborDistance;
      bfsQueue.push({neighborRow, neighborCol}); // @step:open-node
    }
  }

  return {distances, maxDistance}; // @step:complete
}
