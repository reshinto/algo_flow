// Fibonacci Search — use Fibonacci numbers to divide the array and narrow the search range
#include <vector>
#include <algorithm>

int fibonacciSearch(const std::vector<int>& sortedArray, int targetValue) {
    // @step:initialize
    int arrayLength = static_cast<int>(sortedArray.size()); // @step:initialize
    if (arrayLength == 0) return -1; // @step:initialize

    int fibM2 = 0; // @step:initialize — Fibonacci(k-2)
    int fibM1 = 1; // @step:initialize — Fibonacci(k-1)
    int fibM = fibM1 + fibM2; // @step:initialize — Fibonacci(k)

    // Find the smallest Fibonacci number >= arrayLength
    while (fibM < arrayLength) {
        // @step:initialize
        fibM2 = fibM1; // @step:initialize
        fibM1 = fibM; // @step:initialize
        fibM = fibM1 + fibM2; // @step:initialize
    }

    int offset = -1; // @step:initialize

    while (fibM > 1) {
        int compareIndex = std::min(offset + fibM2, arrayLength - 1); // @step:compare
        int compareValue = sortedArray[compareIndex]; // @step:compare

        if (compareValue < targetValue) {
            // @step:eliminate
            // Target is in the right portion — advance offset
            fibM = fibM1; // @step:eliminate
            fibM1 = fibM2; // @step:eliminate
            fibM2 = fibM - fibM1; // @step:eliminate
            offset = compareIndex; // @step:eliminate
        } else if (compareValue > targetValue) {
            // @step:eliminate
            // Target is in the left portion — shrink range
            fibM = fibM2; // @step:eliminate
            fibM1 = fibM1 - fibM2; // @step:eliminate
            fibM2 = fibM - fibM1; // @step:eliminate
        } else {
            // @step:found
            return compareIndex; // @step:found
        }
    }

    // Check the remaining element
    if (fibM1 == 1 && offset + 1 < arrayLength && sortedArray[offset + 1] == targetValue) {
        // @step:compare,found
        return offset + 1; // @step:found
    }

    return -1; // @step:complete
}
