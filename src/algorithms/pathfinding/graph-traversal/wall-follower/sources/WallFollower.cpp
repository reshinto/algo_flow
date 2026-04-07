// Wall Follower — right-hand rule maze solving: always keep the right wall, follow it to the exit
#include <string>
#include <vector>

enum class CellType { Empty, Wall, Start, End };

struct GridCell {
  int row;
  int col;
  CellType cellType;
  std::string state;
};

struct WallFollowerResult {
  std::vector<std::pair<int, int>> path;
  std::vector<std::pair<int, int>> visited;
};

// Direction indices: 0=up, 1=right, 2=down, 3=left
const int DIRECTION_ROW[] = {-1, 0, 1, 0};
const int DIRECTION_COL[] = {0, 1, 0, -1};

bool canMove(const std::vector<std::vector<GridCell>>& grid, int row, int col,
             int direction, int rowCount, int colCount) {
  int nextRow = row + DIRECTION_ROW[direction];
  int nextCol = col + DIRECTION_COL[direction];
  if (nextRow < 0 || nextRow >= rowCount || nextCol < 0 || nextCol >= colCount) return false;
  return grid[nextRow][nextCol].cellType != CellType::Wall;
}

WallFollowerResult wallFollower(const std::vector<std::vector<GridCell>>& grid,
                                 std::pair<int, int> start, std::pair<int, int> end) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  std::vector<std::pair<int, int>> path; // @step:initialize
  std::vector<std::pair<int, int>> visited; // @step:initialize

  int currentRow = start.first; // @step:initialize
  int currentCol = start.second; // @step:initialize
  // Start facing right (direction index 1)
  int facingDirection = 1; // @step:initialize
  int maxSteps = rowCount * colCount * 4; // @step:initialize

  for (int stepCount = 0; stepCount < maxSteps; stepCount++) {
    // @step:open-node
    path.push_back({currentRow, currentCol}); // @step:close-node
    visited.push_back({currentRow, currentCol}); // @step:close-node

    // Check if we reached the end
    if (currentRow == end.first && currentCol == end.second) {
      return {path, visited}; // @step:trace-path
    }

    // Right-hand rule: try to turn right first, then forward, then left, then back
    int rightDirection = (facingDirection + 1) % 4;
    int leftDirection = (facingDirection + 3) % 4;

    if (canMove(grid, currentRow, currentCol, rightDirection, rowCount, colCount)) {
      // Turn right and move
      facingDirection = rightDirection; // @step:open-node
      currentRow += DIRECTION_ROW[facingDirection]; // @step:open-node
      currentCol += DIRECTION_COL[facingDirection]; // @step:open-node
    } else if (canMove(grid, currentRow, currentCol, facingDirection, rowCount, colCount)) {
      // Move forward
      currentRow += DIRECTION_ROW[facingDirection]; // @step:open-node
      currentCol += DIRECTION_COL[facingDirection]; // @step:open-node
    } else if (canMove(grid, currentRow, currentCol, leftDirection, rowCount, colCount)) {
      // Turn left and move
      facingDirection = leftDirection; // @step:open-node
      currentRow += DIRECTION_ROW[facingDirection]; // @step:open-node
      currentCol += DIRECTION_COL[facingDirection]; // @step:open-node
    } else {
      // Turn back (180 degrees)
      facingDirection = (facingDirection + 2) % 4; // @step:open-node
      currentRow += DIRECTION_ROW[facingDirection]; // @step:open-node
      currentCol += DIRECTION_COL[facingDirection]; // @step:open-node
    }
  }

  return {{}, visited}; // @step:complete
}
