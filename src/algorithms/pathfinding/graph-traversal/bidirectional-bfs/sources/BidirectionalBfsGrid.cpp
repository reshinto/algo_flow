// Bidirectional BFS — BFS from start and end simultaneously, meeting in the middle
#include <queue>
#include <string>
#include <utility>
#include <vector>

enum class CellType { Empty, Wall, Start, End };

struct GridCell {
  int row;
  int col;
  CellType cellType;
  std::string state;
};

struct BidirectionalBfsResult {
  std::vector<std::pair<int, int>> path;
  std::vector<std::pair<int, int>> visited;
};

using Cell = std::pair<int, int>;
using ParentMap = std::vector<std::vector<Cell>>;

std::vector<Cell> buildPath(const std::vector<std::vector<Cell>>& forwardParent,
                             const std::vector<std::vector<Cell>>& backwardParent,
                             Cell meetingPoint, int rowCount, int colCount) {
  Cell noParent = {-1, -1};
  std::vector<Cell> forwardPath;
  Cell current = meetingPoint;
  while (current != noParent) {
    forwardPath.insert(forwardPath.begin(), current);
    current = forwardParent[current.first][current.second];
  }
  std::vector<Cell> backwardPath;
  current = backwardParent[meetingPoint.first][meetingPoint.second];
  while (current != noParent) {
    backwardPath.push_back(current);
    current = backwardParent[current.first][current.second];
  }
  for (const auto& cell : backwardPath) forwardPath.push_back(cell);
  return forwardPath;
}

BidirectionalBfsResult bidirectionalBfsGrid(const std::vector<std::vector<GridCell>>& grid,
                                              Cell start, Cell end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize

  if (start == end) {
    return {{start}, {start}}; // @step:complete
  }

  Cell noParent = {-1, -1};
  // Separate parent maps for forward and backward searches
  std::vector<std::vector<Cell>> forwardParent(rowCount, std::vector<Cell>(colCount, noParent)); // @step:initialize
  std::vector<std::vector<Cell>> backwardParent(rowCount, std::vector<Cell>(colCount, noParent)); // @step:initialize
  std::vector<std::vector<bool>> forwardVisited(rowCount, std::vector<bool>(colCount, false)); // @step:initialize
  std::vector<std::vector<bool>> backwardVisited(rowCount, std::vector<bool>(colCount, false)); // @step:initialize

  std::queue<Cell> forwardQueue; // @step:initialize,open-node
  std::queue<Cell> backwardQueue; // @step:initialize,open-node
  forwardQueue.push(start); // @step:initialize,open-node
  backwardQueue.push(end); // @step:initialize,open-node
  forwardVisited[start.first][start.second] = true; // @step:open-node
  backwardVisited[end.first][end.second] = true; // @step:open-node

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};
  std::vector<Cell> allVisited;

  while (!forwardQueue.empty() || !backwardQueue.empty()) {
    // Expand forward frontier one step
    if (!forwardQueue.empty()) {
      auto current = forwardQueue.front(); // @step:close-node
      forwardQueue.pop();
      int currentRow = current.first; // @step:close-node
      int currentCol = current.second; // @step:close-node
      allVisited.push_back({currentRow, currentCol}); // @step:close-node

      for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
        int neighborRow = currentRow + deltaRows[dirIndex];
        int neighborCol = currentCol + deltaCols[dirIndex];
        if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) continue;
        if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
        if (forwardVisited[neighborRow][neighborCol]) continue;
        forwardVisited[neighborRow][neighborCol] = true; // @step:open-node
        forwardParent[neighborRow][neighborCol] = {currentRow, currentCol}; // @step:open-node
        forwardQueue.push({neighborRow, neighborCol}); // @step:open-node

        // Meeting point detected
        if (backwardVisited[neighborRow][neighborCol]) {
          auto path = buildPath(forwardParent, backwardParent, {neighborRow, neighborCol}, rowCount, colCount);
          return {path, allVisited}; // @step:trace-path
        }
      }
    }

    // Expand backward frontier one step
    if (!backwardQueue.empty()) {
      auto current = backwardQueue.front(); // @step:close-node
      backwardQueue.pop();
      int currentRow = current.first; // @step:close-node
      int currentCol = current.second; // @step:close-node
      allVisited.push_back({currentRow, currentCol}); // @step:close-node

      for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
        int neighborRow = currentRow + deltaRows[dirIndex];
        int neighborCol = currentCol + deltaCols[dirIndex];
        if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) continue;
        if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
        if (backwardVisited[neighborRow][neighborCol]) continue;
        backwardVisited[neighborRow][neighborCol] = true; // @step:open-node
        backwardParent[neighborRow][neighborCol] = {currentRow, currentCol}; // @step:open-node
        backwardQueue.push({neighborRow, neighborCol}); // @step:open-node

        // Meeting point detected
        if (forwardVisited[neighborRow][neighborCol]) {
          auto path = buildPath(forwardParent, backwardParent, {neighborRow, neighborCol}, rowCount, colCount);
          return {path, allVisited}; // @step:trace-path
        }
      }
    }
  }

  return {{}, allVisited}; // @step:complete
}
