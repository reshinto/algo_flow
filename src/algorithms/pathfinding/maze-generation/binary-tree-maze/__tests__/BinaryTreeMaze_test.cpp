#include "../sources/BinaryTreeMaze.cpp"
#include <cassert>
#include <iostream>

std::vector<std::vector<GridCell>> makeAllWallsGrid(int rows, int cols) {
  std::vector<std::vector<GridCell>> grid(rows, std::vector<GridCell>(cols));
  for (int row = 0; row < rows; row++)
    for (int col = 0; col < cols; col++)
      grid[row][col] = {row, col, CellType::Wall, "default"};
  return grid;
}

int main() {
  // Test: carves passages
  {
    auto grid = makeAllWallsGrid(9, 9);
    grid[1][1].cellType = CellType::Start;
    auto result = binaryTreeMaze(grid);
    assert(result.passagesCarved > 0);
  }

  // Test: carves all odd-indexed passage cells
  {
    auto grid = makeAllWallsGrid(9, 9);
    grid[1][1].cellType = CellType::Start;
    binaryTreeMaze(grid);
    for (int row = 1; row < 8; row += 2)
      for (int col = 1; col < 8; col += 2)
        assert(grid[row][col].cellType != CellType::Wall);
  }

  // Test: does not carve border cells
  {
    auto grid = makeAllWallsGrid(9, 9);
    binaryTreeMaze(grid);
    for (int col = 0; col < 9; col++) {
      assert(grid[0][col].cellType == CellType::Wall);
      assert(grid[8][col].cellType == CellType::Wall);
    }
  }

  // Test: passages carved > 16
  {
    auto grid = makeAllWallsGrid(9, 9);
    grid[1][1].cellType = CellType::Start;
    auto result = binaryTreeMaze(grid);
    assert(result.passagesCarved > 16);
  }

  std::cout << "All tests passed!" << std::endl;
  return 0;
}
