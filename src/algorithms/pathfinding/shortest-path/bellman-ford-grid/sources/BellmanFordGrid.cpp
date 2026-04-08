// Bellman-Ford Grid — shortest path via V-1 edge relaxation iterations
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

struct BellmanFordResult {
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

BellmanFordResult bellmanFordGrid(const std::vector<std::vector<GridCell>>& grid, Cell start, Cell end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  int vertexCount = rowCount * colCount; // @step:initialize
  Cell noParent = {-1, -1};
  std::vector<std::vector<int>> distance(rowCount, std::vector<int>(colCount, INT_MAX)); // @step:initialize
  distance[start.first][start.second] = 0; // @step:initialize
  std::vector<std::vector<Cell>> parent(rowCount, std::vector<Cell>(colCount, noParent)); // @step:initialize

  // Collect all passable edges: (fromRow, fromCol, toRow, toCol)
  std::vector<std::tuple<int, int, int, int>> edges; // @step:initialize
  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};
  for (int rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (int colIndex = 0; colIndex < colCount; colIndex++) {
      if (grid[rowIndex][colIndex].cellType == CellType::Wall) continue;
      for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
        int neighborRow = rowIndex + deltaRows[dirIndex];
        int neighborCol = colIndex + deltaCols[dirIndex];
        if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) continue;
        if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
        edges.push_back({rowIndex, colIndex, neighborRow, neighborCol});
      }
    }
  }

  // Relax all edges V-1 times
  for (int iteration = 0; iteration < vertexCount - 1; iteration++) {
    bool updated = false;
    for (const auto& [fromRow, fromCol, toRow, toCol] : edges) {
      if (distance[fromRow][fromCol] == INT_MAX) continue;
      int newDistance = distance[fromRow][fromCol] + 1; // @step:update-cost
      if (newDistance < distance[toRow][toCol]) {
        // @step:update-cost
        distance[toRow][toCol] = newDistance; // @step:update-cost
        parent[toRow][toCol] = {fromRow, fromCol};
        updated = true;
      }
    }
    if (!updated) break; // Early termination if no updates
  }

  // Collect visited cells (all cells that were reached with finite distance)
  std::vector<Cell> visited; // @step:close-node
  for (int rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (int colIndex = 0; colIndex < colCount; colIndex++) {
      if (distance[rowIndex][colIndex] < INT_MAX) {
        visited.push_back({rowIndex, colIndex}); // @step:close-node
      }
    }
  }

  if (distance[end.first][end.second] == INT_MAX) {
    return {{}, visited}; // @step:complete
  }

  auto path = reconstructPath(parent, end, noParent); // @step:trace-path
  return {path, visited}; // @step:trace-path
}
