// Weighted A* — A* with inflated heuristic: f(n) = g(n) + weight * h(n). Trades optimality for speed.
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

struct WeightedAStarResult {
  std::vector<std::pair<int, int>> path;
  std::vector<std::pair<int, int>> visited;
  double weight;
};

using Cell = std::pair<int, int>;

int heuristic(int rowA, int colA, int rowB, int colB) {
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

WeightedAStarResult weightedAStar(const std::vector<std::vector<GridCell>>& grid,
                                   Cell start, Cell end, double weight = 1.5) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  Cell noParent = {-1, -1};
  std::vector<std::vector<Cell>> parent(rowCount, std::vector<Cell>(colCount, noParent)); // @step:initialize
  std::vector<std::vector<double>> gCost(rowCount, std::vector<double>(colCount, 1e18)); // @step:initialize
  std::vector<Cell> visited; // @step:initialize

  gCost[start.first][start.second] = 0; // @step:initialize
  int startH = heuristic(start.first, start.second, end.first, end.second);
  double startF = 0 + weight * startH;
  // Open list: (fCost, gCost, row, col)
  std::vector<std::tuple<double,double,int,int>> openList = {{startF, 0.0, start.first, start.second}}; // @step:initialize,open-node
  std::vector<std::vector<bool>> inOpenSet(rowCount, std::vector<bool>(colCount, false)); // @step:initialize,open-node
  inOpenSet[start.first][start.second] = true; // @step:open-node

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  while (!openList.empty()) {
    std::sort(openList.begin(), openList.end());
    auto [fVal, currentG, currentRow, currentCol] = openList.front(); // @step:close-node
    openList.erase(openList.begin());

    visited.push_back({currentRow, currentCol}); // @step:close-node
    inOpenSet[currentRow][currentCol] = false; // @step:close-node

    if (currentRow == end.first && currentCol == end.second) {
      // @step:trace-path
      return {reconstructPath(parent, end, noParent), visited, weight}; // @step:trace-path
    }

    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = currentRow + deltaRows[dirIndex];
      int neighborCol = currentCol + deltaCols[dirIndex];
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) continue;
      if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;

      double neighborG = currentG + 1;
      if (neighborG < gCost[neighborRow][neighborCol]) {
        gCost[neighborRow][neighborCol] = neighborG; // @step:open-node
        parent[neighborRow][neighborCol] = {currentRow, currentCol}; // @step:open-node
        int neighborH = heuristic(neighborRow, neighborCol, end.first, end.second);
        // Weighted heuristic: inflating h by weight encourages greedy behavior
        double neighborF = neighborG + weight * neighborH; // @step:open-node
        inOpenSet[neighborRow][neighborCol] = true;
        openList.push_back({neighborF, neighborG, neighborRow, neighborCol}); // @step:open-node
      }
    }
  }

  return {{}, visited, weight}; // @step:complete
}
