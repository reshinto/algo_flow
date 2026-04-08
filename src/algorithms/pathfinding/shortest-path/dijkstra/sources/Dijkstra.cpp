// Dijkstra's Algorithm — find shortest path on a weighted grid
#include <algorithm>
#include <climits>
#include <string>
#include <vector>

enum class CellType { Empty, Wall, Start, End };

struct GridCell {
  int row;
  int col;
  CellType cellType;
  std::string state;
};

struct DijkstraResult {
  std::vector<std::pair<int, int>> path;
  std::vector<std::pair<int, int>> visited;
};

using Cell = std::pair<int, int>;

std::vector<Cell> reconstructPath(const std::vector<std::vector<Cell>>& parent, Cell end, Cell noParent) {
  std::vector<Cell> path;
  auto current = end;
  while (current != noParent) {
    path.insert(path.begin(), current);
    current = parent[current.first][current.second];
  }
  return path;
}

DijkstraResult dijkstra(const std::vector<std::vector<GridCell>>& grid, Cell start, Cell end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  Cell noParent = {-1, -1};
  std::vector<std::vector<int>> distance(rowCount, std::vector<int>(colCount, INT_MAX)); // @step:initialize
  distance[start.first][start.second] = 0; // @step:initialize
  std::vector<std::vector<Cell>> parent(rowCount, std::vector<Cell>(colCount, noParent)); // @step:initialize
  // Seed the frontier with the start cell
  // Open set: (dist, row, col)
  std::vector<std::tuple<int, int, int>> openSet = {{0, start.first, start.second}}; // @step:initialize,open-node
  std::vector<std::vector<bool>> visitedSet(rowCount, std::vector<bool>(colCount, false)); // @step:initialize,open-node
  std::vector<Cell> visited; // @step:initialize

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  while (!openSet.empty()) {
    // Extract the node with the smallest tentative distance
    std::sort(openSet.begin(), openSet.end()); // @step:close-node
    auto [currentDist, currentRow, currentCol] = openSet.front(); // @step:close-node
    openSet.erase(openSet.begin());
    if (visitedSet[currentRow][currentCol]) continue; // @step:close-node
    visitedSet[currentRow][currentCol] = true; // @step:close-node
    visited.push_back({currentRow, currentCol}); // @step:close-node

    // Check if we reached the end — reconstruct path via parent pointers
    if (currentRow == end.first && currentCol == end.second) {
      // @step:trace-path
      return {reconstructPath(parent, end, noParent), visited}; // @step:trace-path
    }

    // Explore 4-directional neighbors (up, down, left, right)
    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = currentRow + deltaRows[dirIndex];
      int neighborCol = currentCol + deltaCols[dirIndex];
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) continue;
      if (grid[neighborRow][neighborCol].cellType == CellType::Wall || visitedSet[neighborRow][neighborCol]) continue;
      // Relax the edge: update distance if a shorter path is found
      int newDistance = distance[currentRow][currentCol] + 1; // @step:update-cost
      if (newDistance < distance[neighborRow][neighborCol]) {
        // @step:update-cost
        distance[neighborRow][neighborCol] = newDistance; // @step:update-cost
        parent[neighborRow][neighborCol] = {currentRow, currentCol};
        openSet.push_back({newDistance, neighborRow, neighborCol});
      }
    }
  }

  return {{}, visited}; // @step:complete
}
