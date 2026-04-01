import java.util.*;

// Recursive Backtracker Maze — DFS-based maze carving with random neighbor selection
public class RecursiveBacktracker {
    public static int recursiveBacktrackerMaze(int[][] grid, int[] start) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        boolean[][] visited = new boolean[rowCount][colCount]; // @step:initialize
        int passagesCarved = 0; // @step:initialize
        Random random = new Random();

        // DFS stack — stores passage cell coordinates (odd row and col only)
        Deque<int[]> stack = new ArrayDeque<>(); // @step:initialize
        int startRow = start[0]; // @step:initialize
        int startCol = start[1]; // @step:initialize

        // Mark start cell as visited and push onto stack
        visited[startRow][startCol] = true; // @step:carve-cell
        stack.push(new int[]{startRow, startCol}); // @step:carve-cell

        // Cardinal directions — each step moves 2 cells to skip over walls
        int[][] directions = {{-2, 0}, {2, 0}, {0, -2}, {0, 2}};

        while (!stack.isEmpty()) {
            int[] current = stack.peek(); // @step:visit
            int currentRow = current[0]; // @step:visit
            int currentCol = current[1]; // @step:visit

            // Collect unvisited passage-cell neighbors
            List<int[]> unvisitedNeighbors = new ArrayList<>(); // @step:visit
            for (int[] direction : directions) {
                int neighborRow = currentRow + direction[0];
                int neighborCol = currentCol + direction[1];
                if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
                if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
                if (!visited[neighborRow][neighborCol]) {
                    unvisitedNeighbors.add(new int[]{neighborRow, neighborCol}); // @step:visit
                }
            }

            if (!unvisitedNeighbors.isEmpty()) {
                // Randomly choose one unvisited neighbor
                int[] chosen = unvisitedNeighbors.get(random.nextInt(unvisitedNeighbors.size())); // @step:carve-cell
                int chosenRow = chosen[0];
                int chosenCol = chosen[1];

                // Carve the wall between current and chosen
                int wallRow = currentRow + (chosenRow - currentRow) / 2;
                int wallCol = currentCol + (chosenCol - currentCol) / 2;
                grid[wallRow][wallCol] = 0; // @step:carve-cell
                passagesCarved++;

                // Carve the chosen cell itself
                if (grid[chosenRow][chosenCol] == 1) {
                    grid[chosenRow][chosenCol] = 0; // @step:carve-cell
                    passagesCarved++;
                }

                visited[chosenRow][chosenCol] = true; // @step:carve-cell
                stack.push(new int[]{chosenRow, chosenCol}); // @step:carve-cell
            } else {
                // Backtrack — no unvisited neighbors remain
                stack.pop(); // @step:visit
            }
        }

        return passagesCarved; // @step:complete
    }
}
