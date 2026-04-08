// Move Zeros to End — O(n) two-pointer: write pointer tracks next write position, read pointer scans
#include <vector>
#include <algorithm>

std::vector<int> moveZeros(std::vector<int> inputArray) {
    std::vector<int> result = inputArray;
    int writePointer = 0; // @step:initialize

    for (int readPointer = 0; readPointer < (int)result.size(); readPointer++) {
        int currentElement = result[readPointer]; // @step:compare
        if (currentElement != 0) { // @step:compare
            std::swap(result[writePointer], result[readPointer]); // @step:swap
            writePointer++; // @step:visit
        }
    }

    return result; // @step:complete
}
