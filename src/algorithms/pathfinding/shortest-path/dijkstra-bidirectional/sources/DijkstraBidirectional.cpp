// Dijkstra Bidirectional — two simultaneous Dijkstra searches meeting in the middle
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

struct BidirectionalResult {
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

std::vector<Cell> reconstructReversePath(const std::vector<std::vector<Cell>>& reverseParent,
                                          Cell meetingPoint, Cell noParent) {
  std::vector<Cell> path;
  auto current = meetingPoint;
  while (current != noParent) {
    path.push_back(current);
    current = reverseParent[current.first][current.second];
  }
  return path;
}

BidirectionalResult dijkstraBidirectional(const std::vector<std::vector<GridCell>>& grid,
                                            Cell start, Cell end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  Cell noParent = {-1, -1};

  // Forward search from start
  std::vector<std::vector<int>> forwardDistance(rowCount, std::vector<int>(colCount, INT_MAX)); // @step:initialize
  forwardDistance[start.first][start.second] = 0; // @step:initialize
  std::vector<std::vector<Cell>> forwardParent(rowCount, std::vector<Cell>(colCount, noParent)); // @step:initialize
  std::vector<std::vector<bool>> forwardVisited(rowCount, std::vector<bool>(colCount, false)); // @step:initialize

  // Reverse search from end
  std::vector<std::vector<int>> reverseDistance(rowCount, std::vector<int>(colCount, INT_MAX)); // @step:initialize
  reverseDistance[end.first][end.second] = 0; // @step:initialize
  std::vector<std::vector<Cell>> reverseParent(rowCount, std::vector<Cell>(colCount, noParent)); // @step:initialize
  std::vector<std::vector<bool>> reverseVisited(rowCount, std::vector<bool>(colCount, false)); // @step:initialize

  // (dist, row, col)
  std::vector<std::tuple<int, int, int>> forwardQueue = {{0, start.first, start.second}}; // @step:initialize,open-node
  std::vector<std::tuple<int, int, int>> reverseQueue = {{0, end.first, end.second}}; // @step:initialize,open-node

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};
  std::vector<Cell> allVisited;
  int bestCost = INT_MAX;
  Cell meetingPoint = noParent;

  while (!forwardQueue.empty() || !reverseQueue.empty()) {
    // Alternate between forward and reverse searches
    if (!forwardQueue.empty()) {
      std::sort(forwardQueue.begin(), forwardQueue.end()); // @step:close-node
      auto [currentDist, currentRow, currentCol] = forwardQueue.front(); // @step:close-node
      forwardQueue.erase(forwardQueue.begin());
      if (!forwardVisited[currentRow][currentCol]) {
        forwardVisited[currentRow][currentCol] = true; // @step:close-node
        allVisited.push_back({currentRow, currentCol}); // @step:close-node

        // Check if this cell has been visited by reverse search
        if (reverseVisited[currentRow][currentCol]) {
          int totalCost = forwardDistance[currentRow][currentCol] + reverseDistance[currentRow][currentCol];
          if (totalCost < bestCost) {
            bestCost = totalCost;
            meetingPoint = {currentRow, currentCol};
          }
        }

        for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
          int neighborRow = currentRow + deltaRows[dirIndex];
          int neighborCol = currentCol + deltaCols[dirIndex];
          if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) continue;
          if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
          if (forwardVisited[neighborRow][neighborCol]) continue;
          int newDist = forwardDistance[currentRow][currentCol] + 1;
          if (newDist < forwardDistance[neighborRow][neighborCol]) {
            forwardDistance[neighborRow][neighborCol] = newDist; // @step:open-node
            forwardParent[neighborRow][neighborCol] = {currentRow, currentCol};
            forwardQueue.push_back({newDist, neighborRow, neighborCol});
          }
        }
      }
    }

    if (!reverseQueue.empty()) {
      std::sort(reverseQueue.begin(), reverseQueue.end()); // @step:close-node
      auto [currentDist, currentRow, currentCol] = reverseQueue.front(); // @step:close-node
      reverseQueue.erase(reverseQueue.begin());
      if (!reverseVisited[currentRow][currentCol]) {
        reverseVisited[currentRow][currentCol] = true; // @step:close-node
        allVisited.push_back({currentRow, currentCol}); // @step:close-node

        // Check if this cell has been visited by forward search
        if (forwardVisited[currentRow][currentCol]) {
          int totalCost = forwardDistance[currentRow][currentCol] + reverseDistance[currentRow][currentCol];
          if (totalCost < bestCost) {
            bestCost = totalCost;
            meetingPoint = {currentRow, currentCol};
          }
        }

        for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
          int neighborRow = currentRow + deltaRows[dirIndex];
          int neighborCol = currentCol + deltaCols[dirIndex];
          if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) continue;
          if (grid[neighborRow][neighborCol].cellType == CellType::Wall) continue;
          if (reverseVisited[neighborRow][neighborCol]) continue;
          int newDist = reverseDistance[currentRow][currentCol] + 1;
          if (newDist < reverseDistance[neighborRow][neighborCol]) {
            reverseDistance[neighborRow][neighborCol] = newDist; // @step:open-node
            reverseParent[neighborRow][neighborCol] = {currentRow, currentCol};
            reverseQueue.push_back({newDist, neighborRow, neighborCol});
          }
        }
      }
    }

    // Early termination when meeting point is found and queues can't improve it
    if (meetingPoint != noParent) {
      int forwardMin = forwardQueue.empty() ? INT_MAX : std::get<0>(forwardQueue.front());
      int reverseMin = reverseQueue.empty() ? INT_MAX : std::get<0>(reverseQueue.front());
      if (forwardMin + reverseMin >= bestCost) break;
    }
  }

  if (meetingPoint == noParent) {
    return {{}, allVisited}; // @step:complete
  }

  // Reconstruct path: forward half + reverse half
  auto forwardPath = reconstructPath(forwardParent, meetingPoint, noParent); // @step:trace-path
  auto reversePath = reconstructReversePath(reverseParent, meetingPoint, noParent); // @step:trace-path
  auto path = forwardPath;
  for (size_t pathIndex = 1; pathIndex < reversePath.size(); pathIndex++) {
    path.push_back(reversePath[pathIndex]);
  } // @step:trace-path
  return {path, allVisited}; // @step:trace-path
}
