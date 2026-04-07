// Dutch National Flag — O(n) 3-way partition using three pointers (low, mid, high)
#include <vector>
#include <algorithm>

std::vector<int> dutchNationalFlag(std::vector<int> inputArray) {
    std::vector<int> result = inputArray;
    int lowPointer = 0; // @step:initialize
    int midPointer = 0; // @step:initialize
    int highPointer = (int)result.size() - 1; // @step:initialize

    while (midPointer <= highPointer) {
        int currentValue = result[midPointer]; // @step:compare

        if (currentValue == 0) { // @step:compare
            std::swap(result[lowPointer], result[midPointer]); // @step:swap
            lowPointer++; // @step:visit
            midPointer++; // @step:visit
        } else if (currentValue == 1) { // @step:compare
            midPointer++; // @step:visit
        } else {
            std::swap(result[midPointer], result[highPointer]); // @step:swap
            highPointer--; // @step:visit
        }
    }

    return result; // @step:complete
}
