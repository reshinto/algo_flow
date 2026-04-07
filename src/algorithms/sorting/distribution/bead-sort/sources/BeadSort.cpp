// Bead Sort (Gravity Sort) — represent numbers as rows of beads, let gravity pull beads down column by column
#include <vector>
#include <algorithm>

std::vector<int> beadSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sourceArray = inputArray; // @step:initialize
    int arrayLength = sourceArray.size(); // @step:initialize

    if (arrayLength <= 1) {
        return sourceArray; // @step:complete
    }

    // Offset negative values so all are non-negative integers
    int minValue = *std::min_element(sourceArray.begin(), sourceArray.end()); // @step:initialize
    int offset = minValue < 0 ? -minValue : 0; // @step:initialize
    std::vector<int> shiftedArray(arrayLength);
    for (int idx = 0; idx < arrayLength; idx++) {
        shiftedArray[idx] = sourceArray[idx] + offset; // @step:initialize
    }
    int maxValue = *std::max_element(shiftedArray.begin(), shiftedArray.end()); // @step:initialize

    if (maxValue == 0) {
        return sourceArray; // @step:complete
    }

    // Represent each number as a row of beads on an abacus
    // grid[row][col] = 1 means a bead is present, 0 means empty
    std::vector<std::vector<int>> grid(arrayLength, std::vector<int>(maxValue, 0));
    for (int rowIndex = 0; rowIndex < arrayLength; rowIndex++) {
        for (int colIndex = 0; colIndex < shiftedArray[rowIndex]; colIndex++) {
            grid[rowIndex][colIndex] = 1;
        }
    } // @step:initialize

    // Gravity drop — for each column, count beads and stack them at the bottom
    for (int colIndex = 0; colIndex < maxValue; colIndex++) {
        // @step:drop-beads,compare
        int beadCount = 0; // @step:drop-beads,compare
        for (int rowIndex = 0; rowIndex < arrayLength; rowIndex++) {
            // @step:drop-beads,compare
            beadCount += grid[rowIndex][colIndex]; // @step:drop-beads,compare
            grid[rowIndex][colIndex] = 0; // @step:drop-beads,compare
        }
        // Stack beads at the bottom of this column (gravity effect)
        for (int rowIndex = arrayLength - beadCount; rowIndex < arrayLength; rowIndex++) {
            // @step:drop-beads
            grid[rowIndex][colIndex] = 1; // @step:drop-beads
        }
    }

    // Read bead counts from each row — each row's bead count is the sorted value
    for (int rowIndex = 0; rowIndex < arrayLength; rowIndex++) {
        // @step:mark-sorted
        int rowBeadCount = 0; // @step:mark-sorted
        for (int colIndex = 0; colIndex < maxValue; colIndex++) {
            // @step:mark-sorted
            rowBeadCount += grid[rowIndex][colIndex]; // @step:mark-sorted
        }
        sourceArray[rowIndex] = rowBeadCount - offset; // @step:mark-sorted
    }

    return sourceArray; // @step:complete
}
