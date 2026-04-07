// Unique Paths (Tabulation) — count distinct paths from top-left to bottom-right in a rows×columns grid

#include <iostream>
#include <vector>

int uniquePaths(int rows, int columns) {
    // @step:initialize
    std::vector<int> dpTable(columns, 1); // @step:initialize,fill-table
    // First row is all 1s — only one way to reach any cell by moving right only
    for (int rowIndex = 1; rowIndex < rows; rowIndex++) {
        // @step:compute-cell
        for (int columnIndex = 1; columnIndex < columns; columnIndex++) {
            // @step:compute-cell
            dpTable[columnIndex] += dpTable[columnIndex - 1]; // @step:compute-cell,read-cache
        }
    }
    return dpTable[columns - 1]; // @step:complete
}

int main() {
    int rows = 3, columns = 7;
    int result = uniquePaths(rows, columns);
    std::cout << "Unique paths in " << rows << "x" << columns << " grid: " << result << std::endl;
    return 0;
}
