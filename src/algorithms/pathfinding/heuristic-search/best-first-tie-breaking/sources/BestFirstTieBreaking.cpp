// Best-First Tie Breaking — A* with cross-product tie-breaking for aesthetically straight paths
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

struct TieBreakingResult {
  std::vector<std::pair<int, int>> path;
  std::vector<std::pair<int, int>> visited;
};

int heuristic(int rowA, int colA, int rowB, int colB) {
  return std::abs(rowA - rowB) + std::abs(colA - colB);
}

int crossProduct(int startRow, int startCol, int nodeRow, int nodeCol, int endRow, int endCol) {
  int deltaRow1 = nodeRow - startRow;
  int deltaCol1 = nodeCol - startCol;
  int deltaRow2 = endRow - startRow;
  int deltaCol2 = endCol - startCol;
  return std::abs(deltaRow1 * deltaCol2 - deltaRow2 * deltaCol1);
}

std::vector<std::pair<int, int>> reconstructPath(
    const std::vector<std::vector<std::pair<int, int>>>& parent,
    std::pair<int, int> end) {
  std::pair<int, int> noParent = {-1, -1};
  std::vector<std::pair<int, int>> path;
  auto current = end;
  while (current != noParent) {
    path.insert(path.begin(), current);
    current = parent[current.first][current.second];
  }
  return path;
}

TieBreakingResult bestFirstTieBreaking(const std::vector<std::vector<GridCell>>& grid,
                                        std::pair<int, int> start, std::pair<int, int> end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  std::pair<int, int> noParent = {-1, -1};
  std::vector<std::vector<std::pair<int, int>>> parent(rowCount, std::vector<std::pair<int, int>>(colCount, noParent)); // @step:initialize
  std::vector<std::vector<int>> gCost(rowCount, std::vector<int>(colCount, INT_MAX)); // @step:initialize
  std::vector<std::pair<int, int>> visited; // @step:initialize

  gCost[start.first][start.second] = 0; // @step:initialize
  int startH = heuristic(start.first, start.second, end.first, end.second);
  int startTie = crossProduct(start.first, start.second, start.first, start.second, end.first, end.second);
  // Open list: (fCost, hCost, tieBreaker, gCost, row, col)
  std::vector<std::tuple<int,int,int,int,int,int>> openList = {{startH, startH, startTie, 0, start.first, start.second}}; // @step:initialize,open-node
  std::vector<std::vector<bool>> inOpenSet(rowCount, std::vector<bool>(colCount, false)); // @step:initialize,open-node
  inOpenSet[start.first][start.second] = true; // @step:open-node

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  while (!openList.empty()) {
    // Sort by: fCost, then hCost, then cross-product tie breaker
    std::sort(openList.begin(), openList.end(), [](const auto& first, const auto& second) {
      if (std::get<0>(first) != std::get<0>(second)) return std::get<0>(first) < std::get<0>(second);
      if (std::get<1>(first) != std::get<1>(second)) return std::get<1>(first) < std::get<1>(second);
      return std::get<2>(first) < std::get<2>(second);
    });

    auto current = openList.front(); // @step:close-node
    openList.erase(openList.begin());
    int currentRow = std::get<4>(current); // @step:close-node
    int currentCol = std::get<5>(current); // @step:close-node
    int currentG = std::get<3>(current); // @step:close-node

    visited.push_back({currentRow, currentCol}); // @step:close-node
    inOpenSet[currentRow][currentCol] = false; // @step:close-node

    if (currentRow == end.first && currentCol == end.second) {
      // @step:trace-path
      return {reconstructPath(parent, end), visited}; // @step:trace-path
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
        int neighborF = neighborG + neighborH;
        // Cross-product tie-breaking: prefer nodes on the straight line from start to end
        int tieBreaker = crossProduct(start.first, start.second, neighborRow, neighborCol, end.first, end.second); // @step:open-node
        inOpenSet[neighborRow][neighborCol] = true;
        openList.push_back({neighborF, neighborH, tieBreaker, neighborG, neighborRow, neighborCol}); // @step:open-node
      }
    }
  }

  return {{}, visited}; // @step:complete
}
