#include "sources/WallFollower.cpp"
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
  // Test: finds path in simple corridor
  {
    auto grid = makeEmptyGrid(1, 5);
    auto result = wallFollower(grid, {0, 0}, {0, 4});
    assert(!result.path.empty());
    assert(result.path.back().first == 0 && result.path.back().second == 4);
  }

  // Test: starts path at start position
  {
    auto grid = makeEmptyGrid(3, 3);
    auto result = wallFollower(grid, {0, 0}, {2, 2});
    assert(result.path[0].first == 0 && result.path[0].second == 0);
  }

  // Test: returns empty path when start isolated
  {
    auto grid = makeEmptyGrid(3, 3);
    setWall(grid, 0, 1);
    setWall(grid, 1, 0);
    setWall(grid, 1, 1);
    auto result = wallFollower(grid, {0, 0}, {2, 2});
    assert(result.path.empty());
  }

  // Test: path steps are adjacent
  {
    auto grid = makeEmptyGrid(1, 5);
    auto result = wallFollower(grid, {0, 0}, {0, 4});
    for (int pathIndex = 1; pathIndex < (int)result.path.size(); pathIndex++) {
      auto prev = result.path[pathIndex - 1];
      auto curr = result.path[pathIndex];
      int diff = std::abs(curr.first - prev.first) + std::abs(curr.second - prev.second);
      assert(diff == 1);
    }
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
