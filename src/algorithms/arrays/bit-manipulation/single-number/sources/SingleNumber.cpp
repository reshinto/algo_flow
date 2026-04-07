// Single Number (XOR) — every element appears twice except one; XOR cancels all pairs, leaving the unique element
#include <vector>

int singleNumber(const std::vector<int>& inputArray) {
    int runningXor = 0; // @step:initialize

    for (int scanIndex = 0; scanIndex < (int)inputArray.size(); scanIndex++) {
        runningXor ^= inputArray[scanIndex]; // @step:visit
    }

    return runningXor; // @step:complete
}
