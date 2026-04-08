#include "sources/FloodFillDfs.cpp"
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
    auto result = floodFillDfs(grid, {0, 0});
    assert(result.count == 9);
    assert((int)result.filled.size() == 9);
  }

  // Test: respects walls
  {
    auto grid = makeEmptyGrid(3, 3);
    setWall(grid, 0, 1);
    setWall(grid, 1, 1);
    setWall(grid, 2, 1);
    auto result = floodFillDfs(grid, {0, 0});
    assert(result.count == 3);
  }

  // Test: fills same total count (16 - 2 walls = 14)
  {
    auto grid = makeEmptyGrid(4, 4);
    setWall(grid, 1, 2);
    setWall(grid, 2, 2);
    auto result = floodFillDfs(grid, {0, 0});
    assert(result.count == 14);
  }

  // Test: isolated cell
  {
    auto grid = makeEmptyGrid(3, 3);
    setWall(grid, 0, 1);
    setWall(grid, 1, 0);
    setWall(grid, 1, 2);
    setWall(grid, 2, 1);
    auto result = floodFillDfs(grid, {1, 1});
    assert(result.count == 1);
    assert(result.filled[0].first == 1 && result.filled[0].second == 1);
  }

  // Test: count matches filled length
  {
    auto grid = makeEmptyGrid(4, 4);
    setWall(grid, 0, 2);
    setWall(grid, 1, 2);
    auto result = floodFillDfs(grid, {0, 0});
    assert(result.count == (int)result.filled.size());
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
