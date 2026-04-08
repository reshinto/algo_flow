#include "sources/JumpPointSearch.cpp"
#include <cassert>
#include <iostream>

std::vector<std::vector<GridCell>> makeEmptyGrid(int rows, int cols) {
  std::vector<std::vector<GridCell>> grid(rows, std::vector<GridCell>(cols));
  for (int row = 0; row < rows; row++)
    for (int col = 0; col < cols; col++)
      grid[row][col] = {row, col, CellType::Empty, "default"};
  return grid;
}

void setWall(std::vector<std::vector<GridCell>>& grid, int row, int col) {
  grid[row][col].cellType = CellType::Wall;
}

int main() {
  // Test: finds path along shared row
  {
    auto grid = makeEmptyGrid(5, 5);
    auto result = jumpPointSearch(grid, {2, 0}, {2, 4});
    assert(!result.path.empty());
    assert(result.path.front().first == 2 && result.path.front().second == 0);
    assert(result.path.back().first == 2 && result.path.back().second == 4);
  }

  // Test: returns empty path when no route
  {
    auto grid = makeEmptyGrid(5, 5);
    setWall(grid, 0, 1);
    setWall(grid, 1, 0);
    setWall(grid, 1, 1);
    auto result = jumpPointSearch(grid, {0, 0}, {4, 4});
    assert(result.path.empty());
  }

  // Test: handles start equal to end
  {
    auto grid = makeEmptyGrid(3, 3);
    auto result = jumpPointSearch(grid, {1, 1}, {1, 1});
    assert((int)result.path.size() == 1);
  }

  // Test: explores fewer nodes on corridor
  {
    auto grid = makeEmptyGrid(10, 3);
    auto result = jumpPointSearch(grid, {0, 1}, {9, 1});
    assert((int)result.visited.size() < 30);
    assert(!result.path.empty());
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
