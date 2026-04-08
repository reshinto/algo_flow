// Floyd's Cycle Detection — tortoise and hare: treat array as linked structure, detect cycle and find entrance
#include <vector>
#include <utility>

std::pair<bool, int> floydCycleDetection(const std::vector<int>& inputArray) {
    if (inputArray.empty()) {
        // @step:initialize
        return {false, -1}; // @step:initialize
    }

    int tortoise = 0; // @step:initialize
    int hare = 0; // @step:initialize

    // Phase 1: detect meeting point inside the cycle
    int iterationCount = 0;
    int maxIterations = (int)inputArray.size() * 2;
    do {
        if (tortoise < 0 || tortoise >= (int)inputArray.size()) break;
        if (hare < 0 || hare >= (int)inputArray.size()) break;
        tortoise = inputArray[tortoise]; // @step:visit
        int hareNext = inputArray[hare];
        if (hareNext < 0 || hareNext >= (int)inputArray.size()) break;
        hare = inputArray[hareNext]; // @step:visit
        iterationCount++;
        if (iterationCount > maxIterations) break;
    } while (tortoise != hare); // @step:compare

    // Phase 2: find cycle entrance — reset tortoise to start, hare stays at meeting point
    tortoise = 0; // @step:visit
    while (tortoise != hare) { // @step:compare
        tortoise = inputArray[tortoise]; // @step:visit
        hare = inputArray[hare]; // @step:visit
    }

    return {true, tortoise}; // @step:complete
}
