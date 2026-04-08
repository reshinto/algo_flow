// Linear Search — scan left to right comparing each element with the target
#include <vector>

int linearSearch(const std::vector<int>& array, int targetValue) {
    // @step:initialize
    for (int currentIndex = 0; currentIndex < static_cast<int>(array.size()); currentIndex++) {
        // @step:visit
        int currentValue = array[currentIndex]; // @step:compare
        if (currentValue == targetValue) {
            // @step:compare,found
            return currentIndex; // @step:found
        }
    }

    return -1; // @step:complete
}
