// IDA* — Iterative Deepening A*: DFS with f-cost threshold that increases each iteration
#include <climits>
#include <string>
#include <variant>
#include <vector>

enum class CellType { Empty, Wall, Start, End };

struct GridCell {
  int row;
  int col;
  CellType cellType;
  std::string state;
};

struct IDAStarResult {
  std::vector<std::pair<int, int>> path;
  std::vector<std::pair<int, int>> visited;
  int iterationCount;
};

using Cell = std::pair<int, int>;

int heuristic(int rowA, int colA, int rowB, int colB) {
  return std::abs(rowA - rowB) + std::abs(colA - colB);
}

// Returns "FOUND" string or the minimum exceeded threshold (as string of an int)
// Using int: -1 means FOUND, anything >= 0 is the exceeded threshold, INT_MAX means no path
int searchIDA(const std::vector<std::vector<GridCell>>& grid, std::vector<Cell>& currentPath,
              std::vector<std::vector<bool>>& onPath, int gCost, int threshold, Cell end,
              std::vector<Cell>& visited, int rowCount, int colCount) {
  auto head = currentPath.back();
  int fCost = gCost + heuristic(head.first, head.second, end.first, end.second); // @step:open-node

  if (fCost > threshold) return fCost; // @step:open-node

  visited.push_back(head); // @step:close-node

  if (head == end) return -1; // FOUND // @step:trace-path

  int minimumExceeded = INT_MAX;
  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
    Cell neighbor = {head.first + deltaRows[dirIndex], head.second + deltaCols[dirIndex]};
    if (neighbor.first < 0 || neighbor.first >= rowCount || neighbor.second < 0 || neighbor.second >= colCount) continue;
    if (grid[neighbor.first][neighbor.second].cellType == CellType::Wall) continue;
    if (onPath[neighbor.first][neighbor.second]) continue; // @step:open-node

    currentPath.push_back(neighbor); // @step:open-node
    onPath[neighbor.first][neighbor.second] = true; // @step:open-node

    int subResult = searchIDA(grid, currentPath, onPath, gCost + 1, threshold, end, visited, rowCount, colCount);

    if (subResult == -1) return -1; // FOUND
    if (subResult < minimumExceeded) minimumExceeded = subResult;

    currentPath.pop_back(); // @step:close-node
    onPath[neighbor.first][neighbor.second] = false; // @step:close-node
  }

  return minimumExceeded;
}

IDAStarResult idaStar(const std::vector<std::vector<GridCell>>& grid, Cell start, Cell end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  std::vector<Cell> visited; // @step:initialize
  int threshold = heuristic(start.first, start.second, end.first, end.second); // @step:initialize
  std::vector<Cell> currentPath = {start}; // @step:initialize
  std::vector<std::vector<bool>> onPath(rowCount, std::vector<bool>(colCount, false)); // @step:initialize
  onPath[start.first][start.second] = true; // @step:initialize
  int iterationCount = 0; // @step:initialize

  while (true) {
    iterationCount++; // @step:close-node
    int result = searchIDA(grid, currentPath, onPath, 0, threshold, end, visited, rowCount, colCount); // @step:close-node

    if (result == -1) {
      // @step:trace-path
      return {currentPath, visited, iterationCount}; // @step:trace-path
    }

    if (result == INT_MAX) {
      return {{}, visited, iterationCount}; // @step:complete
    }

    threshold = result; // @step:initialize
  }
}
