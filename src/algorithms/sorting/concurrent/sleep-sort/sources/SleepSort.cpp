// Sleep Sort — simulated: each element's "delay" is its value, smaller values wake up first
#include <vector>
#include <algorithm>

std::vector<int> sleepSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> originalArray = inputArray; // @step:initialize
    int arrayLength = originalArray.size(); // @step:initialize

    // Simulate scheduling: sort elements by value (ascending delay order)
    // In real sleep sort, each element schedules itself with a timer based on its value
    // and outputs when its timer fires; smaller values fire first
    std::vector<int> scheduledElements = originalArray;
    std::sort(scheduledElements.begin(), scheduledElements.end()); // @step:schedule

    std::vector<int> outputArray; // @step:schedule

    // Elements "wake up" in order of their value (their simulated delay)
    for (int wakeIndex = 0; wakeIndex < arrayLength; wakeIndex++) {
        // @step:wake-up
        int wakingValue = scheduledElements[wakeIndex]; // @step:wake-up

        // Compare with next sleeping element to show scheduling relationship
        if (wakeIndex + 1 < arrayLength) {
            // @step:compare
            int nextSleeping = scheduledElements[wakeIndex + 1]; // @step:compare — next element still sleeping
            (void)nextSleeping;
        }

        outputArray.push_back(wakingValue); // @step:swap
        // @step:mark-sorted
    }

    return outputArray; // @step:complete
}
