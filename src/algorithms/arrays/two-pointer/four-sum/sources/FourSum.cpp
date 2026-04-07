// Four Sum — finds all unique quadruplets summing to target via sorting and two-pointer reduction
#include <vector>
#include <algorithm>

std::vector<std::vector<int>> fourSum(std::vector<int> inputArray, long long target) {
    std::sort(inputArray.begin(), inputArray.end()); // @step:initialize
    int arrayLength = (int)inputArray.size(); // @step:initialize
    std::vector<std::vector<int>> quadruplets; // @step:initialize

    for (int firstIndex = 0; firstIndex < arrayLength - 3; firstIndex++) { // @step:visit
        if (firstIndex > 0 && inputArray[firstIndex] == inputArray[firstIndex - 1]) { // @step:compare
            continue; // @step:compare
        }

        for (int secondIndex = firstIndex + 1; secondIndex < arrayLength - 2; secondIndex++) { // @step:visit
            if (secondIndex > firstIndex + 1 && inputArray[secondIndex] == inputArray[secondIndex - 1]) { // @step:compare
                continue; // @step:compare
            }

            int leftPointer = secondIndex + 1; // @step:visit
            int rightPointer = arrayLength - 1; // @step:visit

            while (leftPointer < rightPointer) { // @step:compare
                long long currentSum = (long long)inputArray[firstIndex] + inputArray[secondIndex]
                    + inputArray[leftPointer] + inputArray[rightPointer]; // @step:compare

                if (currentSum == target) { // @step:compare
                    quadruplets.push_back({inputArray[firstIndex], inputArray[secondIndex],
                                           inputArray[leftPointer], inputArray[rightPointer]}); // @step:visit

                    while (leftPointer < rightPointer && inputArray[leftPointer] == inputArray[leftPointer + 1]) {
                        leftPointer++; // @step:compare
                    }
                    while (leftPointer < rightPointer && inputArray[rightPointer] == inputArray[rightPointer - 1]) {
                        rightPointer--; // @step:compare
                    }
                    leftPointer++; // @step:visit
                    rightPointer--; // @step:visit
                } else if (currentSum < target) {
                    leftPointer++; // @step:visit
                } else {
                    rightPointer--; // @step:visit
                }
            }
        }
    }

    return quadruplets; // @step:complete
}
