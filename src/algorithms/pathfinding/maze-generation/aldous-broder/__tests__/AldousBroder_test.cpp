#include "../sources/AldousBroder.cpp"
#include <cassert>
#include <iostream>
#include <queue>

std::vector<std::vector<GridCell>> makeAllWallsGrid(int rows, int cols) {
  std::vector<std::vector<GridCell>> grid(rows, std::vector<GridCell>(cols));
  for (int row = 0; row < rows; row++)
    for (int col = 0; col < cols; col++)
      grid[row][col] = {row, col, CellType::Wall, "default"};
  return grid;
}

bool bfsReachable(const std::vector<std::vector<GridCell>>& grid, int startRow, int startCol, int endRow, int endCol) {
  int rows = (int)grid.size(), cols = (int)grid[0].size();
  std::vector<std::vector<bool>> visited(rows, std::vector<bool>(cols, false));
  std::queue<std::pair<int,int>> bfsQueue;
  bfsQueue.push({startRow, startCol});
  visited[startRow][startCol] = true;
  int deltaRows[] = {-1, 1, 0, 0}, deltaCols[] = {0, 0, -1, 1};
  while (!bfsQueue.empty()) {
    auto [row, col] = bfsQueue.front(); bfsQueue.pop();
    if (row == endRow && col == endCol) return true;
    for (int dir = 0; dir < 4; dir++) {
      int nextRow = row + deltaRows[dir], nextCol = col + deltaCols[dir];
      if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols
          && !visited[nextRow][nextCol] && grid[nextRow][nextCol].cellType != CellType::Wall) {
        visited[nextRow][nextCol] = true;
        bfsQueue.push({nextRow, nextCol});
      }
    }
  }
  return false;
}

int main() {
  // Test: carves passages
  {
    auto grid = makeAllWallsGrid(7, 7);
    grid[1][1].cellType = CellType::Start;
    auto result = aldousBroder(grid, {1, 1});
    assert(result.passagesCarved > 0);
  }

  // Test: creates connected maze
  {
    auto grid = makeAllWallsGrid(7, 7);
    grid[1][1].cellType = CellType::Start;
    grid[5][5].cellType = CellType::End;
    aldousBroder(grid, {1, 1});
    assert(bfsReachable(grid, 1, 1, 5, 5));
  }

  // Test: does not carve border cells
  {
    auto grid = makeAllWallsGrid(7, 7);
    grid[1][1].cellType = CellType::Start;
    aldousBroder(grid, {1, 1});
    for (int col = 0; col < 7; col++) {
      assert(grid[0][col].cellType == CellType::Wall);
      assert(grid[6][col].cellType == CellType::Wall);
    }
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
