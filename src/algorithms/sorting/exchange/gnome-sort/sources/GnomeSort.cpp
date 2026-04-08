// Gnome Sort — move forward if in order, backward (swapping) if not
#include <vector>
#include <algorithm>

std::vector<int> gnomeSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize
    int position = 0; // @step:initialize

    while (position < arrayLength) {
        if (position == 0) {
            // @step:move-forward
            position++; // @step:move-forward
        } else {
            // @step:compare
            if (sortedArray[position] >= sortedArray[position - 1]) {
                // Elements are in order — move forward
                // @step:move-forward
                position++; // @step:move-forward
            } else {
                // Elements are out of order — swap and step back
                // @step:swap
                std::swap(sortedArray[position], sortedArray[position - 1]); // @step:swap
                position--; // @step:swap
            }
        }
    }

    // All elements are in their sorted positions
    // @step:mark-sorted

    return sortedArray; // @step:complete
}
