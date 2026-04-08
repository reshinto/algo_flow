// Two Sum (Sorted Array) — O(n) two-pointer: converge from both ends toward the target sum
#include <vector>
#include <tuple>

std::tuple<bool, int, int> twoPointerSum(const std::vector<int>& sortedArray, int target) {
    int leftPointer = 0; // @step:initialize
    int rightPointer = (int)sortedArray.size() - 1; // @step:initialize

    while (leftPointer < rightPointer) {
        int currentSum = sortedArray[leftPointer] + sortedArray[rightPointer]; // @step:visit

        if (currentSum == target) { // @step:compare
            return {true, leftPointer, rightPointer}; // @step:complete
        } else if (currentSum < target) { // @step:compare
            leftPointer++; // @step:visit
        } else {
            rightPointer--; // @step:visit
        }
    }

    return {false, -1, -1}; // @step:complete
}
