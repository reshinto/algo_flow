// BFS Exploration — explore all reachable cells layer-by-layer using breadth-first search
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

struct BfsExplorationResult {
  std::vector<std::pair<int, int>> visited;
  int layers;
};

BfsExplorationResult bfsExploration(const std::vector<std::vector<GridCell>>& grid,
                                     std::pair<int, int> start) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  std::vector<std::vector<bool>> visitedSet(rowCount, std::vector<bool>(colCount, false)); // @step:initialize
  std::vector<std::pair<int, int>> visited; // @step:initialize

  // Seed the queue with the start cell and mark layer boundaries
  std::queue<std::pair<int, int>> bfsQueue; // @step:initialize,open-node
  bfsQueue.push(start); // @step:initialize,open-node
  visitedSet[start.first][start.second] = true; // @step:open-node
  int layerCount = 0; // @step:initialize

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  while (!bfsQueue.empty()) {
    // Process the entire current layer before advancing depth
    int layerSize = static_cast<int>(bfsQueue.size()); // @step:close-node
    layerCount++; // @step:close-node

    for (int offsetIndex = 0; offsetIndex < layerSize; offsetIndex++) {
      auto current = bfsQueue.front(); // @step:close-node
      bfsQueue.pop(); // @step:close-node
      int currentRow = current.first; // @step:close-node
      int currentCol = current.second; // @step:close-node
      visited.push_back({currentRow, currentCol}); // @step:close-node

      // Explore 4-directional neighbors
      for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
        int neighborRow = currentRow + deltaRows[dirIndex];
        int neighborCol = currentCol + deltaCols[dirIndex];
        if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount)
          continue;
        if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
        if (visitedSet[neighborRow][neighborCol]) continue;
        visitedSet[neighborRow][neighborCol] = true; // @step:open-node
        bfsQueue.push({neighborRow, neighborCol}); // @step:open-node
      }
    }
  }

  return {visited, layerCount}; // @step:complete
}
