#include "../sources/FloodFillBfs.cpp"
#include <cassert>
#include <iostream>

std::vector<std::vector<GridCell>> makeEmptyGrid(int rows, int cols) {
  std::vector<std::vector<GridCell>> grid(rows, std::vector<GridCell>(cols));
  for (int row = 0; row < rows; row++) {
    for (int col = 0; col < cols; col++) {
      grid[row][col] = {row, col, CellType::Empty, "default"};
    }
  }
  return grid;
}

void setWall(std::vector<std::vector<GridCell>>& grid, int row, int col) {
  grid[row][col].cellType = CellType::Wall;
}

int main() {
  // Test: fills all cells on small empty grid
  {
    auto grid = makeEmptyGrid(3, 3);
    auto result = floodFillBfs(grid, {0, 0});
    assert(result.count == 9);
    assert((int)result.filled.size() == 9);
  }

  // Test: respects walls
  {
    auto grid = makeEmptyGrid(3, 3);
    setWall(grid, 0, 1);
    setWall(grid, 1, 1);
    setWall(grid, 2, 1);
    auto result = floodFillBfs(grid, {0, 0});
    assert(result.count == 3);
  }

  // Test: enclosed region
  {
    auto grid = makeEmptyGrid(5, 5);
    for (int col = 0; col < 5; col++) {
      setWall(grid, 0, col);
      setWall(grid, 4, col);
    }
    for (int row = 1; row < 4; row++) {
      setWall(grid, row, 0);
      setWall(grid, row, 4);
    }
    auto result = floodFillBfs(grid, {2, 2});
    assert(result.count == 9);
  }

  // Test: seed cell is first filled
  {
    auto grid = makeEmptyGrid(3, 3);
    auto result = floodFillBfs(grid, {1, 1});
    assert(result.filled[0].first == 1 && result.filled[0].second == 1);
  }

  // Test: isolated cell
  {
    auto grid = makeEmptyGrid(3, 3);
    setWall(grid, 0, 1);
    setWall(grid, 1, 0);
    setWall(grid, 1, 2);
    setWall(grid, 2, 1);
    auto result = floodFillBfs(grid, {1, 1});
    assert(result.count == 1);
    assert(result.filled[0].first == 1 && result.filled[0].second == 1);
  }

  // Test: count matches filled length
  {
    auto grid = makeEmptyGrid(4, 4);
    setWall(grid, 2, 0);
    setWall(grid, 2, 1);
    setWall(grid, 2, 2);
    auto result = floodFillBfs(grid, {0, 0});
    assert(result.count == (int)result.filled.size());
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
