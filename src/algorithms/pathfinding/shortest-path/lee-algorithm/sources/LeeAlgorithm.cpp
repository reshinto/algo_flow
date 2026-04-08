// Lee Algorithm — BFS wavefront shortest path with distance numbering
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

struct LeeResult {
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

LeeResult leeAlgorithm(const std::vector<std::vector<GridCell>>& grid, Cell start, Cell end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  // Wave number map: each cell gets the wavefront distance from start
  Cell noParent = {-1, -1};
  std::vector<std::vector<int>> waveMap(rowCount, std::vector<int>(colCount, -1)); // @step:initialize
  waveMap[start.first][start.second] = 0; // @step:initialize
  std::vector<std::vector<Cell>> parent(rowCount, std::vector<Cell>(colCount, noParent)); // @step:initialize

  // Phase 1: BFS wavefront expansion — label each reachable cell with its wave number
  std::queue<Cell> queue; // @step:initialize,open-node
  queue.push(start);
  std::vector<Cell> visited;

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  while (!queue.empty()) {
    auto [currentRow, currentCol] = queue.front(); // @step:close-node
    queue.pop();
    visited.push_back({currentRow, currentCol}); // @step:close-node
    int currentWave = waveMap[currentRow][currentCol]; // @step:close-node

    // Check if we reached the end — begin backtracking
    if (currentRow == end.first && currentCol == end.second) break; // @step:update-cost

    // Expand wavefront to 4-directional neighbors
    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = currentRow + deltaRows[dirIndex];
      int neighborCol = currentCol + deltaCols[dirIndex];
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) continue;
      if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
      if (waveMap[neighborRow][neighborCol] != -1) continue;
      // Stamp the neighbor with the next wave number
      waveMap[neighborRow][neighborCol] = currentWave + 1; // @step:update-cost
      parent[neighborRow][neighborCol] = {currentRow, currentCol};
      queue.push({neighborRow, neighborCol}); // @step:open-node
    }
  }

  if (waveMap[end.first][end.second] == -1) {
    return {{}, visited}; // @step:complete
  }

  // Phase 2: Backtrack from end using parent pointers
  auto path = reconstructPath(parent, end, noParent); // @step:trace-path
  return {path, visited}; // @step:trace-path
}
