// Circle Sort — recursively compare elements from outer edges toward center, repeat until no swaps
#include <vector>
#include <algorithm>

bool circleSortPass(std::vector<int>& sortedArray, int leftIndex, int rightIndex) {
    if (leftIndex >= rightIndex) {
        return false;
    }

    bool swapped = false;
    int low = leftIndex;
    int high = rightIndex;

    while (low < high) {
        // @step:compare
        if (sortedArray[low] > sortedArray[high]) {
            // @step:swap
            std::swap(sortedArray[low], sortedArray[high]); // @step:swap
            swapped = true;
        }
        low++;
        high--;
    }

    // If the midpoint element is reached (odd-length segment), compare it with one above
    if (low == high) {
        if (sortedArray[low] > sortedArray[high + 1]) {
            // @step:swap
            std::swap(sortedArray[low], sortedArray[high + 1]); // @step:swap
            swapped = true;
        }
    }

    int midpoint = (leftIndex + rightIndex) / 2;
    bool leftSwapped = circleSortPass(sortedArray, leftIndex, midpoint);
    bool rightSwapped = circleSortPass(sortedArray, midpoint + 1, rightIndex);

    return swapped || leftSwapped || rightSwapped;
}

std::vector<int> circleSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    // Repeat full passes until no swaps occur
    bool swapped = true;
    while (swapped) {
        swapped = circleSortPass(sortedArray, 0, arrayLength - 1);
    }

    return sortedArray; // @step:complete
}
