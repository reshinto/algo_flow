#include "sources/KruskalsMaze.cpp"
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
    auto grid = makeAllWallsGrid(9, 9);
    auto result = kruskalsMaze(grid);
    assert(result.passagesCarved > 0);
  }

  // Test: creates connected maze
  {
    auto grid = makeAllWallsGrid(9, 9);
    kruskalsMaze(grid);
    assert(bfsReachable(grid, 1, 1, 7, 7));
  }

  // Test: does not carve border cells
  {
    auto grid = makeAllWallsGrid(9, 9);
    kruskalsMaze(grid);
    for (int col = 0; col < 9; col++) {
      assert(grid[0][col].cellType == CellType::Wall);
      assert(grid[8][col].cellType == CellType::Wall);
    }
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
