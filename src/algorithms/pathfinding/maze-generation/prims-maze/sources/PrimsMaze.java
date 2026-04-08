import java.util.*;

// Prim's Maze — randomized Prim's algorithm for maze generation
public class PrimsMaze {
    public static int primsMaze(int[][] grid, int[] start) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        boolean[][] inMaze = new boolean[rowCount][colCount]; // @step:initialize
        int passagesCarved = 0; // @step:initialize
        Random random = new Random();

        // Each frontier entry is {wallRow, wallCol, originRow, originCol}
        List<int[]> frontier = new ArrayList<>(); // @step:initialize
        int startRow = start[0]; // @step:initialize
        int startCol = start[1]; // @step:initialize

        // Add start cell to maze
        inMaze[startRow][startCol] = true; // @step:open-node
        if (grid[startRow][startCol] == 1) {
            grid[startRow][startCol] = 0; // @step:open-node
            passagesCarved++;
        }

        // Directions move 2 cells (skipping wall cells)
        int[][] directions = {{-2, 0}, {2, 0}, {0, -2}, {0, 2}};

        // Add initial frontier neighbors
        for (int[] direction : directions) {
            int neighborRow = startRow + direction[0];
            int neighborCol = startCol + direction[1];
            if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
            if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
            if (!inMaze[neighborRow][neighborCol]) {
                frontier.add(new int[]{neighborRow, neighborCol, startRow, startCol}); // @step:open-node
            }
        }

        while (!frontier.isEmpty()) {
            // Randomly pick a frontier entry
            int pickedIndex = random.nextInt(frontier.size());
            int[] picked = frontier.remove(pickedIndex); // @step:carve-cell
            int pickedRow = picked[0];
            int pickedCol = picked[1];
            int originRow = picked[2];
            int originCol = picked[3];

            if (inMaze[pickedRow][pickedCol]) continue; // @step:carve-cell

            // Carve the passage cell
            inMaze[pickedRow][pickedCol] = true; // @step:carve-cell
            if (grid[pickedRow][pickedCol] == 1) {
                grid[pickedRow][pickedCol] = 0; // @step:carve-cell
                passagesCarved++;
            }

            // Carve the wall between origin and picked
            int wallRow = originRow + (pickedRow - originRow) / 2;
            int wallCol = originCol + (pickedCol - originCol) / 2;
            if (grid[wallRow][wallCol] == 1) {
                grid[wallRow][wallCol] = 0; // @step:carve-cell
                passagesCarved++;
            }

            // Add new frontier neighbors
            for (int[] direction : directions) {
                int neighborRow = pickedRow + direction[0];
                int neighborCol = pickedCol + direction[1];
                if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
                if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
                if (!inMaze[neighborRow][neighborCol]) {
                    frontier.add(new int[]{neighborRow, neighborCol, pickedRow, pickedCol}); // @step:open-node
                }
            }
        }

        return passagesCarved; // @step:complete
    }
}
