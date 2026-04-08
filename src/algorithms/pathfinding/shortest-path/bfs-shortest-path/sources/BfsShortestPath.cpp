// BFS Shortest Path — find shortest path on an unweighted grid using breadth-first search
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

struct BfsResult {
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

BfsResult bfsShortestPath(const std::vector<std::vector<GridCell>>& grid, Cell start, Cell end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  Cell noParent = {-1, -1};
  std::vector<std::vector<Cell>> parent(rowCount, std::vector<Cell>(colCount, noParent)); // @step:initialize
  std::vector<Cell> visited; // @step:initialize
  // Seed the queue with the start cell
  std::queue<Cell> queue; // @step:initialize,open-node
  queue.push(start);
  std::vector<std::vector<bool>> visitedSet(rowCount, std::vector<bool>(colCount, false)); // @step:initialize,open-node
  visitedSet[start.first][start.second] = true; // @step:open-node

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  while (!queue.empty()) {
    // Dequeue the front cell — BFS explores level by level
    auto [currentRow, currentCol] = queue.front(); // @step:close-node
    queue.pop();
    visited.push_back({currentRow, currentCol}); // @step:close-node

    // Check if we reached the end
    if (currentRow == end.first && currentCol == end.second) {
      // @step:trace-path
      return {reconstructPath(parent, end, noParent), visited}; // @step:trace-path
    }

    // Explore 4-directional neighbors (up, down, left, right)
    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = currentRow + deltaRows[dirIndex];
      int neighborCol = currentCol + deltaCols[dirIndex];
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) continue;
      if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
      if (visitedSet[neighborRow][neighborCol]) continue;
      // Mark visited immediately on enqueue to avoid duplicates
      visitedSet[neighborRow][neighborCol] = true; // @step:open-node
      parent[neighborRow][neighborCol] = {currentRow, currentCol}; // @step:open-node
      queue.push({neighborRow, neighborCol}); // @step:open-node
    }
  }

  return {{}, visited}; // @step:complete
}
