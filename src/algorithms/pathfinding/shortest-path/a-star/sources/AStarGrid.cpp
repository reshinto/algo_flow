// A* Search — find shortest path using Manhattan distance heuristic
#include <algorithm>
#include <climits>
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

struct AStarResult {
  std::vector<std::pair<int, int>> path;
  std::vector<std::pair<int, int>> visited;
};

using Cell = std::pair<int, int>;

int manhattanDistance(int rowA, int colA, int rowB, int colB) {
  return std::abs(rowA - rowB) + std::abs(colA - colB);
}

std::vector<Cell> reconstructPath(const std::vector<std::vector<Cell>>& parent, Cell end, Cell noParent) {
  std::vector<Cell> path;
  auto current = end;
  while (current != noParent) {
    path.insert(path.begin(), current);
    current = parent[current.first][current.second];
  }
  return path;
}

AStarResult aStarGrid(const std::vector<std::vector<GridCell>>& grid, Cell start, Cell end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  Cell noParent = {-1, -1};
  std::vector<std::vector<int>> gCost(rowCount, std::vector<int>(colCount, INT_MAX)); // @step:initialize
  gCost[start.first][start.second] = 0; // @step:initialize
  std::vector<std::vector<Cell>> parent(rowCount, std::vector<Cell>(colCount, noParent)); // @step:initialize
  std::vector<std::vector<bool>> closedSet(rowCount, std::vector<bool>(colCount, false)); // @step:initialize
  std::vector<Cell> visited; // @step:initialize

  // Priority queue ordered by fCost = gCost + hCost
  // Open list: (fCost, hCost, row, col)
  int startHCost = manhattanDistance(start.first, start.second, end.first, end.second);
  std::vector<std::tuple<int, int, int, int>> openSet = {{startHCost, startHCost, start.first, start.second}}; // @step:initialize,open-node

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  while (!openSet.empty()) {
    // Extract node with lowest fCost
    std::sort(openSet.begin(), openSet.end()); // @step:close-node
    auto [fVal, hVal, currentRow, currentCol] = openSet.front(); // @step:close-node
    openSet.erase(openSet.begin());
    if (closedSet[currentRow][currentCol]) continue; // @step:close-node
    closedSet[currentRow][currentCol] = true; // @step:close-node
    visited.push_back({currentRow, currentCol}); // @step:close-node

    // Check if we reached the end
    if (currentRow == end.first && currentCol == end.second) {
      // @step:trace-path
      return {reconstructPath(parent, end, noParent), visited}; // @step:trace-path
    }

    // Explore 4-directional neighbors
    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = currentRow + deltaRows[dirIndex];
      int neighborCol = currentCol + deltaCols[dirIndex];
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) continue;
      if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
      if (closedSet[neighborRow][neighborCol]) continue;

      int tentativeGCost = gCost[currentRow][currentCol] + 1; // @step:update-cost
      if (tentativeGCost < gCost[neighborRow][neighborCol]) {
        // @step:update-cost
        gCost[neighborRow][neighborCol] = tentativeGCost; // @step:update-cost
        parent[neighborRow][neighborCol] = {currentRow, currentCol};
        int neighborHCost = manhattanDistance(neighborRow, neighborCol, end.first, end.second);
        int neighborFCost = tentativeGCost + neighborHCost;
        openSet.push_back({neighborFCost, neighborHCost, neighborRow, neighborCol});
      }
    }
  }

  return {{}, visited}; // @step:complete
}
