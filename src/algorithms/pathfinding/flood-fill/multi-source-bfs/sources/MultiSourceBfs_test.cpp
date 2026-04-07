#include "MultiSourceBfs.cpp"
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

int main() {
  // Test: single cell distance is 1
  {
    auto grid = makeEmptyGrid(1, 1);
    auto result = multiSourceBfs(grid);
    assert(result.distances[0][0] == 1);
    assert(result.maxDistance == 1);
  }

  // Test: single row all distance 1
  {
    auto grid = makeEmptyGrid(1, 5);
    auto result = multiSourceBfs(grid);
    for (int col = 0; col < 5; col++) {
      assert(result.distances[0][col] == 1);
    }
  }

  // Test: center of 3x3 has distance 2
  {
    auto grid = makeEmptyGrid(3, 3);
    auto result = multiSourceBfs(grid);
    assert(result.distances[1][1] == 2);
    assert(result.maxDistance == 2);
  }

  // Test: walls have distance -1
  {
    auto grid = makeEmptyGrid(3, 3);
    grid[1][1].cellType = CellType::Wall;
    auto result = multiSourceBfs(grid);
    assert(result.distances[1][1] == -1);
  }

  // Test: center of 5x5 has max distance 3
  {
    auto grid = makeEmptyGrid(5, 5);
    auto result = multiSourceBfs(grid);
    assert(result.maxDistance == 3);
    assert(result.distances[2][2] == 3);
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
