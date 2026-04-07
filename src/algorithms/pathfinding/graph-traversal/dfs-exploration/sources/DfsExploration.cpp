// DFS Exploration — explore all reachable cells using iterative depth-first search with a stack
#include <stack>
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

struct DfsExplorationResult {
  std::vector<std::pair<int, int>> visited;
  int maxDepth;
};

DfsExplorationResult dfsExploration(const std::vector<std::vector<GridCell>>& grid,
                                     std::pair<int, int> start) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  std::vector<std::vector<bool>> visitedSet(rowCount, std::vector<bool>(colCount, false)); // @step:initialize
  std::vector<std::pair<int, int>> visited; // @step:initialize

  // Stack stores (row, col, depth) tuples for iterative DFS
  std::stack<std::tuple<int, int, int>> dfsStack; // @step:initialize,open-node
  dfsStack.push({start.first, start.second, 0}); // @step:initialize,open-node
  visitedSet[start.first][start.second] = true; // @step:open-node
  int maxDepth = 0; // @step:initialize

  // Directions in reverse order for natural DFS snaking
  const int deltaRows[] = {0, 0, 1, -1};
  const int deltaCols[] = {1, -1, 0, 0};

  while (!dfsStack.empty()) {
    // Pop from top of stack — DFS always expands the deepest unvisited cell
    auto [currentRow, currentCol, currentDepth] = dfsStack.top(); // @step:close-node
    dfsStack.pop(); // @step:close-node
    visited.push_back({currentRow, currentCol}); // @step:close-node
    if (currentDepth > maxDepth) maxDepth = currentDepth; // @step:close-node

    // Explore 4-directional neighbors in reverse order for natural DFS snaking
    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = currentRow + deltaRows[dirIndex];
      int neighborCol = currentCol + deltaCols[dirIndex];
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount)
        continue;
      if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
      if (visitedSet[neighborRow][neighborCol]) continue;
      visitedSet[neighborRow][neighborCol] = true; // @step:open-node
      dfsStack.push({neighborRow, neighborCol, currentDepth + 1}); // @step:open-node
    }
  }

  return {visited, maxDepth}; // @step:complete
}
