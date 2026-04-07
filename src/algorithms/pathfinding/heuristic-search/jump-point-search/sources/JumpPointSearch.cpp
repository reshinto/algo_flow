// Jump Point Search — A* optimization that "jumps" over intermediate nodes in uniform-cost grids
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

struct JpsResult {
  std::vector<std::pair<int, int>> path;
  std::vector<std::pair<int, int>> visited;
  std::vector<std::pair<int, int>> jumpPoints;
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

bool hasForced(const std::vector<std::vector<GridCell>>& grid, int row, int col,
               int deltaRow, int deltaCol, int rowCount, int colCount) {
  if (deltaRow != 0 && deltaCol == 0) {
    int prevRow = row - deltaRow;
    bool leftBlocked = col-1>=0 && prevRow>=0 && prevRow<rowCount && grid[prevRow][col-1].cellType==CellType::Wall;
    bool rightBlocked = col+1<colCount && prevRow>=0 && prevRow<rowCount && grid[prevRow][col+1].cellType==CellType::Wall;
    bool leftOpen = col-1>=0 && grid[row][col-1].cellType!=CellType::Wall;
    bool rightOpen = col+1<colCount && grid[row][col+1].cellType!=CellType::Wall;
    return (leftBlocked && leftOpen) || (rightBlocked && rightOpen);
  }
  if (deltaCol != 0 && deltaRow == 0) {
    int prevCol = col - deltaCol;
    bool upBlocked = row-1>=0 && prevCol>=0 && prevCol<colCount && grid[row-1][prevCol].cellType==CellType::Wall;
    bool downBlocked = row+1<rowCount && prevCol>=0 && prevCol<colCount && grid[row+1][prevCol].cellType==CellType::Wall;
    bool upOpen = row-1>=0 && grid[row-1][col].cellType!=CellType::Wall;
    bool downOpen = row+1<rowCount && grid[row+1][col].cellType!=CellType::Wall;
    return (upBlocked && upOpen) || (downBlocked && downOpen);
  }
  return false;
}

std::optional<Cell> jump(const std::vector<std::vector<GridCell>>& grid,
                          int row, int col, int deltaRow, int deltaCol,
                          Cell end, int rowCount, int colCount) {
  int currentRow = row + deltaRow;
  int currentCol = col + deltaCol;

  while (true) {
    if (currentRow < 0 || currentRow >= rowCount || currentCol < 0 || currentCol >= colCount) return std::nullopt;
    if (grid[currentRow][currentCol].cellType == CellType::Wall) return std::nullopt;
    if (currentRow == end.first && currentCol == end.second) return Cell{currentRow, currentCol};
    if (hasForced(grid, currentRow, currentCol, deltaRow, deltaCol, rowCount, colCount))
      return Cell{currentRow, currentCol};
    if (deltaRow != 0 && currentRow == end.first) return Cell{currentRow, currentCol};
    if (deltaCol != 0 && currentCol == end.second) return Cell{currentRow, currentCol};
    currentRow += deltaRow;
    currentCol += deltaCol;
  }
}

JpsResult jumpPointSearch(const std::vector<std::vector<GridCell>>& grid, Cell start, Cell end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  Cell noParent = {-1, -1};
  std::vector<std::vector<Cell>> parent(rowCount, std::vector<Cell>(colCount, noParent)); // @step:initialize
  std::vector<std::vector<int>> gCost(rowCount, std::vector<int>(colCount, INT_MAX)); // @step:initialize
  std::vector<Cell> visited; // @step:initialize
  std::vector<Cell> jumpPoints; // @step:initialize

  gCost[start.first][start.second] = 0; // @step:initialize
  int startH = heuristic(start.first, start.second, end.first, end.second);
  std::vector<std::tuple<int,int,int,int>> openList = {{startH, 0, start.first, start.second}}; // @step:initialize,open-node
  std::vector<std::vector<bool>> inOpenSet(rowCount, std::vector<bool>(colCount, false)); // @step:initialize,open-node
  inOpenSet[start.first][start.second] = true; // @step:open-node

  const int deltaRows[] = {-1, 1, 0, 0};
  const int deltaCols[] = {0, 0, -1, 1};

  while (!openList.empty()) {
    std::sort(openList.begin(), openList.end());
    auto [fVal, currentG, currentRow, currentCol] = openList.front(); // @step:close-node
    openList.erase(openList.begin());

    visited.push_back({currentRow, currentCol}); // @step:close-node

    if (currentRow == end.first && currentCol == end.second) {
      // @step:trace-path
      return {reconstructPath(parent, end, noParent), visited, jumpPoints}; // @step:trace-path
    }

    // Try jumping in each cardinal direction from the current node
    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      auto jumpTarget = jump(grid, currentRow, currentCol, deltaRows[dirIndex], deltaCols[dirIndex], end, rowCount, colCount);
      if (!jumpTarget.has_value()) continue;

      auto [jumpRow, jumpCol] = jumpTarget.value();

      // Mark intermediate nodes along the jump as jump points
      int scanRow = currentRow + deltaRows[dirIndex];
      int scanCol = currentCol + deltaCols[dirIndex];
      while (scanRow != jumpRow || scanCol != jumpCol) {
        if (hasForced(grid, scanRow, scanCol, deltaRows[dirIndex], deltaCols[dirIndex], rowCount, colCount)) {
          jumpPoints.push_back({scanRow, scanCol}); // @step:visit
        }
        scanRow += deltaRows[dirIndex];
        scanCol += deltaCols[dirIndex];
      }

      int neighborG = currentG + heuristic(currentRow, currentCol, jumpRow, jumpCol);
      if (neighborG < gCost[jumpRow][jumpCol]) {
        gCost[jumpRow][jumpCol] = neighborG; // @step:open-node
        parent[jumpRow][jumpCol] = {currentRow, currentCol}; // @step:open-node
        int jumpH = heuristic(jumpRow, jumpCol, end.first, end.second);
        int jumpF = neighborG + jumpH;
        inOpenSet[jumpRow][jumpCol] = true;
        openList.push_back({jumpF, neighborG, jumpRow, jumpCol}); // @step:open-node
      }
    }
  }

  return {{}, visited, jumpPoints}; // @step:complete
}
