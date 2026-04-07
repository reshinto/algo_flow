// Cyclic Sort — O(n) sort for arrays containing values 1..n by placing each at index value-1
#include <vector>
#include <algorithm>

std::vector<int> cyclicSort(std::vector<int> inputArray) {
    std::vector<int> result = inputArray; // @step:initialize
    int currentIndex = 0; // @step:initialize

    while (currentIndex < (int)result.size()) {
        int currentValue = result[currentIndex]; // @step:compare
        int correctIndex = currentValue - 1; // @step:compare

        if (correctIndex >= 0
            && correctIndex < (int)result.size()
            && correctIndex != currentIndex
            && result[correctIndex] != currentValue) {
            // @step:compare
            std::swap(result[correctIndex], result[currentIndex]); // @step:swap
        } else {
            currentIndex++; // @step:visit
        }
    }

    return result; // @step:complete
}
