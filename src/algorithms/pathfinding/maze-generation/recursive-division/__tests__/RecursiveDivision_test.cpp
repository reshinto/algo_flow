#include "../sources/RecursiveDivision.cpp"
#include <cassert>
#include <iostream>
#include <queue>

std::vector<std::vector<GridCell>> makeOpenGrid(int rows, int cols) {
  std::vector<std::vector<GridCell>> grid(rows, std::vector<GridCell>(cols));
  for (int row = 0; row < rows; row++)
    for (int col = 0; col < cols; col++)
      grid[row][col] = {row, col, CellType::Empty, "default"};
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
  // Test: builds walls
  {
    auto grid = makeOpenGrid(9, 9);
    grid[1][1].cellType = CellType::Start;
    grid[7][7].cellType = CellType::End;
    auto result = recursiveDivision(grid, {1, 1}, {7, 7});
    assert(result.wallsBuilt > 0);
  }

  // Test: start and end preserved
  {
    auto grid = makeOpenGrid(9, 9);
    grid[1][1].cellType = CellType::Start;
    grid[7][7].cellType = CellType::End;
    recursiveDivision(grid, {1, 1}, {7, 7});
    assert(grid[1][1].cellType == CellType::Start);
    assert(grid[7][7].cellType == CellType::End);
  }

  // Test: path still exists after division
  {
    auto grid = makeOpenGrid(9, 9);
    grid[1][1].cellType = CellType::Start;
    grid[7][7].cellType = CellType::End;
    recursiveDivision(grid, {1, 1}, {7, 7});
    assert(bfsReachable(grid, 1, 1, 7, 7));
  }

  // Test: walls actually added to grid
  {
    auto grid = makeOpenGrid(9, 9);
    grid[1][1].cellType = CellType::Start;
    grid[7][7].cellType = CellType::End;
    recursiveDivision(grid, {1, 1}, {7, 7});
    int wallCount = 0;
    for (const auto& row : grid)
      for (const auto& cell : row)
        if (cell.cellType == CellType::Wall) wallCount++;
    assert(wallCount > 0);
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
