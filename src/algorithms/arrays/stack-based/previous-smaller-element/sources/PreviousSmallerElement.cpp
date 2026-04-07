// Previous Smaller Element — monotonic stack: for each element, find the nearest element to the LEFT that is strictly smaller, or -1
#include <vector>
#include <stack>

std::vector<int> previousSmallerElement(const std::vector<int>& inputArray) {
    int arrayLength = (int)inputArray.size();
    std::vector<int> resultArray(arrayLength, -1); // @step:initialize
    std::stack<int> increasingStack; // @step:initialize

    for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
        int currentElement = inputArray[scanIndex]; // @step:visit

        // Pop elements from the stack that are >= currentElement (they cannot be the answer)
        while (!increasingStack.empty()) {
            int stackTop = increasingStack.top(); // @step:compare
            if (inputArray[stackTop] >= currentElement) { // @step:compare
                increasingStack.pop(); // @step:compare
            } else {
                break;
            }
        }

        // The new stack top (if any) is the nearest smaller element to the left
        if (!increasingStack.empty()) {
            int nearestSmallerIndex = increasingStack.top(); // @step:visit
            resultArray[scanIndex] = inputArray[nearestSmallerIndex]; // @step:visit
        }

        increasingStack.push(scanIndex); // @step:visit
    }

    return resultArray; // @step:complete
}
