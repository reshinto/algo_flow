import java.util.*;

// Bidirectional BFS — BFS from start and end simultaneously, meeting in the middle
public class BidirectionalBfsGrid {
    public static Map<String, Object> bidirectionalBfs(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize

        if (start[0] == end[0] && start[1] == end[1]) {
            Map<String, Object> result = new HashMap<>(); // @step:complete
            result.put("path", Collections.singletonList(start));
            result.put("visited", Collections.singletonList(start));
            return result;
        }

        // Separate parent maps for forward and backward searches
        int[][][] forwardParent = new int[rowCount][colCount][]; // @step:initialize
        int[][][] backwardParent = new int[rowCount][colCount][]; // @step:initialize
        boolean[][] forwardVisited = new boolean[rowCount][colCount]; // @step:initialize
        boolean[][] backwardVisited = new boolean[rowCount][colCount]; // @step:initialize

        Queue<int[]> forwardQueue = new LinkedList<>(); // @step:initialize,open-node
        Queue<int[]> backwardQueue = new LinkedList<>(); // @step:initialize,open-node
        forwardQueue.add(new int[]{start[0], start[1]}); // @step:open-node
        backwardQueue.add(new int[]{end[0], end[1]}); // @step:open-node
        forwardVisited[start[0]][start[1]] = true; // @step:open-node
        backwardVisited[end[0]][end[1]] = true; // @step:open-node

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        List<int[]> allVisited = new ArrayList<>();

        while (!forwardQueue.isEmpty() || !backwardQueue.isEmpty()) {
            // Expand forward frontier one step
            if (!forwardQueue.isEmpty()) {
                int[] current = forwardQueue.poll(); // @step:close-node
                int currentRow = current[0]; // @step:close-node
                int currentCol = current[1]; // @step:close-node
                allVisited.add(new int[]{currentRow, currentCol}); // @step:close-node

                for (int[] direction : directions) {
                    int neighborRow = currentRow + direction[0];
                    int neighborCol = currentCol + direction[1];
                    if (neighborRow < 0 || neighborRow >= rowCount) continue;
                    if (neighborCol < 0 || neighborCol >= colCount) continue;
                    if (grid[neighborRow][neighborCol] == 1) continue;
                    if (forwardVisited[neighborRow][neighborCol]) continue;
                    forwardVisited[neighborRow][neighborCol] = true; // @step:open-node
                    forwardParent[neighborRow][neighborCol] = new int[]{currentRow, currentCol}; // @step:open-node
                    forwardQueue.add(new int[]{neighborRow, neighborCol}); // @step:open-node

                    if (backwardVisited[neighborRow][neighborCol]) {
                        List<int[]> path = buildPath(forwardParent, backwardParent, new int[]{neighborRow, neighborCol});
                        Map<String, Object> result = new HashMap<>(); // @step:trace-path
                        result.put("path", path);
                        result.put("visited", allVisited);
                        return result;
                    }
                }
            }

            // Expand backward frontier one step
            if (!backwardQueue.isEmpty()) {
                int[] current = backwardQueue.poll(); // @step:close-node
                int currentRow = current[0]; // @step:close-node
                int currentCol = current[1]; // @step:close-node
                allVisited.add(new int[]{currentRow, currentCol}); // @step:close-node

                for (int[] direction : directions) {
                    int neighborRow = currentRow + direction[0];
                    int neighborCol = currentCol + direction[1];
                    if (neighborRow < 0 || neighborRow >= rowCount) continue;
                    if (neighborCol < 0 || neighborCol >= colCount) continue;
                    if (grid[neighborRow][neighborCol] == 1) continue;
                    if (backwardVisited[neighborRow][neighborCol]) continue;
                    backwardVisited[neighborRow][neighborCol] = true; // @step:open-node
                    backwardParent[neighborRow][neighborCol] = new int[]{currentRow, currentCol}; // @step:open-node
                    backwardQueue.add(new int[]{neighborRow, neighborCol}); // @step:open-node

                    if (forwardVisited[neighborRow][neighborCol]) {
                        List<int[]> path = buildPath(forwardParent, backwardParent, new int[]{neighborRow, neighborCol});
                        Map<String, Object> result = new HashMap<>(); // @step:trace-path
                        result.put("path", path);
                        result.put("visited", allVisited);
                        return result;
                    }
                }
            }
        }

        Map<String, Object> result = new HashMap<>(); // @step:complete
        result.put("path", new ArrayList<int[]>());
        result.put("visited", allVisited);
        return result;
    }

    private static List<int[]> buildPath(int[][][] forwardParent, int[][][] backwardParent, int[] meetingPoint) {
        List<int[]> forwardPath = new ArrayList<>();
        int[] current = meetingPoint;
        while (current != null) {
            forwardPath.add(0, current);
            current = forwardParent[current[0]][current[1]];
        }

        List<int[]> backwardPath = new ArrayList<>();
        current = backwardParent[meetingPoint[0]][meetingPoint[1]];
        while (current != null) {
            backwardPath.add(current);
            current = backwardParent[current[0]][current[1]];
        }

        forwardPath.addAll(backwardPath);
        return forwardPath;
    }
}
