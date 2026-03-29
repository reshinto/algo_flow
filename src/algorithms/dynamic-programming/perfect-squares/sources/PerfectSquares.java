// Perfect Squares tabulation — find minimum number of perfect squares summing to n
public class PerfectSquares {
    public static int perfectSquares(int targetNumber) { // @step:initialize
        int[] dpTable = new int[targetNumber + 1]; // @step:initialize,fill-table
        java.util.Arrays.fill(dpTable, Integer.MAX_VALUE); // @step:initialize,fill-table
        dpTable[0] = 0; // @step:fill-table
        // Fill each cell with the minimum number of perfect squares needed
        for (int cellIndex = 1; cellIndex <= targetNumber; cellIndex++) { // @step:compute-cell
            for (int squareRoot = 1; squareRoot * squareRoot <= cellIndex; squareRoot++) { // @step:read-cache
                int prevIndex = cellIndex - squareRoot * squareRoot; // @step:read-cache
                if (dpTable[prevIndex] != Integer.MAX_VALUE && dpTable[prevIndex] + 1 < dpTable[cellIndex]) { // @step:compute-cell
                    dpTable[cellIndex] = dpTable[prevIndex] + 1; // @step:compute-cell
                }
            }
        }
        return dpTable[targetNumber]; // @step:complete
    }
}
