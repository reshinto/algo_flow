// Count Bits tabulation — dp[i] = number of 1-bits in binary representation of i

#include <iostream>
#include <vector>

std::vector<int> countBits(int targetNumber) {
    // @step:initialize
    std::vector<int> dpTable(targetNumber + 1, 0); // @step:initialize,fill-table
    // dp[0] = 0: zero has no set bits
    for (int bitIndex = 1; bitIndex <= targetNumber; bitIndex++) {
        // @step:compute-cell
        // Half the number shares all bits except possibly the LSB
        dpTable[bitIndex] = dpTable[bitIndex >> 1] + (bitIndex & 1); // @step:compute-cell,read-cache
    }
    return dpTable; // @step:complete
}

#ifndef TESTING
int main() {
    int targetNumber = 5;
    std::vector<int> result = countBits(targetNumber);
    std::cout << "Count bits up to " << targetNumber << ": [";
    for (int idx = 0; idx < (int)result.size(); idx++) {
        if (idx > 0) std::cout << ", ";
        std::cout << result[idx];
    }
    std::cout << "]" << std::endl;
    return 0;
}
#endif
