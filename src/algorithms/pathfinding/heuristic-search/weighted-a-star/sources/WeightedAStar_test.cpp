#include "WeightedAStar.cpp"
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
    auto result = weightedAStar(grid, {0, 0}, {4, 4}, 1.5);
    assert(!result.path.empty());
    assert(result.path.front().first == 0 && result.path.front().second == 0);
    assert(result.path.back().first == 4 && result.path.back().second == 4);
  }

  // Test: with weight 1.0 finds optimal path
  {
    auto grid = makeEmptyGrid(5, 5);
    auto result = weightedAStar(grid, {0, 0}, {4, 4}, 1.0);
    assert((int)result.path.size() == 9);
  }

  // Test: returns empty path when no route
  {
    auto grid = makeEmptyGrid(5, 5);
    setWall(grid, 0, 1);
    setWall(grid, 1, 0);
    setWall(grid, 1, 1);
    auto result = weightedAStar(grid, {0, 0}, {4, 4}, 1.5);
    assert(result.path.empty());
  }

  // Test: handles start equal to end
  {
    auto grid = makeEmptyGrid(3, 3);
    auto result = weightedAStar(grid, {1, 1}, {1, 1}, 1.5);
    assert((int)result.path.size() == 1);
  }

  // Test: records weight used
  {
    auto grid = makeEmptyGrid(3, 3);
    auto result = weightedAStar(grid, {0, 0}, {2, 2}, 2.0);
    assert(result.weight == 2.0);
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
