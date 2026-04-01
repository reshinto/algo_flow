import java.util.*;

// Dijkstra Bidirectional — two simultaneous Dijkstra searches meeting in the middle
public class DijkstraBidirectional {
    public static int[][] dijkstraBidirectional(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize

        // Forward search from start
        int[][] forwardDistance = new int[rowCount][colCount]; // @step:initialize
        for (int[] row : forwardDistance) Arrays.fill(row, Integer.MAX_VALUE); // @step:initialize
        forwardDistance[start[0]][start[1]] = 0; // @step:initialize
        int[][][] forwardParent = new int[rowCount][colCount][]; // @step:initialize
        boolean[][] forwardVisited = new boolean[rowCount][colCount]; // @step:initialize

        // Reverse search from end
        int[][] reverseDistance = new int[rowCount][colCount]; // @step:initialize
        for (int[] row : reverseDistance) Arrays.fill(row, Integer.MAX_VALUE); // @step:initialize
        reverseDistance[end[0]][end[1]] = 0; // @step:initialize
        int[][][] reverseParent = new int[rowCount][colCount][]; // @step:initialize
        boolean[][] reverseVisited = new boolean[rowCount][colCount]; // @step:initialize

        PriorityQueue<int[]> forwardQueue = new PriorityQueue<>( // @step:initialize,open-node
            Comparator.comparingInt(node -> node[2])
        );
        forwardQueue.add(new int[]{start[0], start[1], 0}); // @step:open-node

        PriorityQueue<int[]> reverseQueue = new PriorityQueue<>( // @step:open-node
            Comparator.comparingInt(node -> node[2])
        );
        reverseQueue.add(new int[]{end[0], end[1], 0}); // @step:open-node

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        int bestCost = Integer.MAX_VALUE;
        int[] meetingPoint = null;

        while (!forwardQueue.isEmpty() || !reverseQueue.isEmpty()) {
            if (!forwardQueue.isEmpty()) {
                int[] current = forwardQueue.poll(); // @step:close-node
                int fRow = current[0], fCol = current[1]; // @step:close-node
                if (!forwardVisited[fRow][fCol]) {
                    forwardVisited[fRow][fCol] = true; // @step:close-node

                    if (reverseVisited[fRow][fCol]) {
                        int totalCost = forwardDistance[fRow][fCol] + reverseDistance[fRow][fCol];
                        if (totalCost < bestCost) {
                            bestCost = totalCost;
                            meetingPoint = new int[]{fRow, fCol};
                        }
                    }

                    for (int[] dir : directions) {
                        int neighborRow = fRow + dir[0];
                        int neighborCol = fCol + dir[1];
                        if (neighborRow < 0 || neighborRow >= rowCount) continue;
                        if (neighborCol < 0 || neighborCol >= colCount) continue;
                        if (grid[neighborRow][neighborCol] == 1) continue;
                        if (forwardVisited[neighborRow][neighborCol]) continue;
                        int newDist = forwardDistance[fRow][fCol] + 1;
                        if (newDist < forwardDistance[neighborRow][neighborCol]) {
                            forwardDistance[neighborRow][neighborCol] = newDist; // @step:open-node
                            forwardParent[neighborRow][neighborCol] = new int[]{fRow, fCol};
                            forwardQueue.add(new int[]{neighborRow, neighborCol, newDist});
                        }
                    }
                }
            }

            if (!reverseQueue.isEmpty()) {
                int[] current = reverseQueue.poll(); // @step:close-node
                int rRow = current[0], rCol = current[1]; // @step:close-node
                if (!reverseVisited[rRow][rCol]) {
                    reverseVisited[rRow][rCol] = true; // @step:close-node

                    if (forwardVisited[rRow][rCol]) {
                        int totalCost = forwardDistance[rRow][rCol] + reverseDistance[rRow][rCol];
                        if (totalCost < bestCost) {
                            bestCost = totalCost;
                            meetingPoint = new int[]{rRow, rCol};
                        }
                    }

                    for (int[] dir : directions) {
                        int neighborRow = rRow + dir[0];
                        int neighborCol = rCol + dir[1];
                        if (neighborRow < 0 || neighborRow >= rowCount) continue;
                        if (neighborCol < 0 || neighborCol >= colCount) continue;
                        if (grid[neighborRow][neighborCol] == 1) continue;
                        if (reverseVisited[neighborRow][neighborCol]) continue;
                        int newDist = reverseDistance[rRow][rCol] + 1;
                        if (newDist < reverseDistance[neighborRow][neighborCol]) {
                            reverseDistance[neighborRow][neighborCol] = newDist; // @step:open-node
                            reverseParent[neighborRow][neighborCol] = new int[]{rRow, rCol};
                            reverseQueue.add(new int[]{neighborRow, neighborCol, newDist});
                        }
                    }
                }
            }

            if (meetingPoint != null) {
                int forwardMin = forwardQueue.isEmpty() ? Integer.MAX_VALUE : forwardQueue.peek()[2];
                int reverseMin = reverseQueue.isEmpty() ? Integer.MAX_VALUE : reverseQueue.peek()[2];
                if ((long) forwardMin + reverseMin >= bestCost) break;
            }
        }

        if (meetingPoint == null) {
            return new int[0][]; // @step:complete
        }

        List<int[]> forwardPath = reconstructPath(forwardParent, meetingPoint); // @step:trace-path
        List<int[]> reversePath = reconstructReversePath(reverseParent, meetingPoint); // @step:trace-path
        List<int[]> path = new ArrayList<>(forwardPath);
        path.addAll(reversePath.subList(1, reversePath.size()));
        return path.toArray(new int[0][]);
    }

    private static List<int[]> reconstructPath(int[][][] parent, int[] end) {
        List<int[]> path = new ArrayList<>();
        int[] current = end;
        while (current != null) {
            path.add(0, current);
            current = parent[current[0]][current[1]];
        }
        return path;
    }

    private static List<int[]> reconstructReversePath(int[][][] reverseParent, int[] meetingPoint) {
        List<int[]> path = new ArrayList<>();
        int[] current = meetingPoint;
        while (current != null) {
            path.add(current);
            current = reverseParent[current[0]][current[1]];
        }
        return path;
    }
}
