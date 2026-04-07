// Flood Fill BFS — classic paint bucket fill using breadth-first search
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

struct FloodFillResult {
  std::vector<std::pair<int, int>> filled;
  int count;
};

FloodFillResult floodFillBfs(const std::vector<std::vector<GridCell>>& grid,
                              std::pair<int, int> start) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  std::vector<std::vector<bool>> filledSet(rowCount, std::vector<bool>(colCount, false)); // @step:initialize
  std::vector<std::pair<int, int>> filled; // @step:initialize
  // Seed the queue with the start cell
  std::queue<std::pair<int, int>> bfsQueue; // @step:initialize,open-node
  bfsQueue.push(start); // @step:initialize,open-node
  filledSet[start.first][start.second] = true; // @step:open-node

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  while (!bfsQueue.empty()) {
    // Dequeue the front cell — BFS processes cells level by level
    auto current = bfsQueue.front(); // @step:close-node
    bfsQueue.pop(); // @step:close-node
    int currentRow = current.first; // @step:close-node
    int currentCol = current.second; // @step:close-node
    filled.push_back({currentRow, currentCol}); // @step:close-node

    // Explore 4-directional neighbors (up, down, left, right)
    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = currentRow + deltaRows[dirIndex];
      int neighborCol = currentCol + deltaCols[dirIndex];
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount)
        continue;
      if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
      if (filledSet[neighborRow][neighborCol]) continue;
      // Mark on enqueue to avoid duplicates
      filledSet[neighborRow][neighborCol] = true; // @step:open-node
      bfsQueue.push({neighborRow, neighborCol}); // @step:open-node
    }
  }
  int count = static_cast<int>(filled.size());
  return {filled, count}; // @step:complete
}
