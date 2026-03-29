// Pascal's Triangle Row (Tabulation) — build one row using in-place right-to-left updates
public class PascalsTriangleRow {
    public static int[] pascalsTriangleRow(int rowIndex) { // @step:initialize
        int[] dpTable = new int[rowIndex + 1]; // @step:initialize,fill-table
        java.util.Arrays.fill(dpTable, 1); // @step:initialize,fill-table
        // Iterate each row from 2 up to rowIndex, updating right-to-left
        for (int rowNumber = 2; rowNumber <= rowIndex; rowNumber++) { // @step:compute-cell
            for (int columnIndex = rowNumber - 1; columnIndex >= 1; columnIndex--) { // @step:compute-cell
                dpTable[columnIndex] = dpTable[columnIndex] + dpTable[columnIndex - 1]; // @step:compute-cell,read-cache
            }
        }
        return dpTable; // @step:complete
    }
}
