#include "../sources/EllersMaze.cpp"
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

bool bfsReachable(const std::vector<std::vector<GridCell>>& grid, int sr, int sc, int er, int ec) {
  int rows = (int)grid.size(), cols = (int)grid[0].size();
  std::vector<std::vector<bool>> visited(rows, std::vector<bool>(cols, false));
  std::queue<std::pair<int,int>> q;
  q.push({sr, sc}); visited[sr][sc] = true;
  int dRow[] = {-1,1,0,0}, dCol[] = {0,0,-1,1};
  while (!q.empty()) {
    auto [row, col] = q.front(); q.pop();
    if (row == er && col == ec) return true;
    for (int dir = 0; dir < 4; dir++) {
      int nr = row + dRow[dir], nc = col + dCol[dir];
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc].cellType != CellType::Wall) {
        visited[nr][nc] = true; q.push({nr, nc});
      }
    }
  }
  return false;
}

int main() {
  // Test: carves passages
  {
    auto grid = makeAllWallsGrid(9, 9);
    grid[1][1].cellType = CellType::Start;
    auto result = ellersMaze(grid);
    assert(result.passagesCarved > 0);
  }

  // Test: creates connected maze
  {
    auto grid = makeAllWallsGrid(9, 9);
    grid[1][1].cellType = CellType::Start;
    grid[7][7].cellType = CellType::End;
    ellersMaze(grid);
    assert(bfsReachable(grid, 1, 1, 7, 7));
  }

  // Test: does not carve border cells
  {
    auto grid = makeAllWallsGrid(9, 9);
    ellersMaze(grid);
    for (int col = 0; col < 9; col++) {
      assert(grid[0][col].cellType == CellType::Wall);
      assert(grid[8][col].cellType == CellType::Wall);
    }
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
