// Product of Array Except Self — O(n) two-pass prefix/suffix product (no division)
#include <vector>

std::vector<int> productExceptSelf(const std::vector<int>& inputArray) {
    int arrayLength = (int)inputArray.size(); // @step:initialize
    if (arrayLength == 0) { // @step:initialize
        return {}; // @step:initialize
    }

    std::vector<int> resultArray(arrayLength, 1); // @step:initialize

    // Left pass: resultArray[index] = product of all elements to the left
    int prefixProduct = 1; // @step:visit
    for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) { // @step:visit
        resultArray[scanIndex] = prefixProduct; // @step:visit
        prefixProduct *= inputArray[scanIndex]; // @step:visit
    }

    // Right pass: multiply each position by the product of all elements to the right
    int suffixProduct = 1; // @step:visit
    for (int scanIndex = arrayLength - 1; scanIndex >= 0; scanIndex--) { // @step:visit
        resultArray[scanIndex] *= suffixProduct; // @step:visit
        suffixProduct *= inputArray[scanIndex]; // @step:visit
    }

    return resultArray; // @step:complete
}
