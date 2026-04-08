#include "sources/BfsShortestPath.cpp"
#include <cassert>
#include <iostream>

std::vector<std::vector<GridCell>> makeGrid(int rows, int cols) {
  std::vector<std::vector<GridCell>> grid(rows, std::vector<GridCell>(cols));
  for (int row = 0; row < rows; row++)
    for (int col = 0; col < cols; col++)
      grid[row][col] = {row, col, CellType::Empty, "default"};
  return grid;
}

int main() {
  // Test: finds path
  {
    auto grid = makeGrid(5, 5);
    grid[0][0].cellType = CellType::Start;
    grid[4][4].cellType = CellType::End;
    auto result = bfsShortestPath(grid, {0, 0}, {4, 4});
    assert(!result.path.empty());
  }

  // Test: shortest path length
  {
    auto grid = makeGrid(5, 5);
    grid[0][0].cellType = CellType::Start;
    grid[4][4].cellType = CellType::End;
    auto result = bfsShortestPath(grid, {0, 0}, {4, 4});
    assert(result.path.size() == 9);
  }

  // Test: path empty when blocked
  {
    auto grid = makeGrid(3, 3);
    grid[0][0].cellType = CellType::Start;
    grid[2][2].cellType = CellType::End;
    for (int row = 0; row < 3; row++) grid[row][1].cellType = CellType::Wall;
    auto result = bfsShortestPath(grid, {0, 0}, {2, 2});
    assert(result.path.empty());
  }

  // Test: navigates around wall
  {
    auto grid = makeGrid(5, 5);
    grid[0][0].cellType = CellType::Start;
    grid[4][4].cellType = CellType::End;
    for (int row = 0; row < 4; row++) grid[row][2].cellType = CellType::Wall;
    auto result = bfsShortestPath(grid, {0, 0}, {4, 4});
    assert(!result.path.empty());
  }

  // Test: adjacent cells
  {
    auto grid = makeGrid(3, 3);
    grid[0][0].cellType = CellType::Start;
    grid[0][1].cellType = CellType::End;
    auto result = bfsShortestPath(grid, {0, 0}, {0, 1});
    assert(result.path.size() == 2);
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
