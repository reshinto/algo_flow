#include "../sources/BidirectionalBfsGrid.cpp"
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
    auto result = bidirectionalBfsGrid(grid, {0, 0}, {4, 4});
    assert(!result.path.empty());
    assert(result.path.front().first == 0 && result.path.front().second == 0);
    assert(result.path.back().first == 4 && result.path.back().second == 4);
  }

  // Test: returns empty path when no route
  {
    auto grid = makeEmptyGrid(5, 5);
    setWall(grid, 0, 1);
    setWall(grid, 1, 0);
    setWall(grid, 1, 1);
    auto result = bidirectionalBfsGrid(grid, {0, 0}, {4, 4});
    assert(result.path.empty());
  }

  // Test: handles start equal to end
  {
    auto grid = makeEmptyGrid(3, 3);
    auto result = bidirectionalBfsGrid(grid, {1, 1}, {1, 1});
    assert((int)result.path.size() == 1);
    assert(result.path[0].first == 1 && result.path[0].second == 1);
  }

  // Test: path is valid adjacent steps
  {
    auto grid = makeEmptyGrid(5, 5);
    auto result = bidirectionalBfsGrid(grid, {0, 0}, {4, 4});
    for (int pathIndex = 1; pathIndex < (int)result.path.size(); pathIndex++) {
      auto prev = result.path[pathIndex - 1];
      auto curr = result.path[pathIndex];
      int diff = std::abs(curr.first - prev.first) + std::abs(curr.second - prev.second);
      assert(diff == 1);
    }
  }

  // Test: tracks visited cells
  {
    auto grid = makeEmptyGrid(5, 5);
    auto result = bidirectionalBfsGrid(grid, {0, 0}, {4, 4});
    assert(!result.visited.empty());
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
