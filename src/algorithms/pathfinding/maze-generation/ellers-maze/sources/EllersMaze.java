import java.util.*;

// Eller's Maze — row-by-row maze generation with set merging and vertical extensions
public class EllersMaze {
    public static int ellersMaze(int[][] grid) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        int passagesCarved = 0; // @step:initialize
        Random random = new Random();

        // Passage column indices (odd columns)
        List<Integer> passageCols = new ArrayList<>(); // @step:initialize
        for (int colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
            passageCols.add(colIndex);
        }
        int passageColCount = passageCols.size(); // @step:initialize

        // Assign each cell in the first passage row its own set
        int[] nextSetId = {1}; // @step:initialize
        int[] currentSets = new int[passageColCount]; // @step:initialize
        for (int cellPos = 0; cellPos < passageColCount; cellPos++) {
            currentSets[cellPos] = nextSetId[0]++;
        }

        // Collect passage row indices
        List<Integer> passageRows = new ArrayList<>();
        for (int rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
            passageRows.add(rowIndex);
        }

        for (int passageRowPos = 0; passageRowPos < passageRows.size(); passageRowPos++) {
            int passageRow = passageRows.get(passageRowPos); // @step:carve-cell
            boolean isLastRow = passageRowPos == passageRows.size() - 1; // @step:carve-cell

            // Step 1: Carve all passage cells in this row
            for (int passageCol : passageCols) {
                if (grid[passageRow][passageCol] == 1) {
                    grid[passageRow][passageCol] = 0; // @step:carve-cell
                    passagesCarved++;
                }
            }

            // Step 2: Randomly merge adjacent cells in different sets
            for (int cellPos = 0; cellPos < passageColCount - 1; cellPos++) {
                int leftSetId = currentSets[cellPos]; // @step:merge-cells
                int rightSetId = currentSets[cellPos + 1]; // @step:merge-cells
                int wallCol = passageCols.get(cellPos) + 1; // @step:merge-cells

                boolean shouldMerge = leftSetId != rightSetId &&
                    (isLastRow || random.nextBoolean()); // @step:merge-cells

                if (shouldMerge) {
                    grid[passageRow][wallCol] = 0; // @step:merge-cells
                    passagesCarved++;
                    for (int updatePos = 0; updatePos < passageColCount; updatePos++) {
                        if (currentSets[updatePos] == rightSetId) {
                            currentSets[updatePos] = leftSetId;
                        }
                    }
                }
            }

            if (isLastRow) break;

            // Step 3: For each set, carve at least one downward connection
            int nextRow = passageRows.get(passageRowPos + 1);

            // Group cells by set
            Map<Integer, List<Integer>> setGroups = new HashMap<>(); // @step:carve-cell
            for (int cellPos = 0; cellPos < passageColCount; cellPos++) {
                int setId = currentSets[cellPos];
                setGroups.computeIfAbsent(setId, k -> new ArrayList<>()).add(cellPos);
            }

            int[] nextSets = new int[passageColCount];

            for (Map.Entry<Integer, List<Integer>> entry : setGroups.entrySet()) {
                int setId = entry.getKey();
                List<Integer> positions = new ArrayList<>(entry.getValue());
                Collections.shuffle(positions, random);
                int extensionCount = Math.max(1, random.nextInt(positions.size()) + 1);

                for (int extIndex = 0; extIndex < positions.size(); extIndex++) {
                    int cellPos = positions.get(extIndex);
                    int passageCol = passageCols.get(cellPos);
                    int betweenRow = passageRow + 1;

                    if (extIndex < extensionCount) {
                        grid[betweenRow][passageCol] = 0; // @step:carve-cell
                        passagesCarved++;
                        nextSets[cellPos] = setId;
                    } else {
                        nextSets[cellPos] = nextSetId[0]++;
                    }
                }
            }

            // Carve the next row passage cells
            for (int passageCol : passageCols) {
                if (grid[nextRow][passageCol] == 1) {
                    grid[nextRow][passageCol] = 0; // @step:carve-cell
                    passagesCarved++;
                }
            }

            currentSets = nextSets;
        }

        return passagesCarved; // @step:complete
    }
}
