import java.util.*;

// Wall Follower — right-hand rule maze solving: always keep the right wall, follow it to the exit
public class WallFollower {
    // Direction indices: 0=up, 1=right, 2=down, 3=left
    private static final int[] DIRECTION_ROW = {-1, 0, 1, 0};
    private static final int[] DIRECTION_COL = {0, 1, 0, -1};

    public static Map<String, Object> wallFollower(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        List<int[]> path = new ArrayList<>(); // @step:initialize
        List<int[]> visited = new ArrayList<>(); // @step:initialize

        int currentRow = start[0]; // @step:initialize
        int currentCol = start[1]; // @step:initialize
        // Start facing right (direction index 1)
        int facingDirection = 1; // @step:initialize
        int maxSteps = rowCount * colCount * 4; // @step:initialize

        for (int stepCount = 0; stepCount < maxSteps; stepCount++) { // @step:open-node
            path.add(new int[]{currentRow, currentCol}); // @step:close-node
            visited.add(new int[]{currentRow, currentCol}); // @step:close-node

            // Check if we reached the end
            if (currentRow == end[0] && currentCol == end[1]) {
                Map<String, Object> found = new HashMap<>(); // @step:trace-path
                found.put("path", path);
                found.put("visited", visited);
                return found;
            }

            // Right-hand rule: try to turn right first, then forward, then left, then back
            int rightDirection = (facingDirection + 1) % 4;
            int leftDirection = (facingDirection + 3) % 4;

            if (canMove(grid, currentRow, currentCol, rightDirection, rowCount, colCount)) {
                facingDirection = rightDirection; // @step:open-node
                currentRow += DIRECTION_ROW[facingDirection]; // @step:open-node
                currentCol += DIRECTION_COL[facingDirection]; // @step:open-node
            } else if (canMove(grid, currentRow, currentCol, facingDirection, rowCount, colCount)) {
                currentRow += DIRECTION_ROW[facingDirection]; // @step:open-node
                currentCol += DIRECTION_COL[facingDirection]; // @step:open-node
            } else if (canMove(grid, currentRow, currentCol, leftDirection, rowCount, colCount)) {
                facingDirection = leftDirection; // @step:open-node
                currentRow += DIRECTION_ROW[facingDirection]; // @step:open-node
                currentCol += DIRECTION_COL[facingDirection]; // @step:open-node
            } else {
                facingDirection = (facingDirection + 2) % 4; // @step:open-node
                currentRow += DIRECTION_ROW[facingDirection]; // @step:open-node
                currentCol += DIRECTION_COL[facingDirection]; // @step:open-node
            }
        }

        Map<String, Object> notFound = new HashMap<>(); // @step:complete
        notFound.put("path", new ArrayList<int[]>());
        notFound.put("visited", visited);
        return notFound;
    }

    private static boolean canMove(int[][] grid, int row, int col, int direction, int rowCount, int colCount) {
        int nextRow = row + DIRECTION_ROW[direction];
        int nextCol = col + DIRECTION_COL[direction];
        if (nextRow < 0 || nextRow >= rowCount || nextCol < 0 || nextCol >= colCount) return false;
        return grid[nextRow][nextCol] != 1;
    }
}
