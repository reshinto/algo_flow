// Perfect Squares tabulation — find minimum number of perfect squares summing to n

#include <iostream>
#include <vector>
#include <climits>

int perfectSquares(int targetNumber) {
    // @step:initialize
    std::vector<int> dpTable(targetNumber + 1, INT_MAX); // @step:initialize,fill-table
    dpTable[0] = 0; // @step:fill-table
    // Fill each cell with the minimum number of perfect squares needed
    for (int cellIndex = 1; cellIndex <= targetNumber; cellIndex++) {
        // @step:compute-cell
        for (int squareRoot = 1; squareRoot * squareRoot <= cellIndex; squareRoot++) {
            // @step:read-cache
            int prevIndex = cellIndex - squareRoot * squareRoot; // @step:read-cache
            if (dpTable[prevIndex] != INT_MAX && dpTable[prevIndex] + 1 < dpTable[cellIndex]) {
                // @step:compute-cell
                dpTable[cellIndex] = dpTable[prevIndex] + 1; // @step:compute-cell
            }
        }
    }
    return dpTable[targetNumber]; // @step:complete
}

int main() {
    int targetNumber = 12;
    int result = perfectSquares(targetNumber);
    std::cout << "Perfect squares for " << targetNumber << ": " << result << std::endl;
    return 0;
}
