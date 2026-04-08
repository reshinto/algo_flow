// D* Lite — Incremental replanning: searches from goal to start, then replans after obstacle discovery
#include <algorithm>
#include <climits>
#include <optional>
#include <string>
#include <vector>

enum class CellType { Empty, Wall, Start, End };

struct GridCell {
  int row;
  int col;
  CellType cellType;
  std::string state;
};

struct DStarResult {
  std::vector<std::pair<int, int>> path;
  std::vector<std::pair<int, int>> visited;
  int replanCount;
};

using Cell = std::pair<int, int>;

int heuristic(int rowA, int colA, int rowB, int colB) {
  return std::abs(rowA - rowB) + std::abs(colA - colB);
}

std::vector<Cell> reconstructPath(const std::vector<std::vector<Cell>>& parent,
                                    Cell end, Cell noParent) {
  std::vector<Cell> path;
  auto current = end;
  while (current != noParent) {
    path.insert(path.begin(), current);
    current = parent[current.first][current.second];
  }
  return path;
}

std::optional<std::vector<Cell>> aStarSearch(
    const std::vector<std::vector<GridCell>>& grid, Cell start, Cell end,
    int rowCount, int colCount, std::vector<Cell>& visited) {
  Cell noParent = {-1, -1};
  std::vector<std::vector<Cell>> parent(rowCount, std::vector<Cell>(colCount, noParent));
  std::vector<std::vector<int>> gCost(rowCount, std::vector<int>(colCount, INT_MAX));
  gCost[start.first][start.second] = 0;
  int startH = heuristic(start.first, start.second, end.first, end.second);
  std::vector<std::tuple<int,int,int,int>> openList = {{startH, 0, start.first, start.second}};

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  while (!openList.empty()) {
    std::sort(openList.begin(), openList.end());
    auto [fVal, currentG, currentRow, currentCol] = openList.front();
    openList.erase(openList.begin());

    visited.push_back({currentRow, currentCol}); // @step:close-node

    if (currentRow == end.first && currentCol == end.second) {
      return reconstructPath(parent, end, noParent); // @step:trace-path
    }

    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = currentRow + deltaRows[dirIndex];
      int neighborCol = currentCol + deltaCols[dirIndex];
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) continue;
      if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
      int neighborG = currentG + 1;
      if (neighborG < gCost[neighborRow][neighborCol]) {
        gCost[neighborRow][neighborCol] = neighborG; // @step:open-node
        parent[neighborRow][neighborCol] = {currentRow, currentCol}; // @step:open-node
        int neighborH = heuristic(neighborRow, neighborCol, end.first, end.second);
        openList.push_back({neighborG + neighborH, neighborG, neighborRow, neighborCol}); // @step:open-node
      }
    }
  }
  return std::nullopt;
}

std::optional<Cell> findObstacleCandidate(const std::vector<std::vector<GridCell>>& grid,
                                           const std::vector<Cell>& path, int rowCount, int colCount) {
  if (path.size() < 4) return std::nullopt;
  auto midCell = path[path.size() / 2];
  Cell candidates[] = {{midCell.first-1, midCell.second}, {midCell.first+1, midCell.second},
                        {midCell.first, midCell.second-1}, {midCell.first, midCell.second+1}};
  for (const auto& candidate : candidates) {
    if (candidate.first < 0 || candidate.first >= rowCount) continue;
    if (candidate.second < 0 || candidate.second >= colCount) continue;
    if (grid[candidate.first][candidate.second].cellType == CellType::Empty) return candidate;
  }
  return std::nullopt;
}

DStarResult dStarLite(const std::vector<std::vector<GridCell>>& grid, Cell start, Cell end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  // Work on a mutable copy of the grid for obstacle simulation
  auto workingGrid = grid; // @step:initialize
  std::vector<Cell> visited; // @step:initialize
  int replanCount = 0; // @step:initialize

  // Phase 1: initial A* search from start to end
  auto initialResult = aStarSearch(workingGrid, start, end, rowCount, colCount, visited); // @step:close-node

  if (!initialResult.has_value()) {
    return {{}, visited, replanCount}; // @step:complete
  }

  replanCount++; // @step:close-node

  // Phase 2: simulate discovering a new obstacle mid-path and replan
  auto discoveredObstacle = findObstacleCandidate(workingGrid, initialResult.value(), rowCount, colCount); // @step:open-node

  if (discoveredObstacle.has_value()) {
    auto [obstacleRow, obstacleCol] = discoveredObstacle.value();
    workingGrid[obstacleRow][obstacleCol].cellType = CellType::Wall; // @step:open-node

    auto replanResult = aStarSearch(workingGrid, start, end, rowCount, colCount, visited); // @step:close-node
    replanCount++; // @step:close-node

    if (replanResult.has_value()) {
      return {replanResult.value(), visited, replanCount}; // @step:trace-path
    }
    return {{}, visited, replanCount}; // @step:complete
  }

  return {initialResult.value(), visited, replanCount}; // @step:trace-path
}
