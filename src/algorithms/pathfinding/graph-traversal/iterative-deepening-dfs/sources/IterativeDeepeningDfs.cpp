// Iterative Deepening DFS — DFS with increasing depth limits, combining BFS optimality with DFS memory efficiency
#include <optional>
#include <set>
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

struct IddfsResult {
  std::vector<std::pair<int, int>> path;
  std::vector<std::pair<int, int>> visited;
  int depthReached;
};

using Cell = std::pair<int, int>;

std::optional<std::vector<Cell>> depthLimitedSearch(
    const std::vector<std::vector<GridCell>>& grid, Cell current, Cell end,
    int depthRemaining, std::set<Cell>& pathSet,
    std::vector<Cell>& allVisited, int rowCount, int colCount) {

  allVisited.push_back(current);

  if (current == end) return std::vector<Cell>{current};
  if (depthRemaining == 0) return std::nullopt;

  pathSet.insert(current);
  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
    Cell neighbor = {current.first + deltaRows[dirIndex], current.second + deltaCols[dirIndex]};
    if (neighbor.first < 0 || neighbor.first >= rowCount || neighbor.second < 0 || neighbor.second >= colCount)
      continue;
    if (grid[neighbor.first][neighbor.second].cellType == CellType::Wall) continue;
    if (pathSet.count(neighbor)) continue;

    auto subResult = depthLimitedSearch(grid, neighbor, end, depthRemaining - 1,
                                         pathSet, allVisited, rowCount, colCount);
    if (subResult.has_value()) {
      subResult->insert(subResult->begin(), current);
      pathSet.erase(current);
      return subResult;
    }
  }

  pathSet.erase(current);
  return std::nullopt;
}

IddfsResult iterativeDeepeningDfs(const std::vector<std::vector<GridCell>>& grid,
                                    Cell start, Cell end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  std::vector<Cell> allVisited; // @step:initialize

  // Increase depth limit one step at a time until target is reached
  for (int depthLimit = 0; depthLimit <= rowCount * colCount; depthLimit++) {
    // @step:initialize
    std::set<Cell> pathSet; // @step:open-node
    auto result = depthLimitedSearch(grid, start, end, depthLimit, pathSet,
                                      allVisited, rowCount, colCount); // @step:close-node

    if (result.has_value()) {
      return {result.value(), allVisited, depthLimit}; // @step:trace-path
    }
  }

  return {{}, allVisited, 0}; // @step:complete
}
