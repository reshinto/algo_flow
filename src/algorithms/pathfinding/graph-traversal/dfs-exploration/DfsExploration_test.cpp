#include "sources/DfsExploration.cpp"
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
  // Test: visits all cells in open grid
  {
    auto grid = makeEmptyGrid(3, 3);
    auto result = dfsExploration(grid, {0, 0});
    assert((int)result.visited.size() == 9);
  }

  // Test: starts with start cell
  {
    auto grid = makeEmptyGrid(3, 3);
    auto result = dfsExploration(grid, {1, 1});
    assert(result.visited[0].first == 1 && result.visited[0].second == 1);
  }

  // Test: does not visit wall cells
  {
    auto grid = makeEmptyGrid(3, 3);
    setWall(grid, 0, 1);
    setWall(grid, 1, 0);
    setWall(grid, 1, 1);
    auto result = dfsExploration(grid, {0, 0});
    assert((int)result.visited.size() == 1);
  }

  // Test: visits only reachable cells
  {
    auto grid = makeEmptyGrid(4, 4);
    for (int wallRow = 0; wallRow < 4; wallRow++) setWall(grid, wallRow, 2);
    auto result = dfsExploration(grid, {0, 0});
    assert((int)result.visited.size() == 8);
  }

  // Test: max depth in linear corridor
  {
    auto grid = makeEmptyGrid(1, 5);
    auto result = dfsExploration(grid, {0, 0});
    assert(result.maxDepth == 4);
  }

  // Test: handles 1x1 grid
  {
    auto grid = makeEmptyGrid(1, 1);
    auto result = dfsExploration(grid, {0, 0});
    assert((int)result.visited.size() == 1);
    assert(result.maxDepth == 0);
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
