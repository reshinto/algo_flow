// Recursive Backtracker Maze — DFS-based maze carving with random neighbor selection
#include <cstdlib>
#include <stack>
#include <string>
#include <vector>

enum class CellType { Empty, Wall, Start, End };

struct GridCell {
  int row;
  int col;
  CellType cellType;
  std::string state;
};

struct MazeResult {
  int passagesCarved;
};

MazeResult recursiveBacktrackerMaze(std::vector<std::vector<GridCell>>& grid, std::pair<int,int> start) {
  int rowCount = static_cast<int>(grid.size()); // @step:initialize
  int colCount = rowCount > 0 ? static_cast<int>(grid[0].size()) : 0; // @step:initialize
  std::vector<std::vector<bool>> visited(rowCount, std::vector<bool>(colCount, false)); // @step:initialize
  int passagesCarved = 0; // @step:initialize

  // DFS stack — stores passage cell coordinates (odd row and col only)
  std::stack<std::pair<int,int>> dfsStack; // @step:initialize
  int startRow = start.first; // @step:initialize
  int startCol = start.second; // @step:initialize

  // Mark start cell as visited and push onto stack
  visited[startRow][startCol] = true; // @step:carve-cell
  dfsStack.push({startRow, startCol}); // @step:carve-cell

  const int deltaRows[] = {-2, 2, 0, 0};
  const int deltaCols[] = {0, 0, -2, 2};

  while (!dfsStack.empty()) {
    auto [currentRow, currentCol] = dfsStack.top(); // @step:visit

    // Collect unvisited passage-cell neighbors
    std::vector<std::pair<int,int>> unvisitedNeighbors; // @step:visit
    for (int dirIndex = 0; dirIndex < 4; dirIndex++) {
      int neighborRow = currentRow + deltaRows[dirIndex];
      int neighborCol = currentCol + deltaCols[dirIndex];
      if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
      if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
      if (!visited[neighborRow][neighborCol]) {
        unvisitedNeighbors.push_back({neighborRow, neighborCol}); // @step:visit
      }
    }

    if (!unvisitedNeighbors.empty()) {
      // Randomly choose one unvisited neighbor
      int chosenIndex = rand() % static_cast<int>(unvisitedNeighbors.size());
      auto [chosenRow, chosenCol] = unvisitedNeighbors[chosenIndex]; // @step:carve-cell

      // Carve the wall between current and chosen
      int wallRow = currentRow + (chosenRow - currentRow) / 2;
      int wallCol = currentCol + (chosenCol - currentCol) / 2;
      grid[wallRow][wallCol].cellType = CellType::Empty; // @step:carve-cell
      passagesCarved++;

      // Carve the chosen cell itself
      if (grid[chosenRow][chosenCol].cellType == CellType::Wall) {
        grid[chosenRow][chosenCol].cellType = CellType::Empty; // @step:carve-cell
        passagesCarved++;
      }

      visited[chosenRow][chosenCol] = true; // @step:carve-cell
      dfsStack.push({chosenRow, chosenCol}); // @step:carve-cell
    } else {
      // Backtrack — no unvisited neighbors remain
      dfsStack.pop(); // @step:visit
    }
  }

  return {passagesCarved}; // @step:complete
}
