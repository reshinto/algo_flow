#include "../sources/IdaStar.cpp"
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
  // Test: finds path on empty grid
  {
    auto grid = makeEmptyGrid(5, 5);
    auto result = idaStar(grid, {0, 0}, {4, 4});
    assert(!result.path.empty());
    assert(result.path.front().first == 0 && result.path.front().second == 0);
    assert(result.path.back().first == 4 && result.path.back().second == 4);
  }

  // Test: finds optimal path length
  {
    auto grid = makeEmptyGrid(5, 5);
    auto result = idaStar(grid, {0, 0}, {4, 4});
    assert((int)result.path.size() == 9);
  }

  // Test: returns empty path when no route
  {
    auto grid = makeEmptyGrid(5, 5);
    setWall(grid, 0, 1);
    setWall(grid, 1, 0);
    setWall(grid, 1, 1);
    auto result = idaStar(grid, {0, 0}, {4, 4});
    assert(result.path.empty());
  }

  // Test: handles adjacent start and end
  {
    auto grid = makeEmptyGrid(3, 3);
    auto result = idaStar(grid, {0, 0}, {0, 1});
    assert((int)result.path.size() == 2);
  }

  // Test: handles start equal to end
  {
    auto grid = makeEmptyGrid(3, 3);
    auto result = idaStar(grid, {1, 1}, {1, 1});
    assert((int)result.path.size() == 1);
  }

  // Test: records iteration count
  {
    auto grid = makeEmptyGrid(4, 4);
    auto result = idaStar(grid, {0, 0}, {3, 3});
    assert(result.iterationCount > 0);
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
