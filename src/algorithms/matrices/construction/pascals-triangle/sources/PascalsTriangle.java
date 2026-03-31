// Pascal's Triangle Construction
// Builds Pascal's triangle as a 2D matrix with numRows rows.
// Each inner element is the sum of the two elements above it; edges are always 1.
// Time: O(n²) — filling each cell in every row
// Space: O(1) extra (output matrix aside)

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PascalsTriangle {

    public static List<List<Integer>> pascalsTriangle(int numRows) {
        List<List<Integer>> triangle = new ArrayList<>(); // @step:initialize

        for (int rowIdx = 0; rowIdx < numRows; rowIdx++) { // @step:initialize
            Integer[] row = new Integer[rowIdx + 1]; // @step:initialize
            Arrays.fill(row, 0);

            row[0] = 1; // @step:compute-value
            row[rowIdx] = 1; // @step:compute-value

            for (int colIdx = 1; colIdx < rowIdx; colIdx++) {
                List<Integer> above = triangle.get(rowIdx - 1);
                row[colIdx] = above.get(colIdx - 1) + above.get(colIdx); // @step:compute-value
            }

            triangle.add(Arrays.asList(row)); // @step:complete
        }

        return triangle; // @step:complete
    }
}
