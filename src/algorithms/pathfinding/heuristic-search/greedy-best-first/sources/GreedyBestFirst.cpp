// Greedy Best-First Search — navigate a grid using only the heuristic h(n) = Manhattan distance
#include <algorithm>
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

struct GreedyResult {
  std::vector<std::pair<int, int>> path;
  std::vector<std::pair<int, int>> visited;
};

int manhattanDistance(std::pair<int,int> pointA, std::pair<int,int> pointB) {
  return std::abs(pointA.first - pointB.first) + std::abs(pointA.second - pointB.second);
}

std::vector<std::pair<int,int>> reconstructPath(
    const std::vector<std::vector<std::pair<int,int>>>& parent,
    std::pair<int,int> end, std::pair<int,int> noParent) {
  std::vector<std::pair<int,int>> path;
  auto current = end;
  while (current != noParent) {
    path.insert(path.begin(), current);
    current = parent[current.first][current.second];
  }
  return path;
}

GreedyResult greedyBestFirst(const std::vector<std::vector<GridCell>>& grid,
                               std::pair<int,int> start, std::pair<int,int> end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  std::pair<int,int> noParent = {-1, -1};
  std::vector<std::vector<std::pair<int,int>>> parent(rowCount, std::vector<std::pair<int,int>>(colCount, noParent)); // @step:initialize
  std::vector<std::pair<int,int>> visited; // @step:initialize

  // Priority queue entries: (hCost, row, col)
  std::vector<std::tuple<int,int,int>> openList = {{manhattanDistance(start, end), start.first, start.second}}; // @step:initialize,open-node
  std::vector<std::vector<bool>> inOpenSet(rowCount, std::vector<bool>(colCount, false)); // @step:initialize,open-node
  std::vector<std::vector<bool>> closedSet(rowCount, std::vector<bool>(colCount, false)); // @step:initialize
  inOpenSet[start.first][start.second] = true; // @step:open-node

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  while (!openList.empty()) {
    // Dequeue node with lowest hCost (greedy: ignore g-cost entirely)
    std::sort(openList.begin(), openList.end()); // @step:close-node
    auto [hVal, currentRow, currentCol] = openList.front(); // @step:close-node
    openList.erase(openList.begin()); // @step:close-node

    closedSet[currentRow][currentCol] = true; // @step:close-node
    visited.push_back({currentRow, currentCol}); // @step:close-node

    // Check if goal reached
    if (currentRow == end.first && currentCol == end.second) {
      // @step:trace-path
      return {reconstructPath(parent, end, noParent), visited}; // @step:trace-path
    }

    // Expand neighbors sorted by heuristic only
    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = currentRow + deltaRows[dirIndex];
      int neighborCol = currentCol + deltaCols[dirIndex];
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) continue;
      if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
      if (closedSet[neighborRow][neighborCol]) continue;
      if (inOpenSet[neighborRow][neighborCol]) continue;

      // Greedy: use only heuristic, g-cost is always treated as 0
      int hCost = manhattanDistance({neighborRow, neighborCol}, end); // @step:open-node
      inOpenSet[neighborRow][neighborCol] = true; // @step:open-node
      parent[neighborRow][neighborCol] = {currentRow, currentCol}; // @step:open-node
      openList.push_back({hCost, neighborRow, neighborCol}); // @step:open-node
    }
  }

  return {{}, visited}; // @step:complete
}
