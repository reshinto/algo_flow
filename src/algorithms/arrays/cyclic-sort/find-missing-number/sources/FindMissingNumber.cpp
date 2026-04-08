// Find Missing Number — XOR approach: XOR all elements with expected range 0..n, pair cancellations leave the missing number
#include <vector>

int findMissingNumber(const std::vector<int>& inputArray) {
    int arrayLength = (int)inputArray.size(); // @step:initialize
    int currentXor = 0; // @step:initialize

    for (int expectedRange = 0; expectedRange <= arrayLength; expectedRange++) {
        currentXor ^= expectedRange; // @step:compare
    }

    for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
        currentXor ^= inputArray[scanIndex]; // @step:visit
    }

    return currentXor; // @step:complete
}
