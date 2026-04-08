// Pascal's Triangle Row (Tabulation) — build one row using in-place right-to-left updates

#include <iostream>
#include <vector>

std::vector<int> pascalsTriangleRow(int rowIndex) {
    // @step:initialize
    std::vector<int> dpTable(rowIndex + 1, 1); // @step:initialize,fill-table
    // Iterate each row from 2 up to rowIndex, updating right-to-left
    for (int rowNumber = 2; rowNumber <= rowIndex; rowNumber++) {
        // @step:compute-cell
        for (int columnIndex = rowNumber - 1; columnIndex >= 1; columnIndex--) {
            // @step:compute-cell,read-cache
            dpTable[columnIndex] += dpTable[columnIndex - 1]; // @step:compute-cell,read-cache
        }
    }
    return dpTable; // @step:complete
}

#ifndef TESTING
int main() {
    int rowIndex = 4;
    std::vector<int> result = pascalsTriangleRow(rowIndex);
    std::cout << "Pascal's triangle row " << rowIndex << ": [";
    for (int idx = 0; idx < (int)result.size(); idx++) {
        if (idx > 0) std::cout << ", ";
        std::cout << result[idx];
    }
    std::cout << "]" << std::endl;
    return 0;
}
#endif
