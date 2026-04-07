// Next Greater Element — monotonic stack: for each element, find the next strictly greater element to its right
#include <vector>
#include <stack>

std::vector<int> nextGreaterElement(const std::vector<int>& inputArray) {
    int arrayLength = (int)inputArray.size();
    std::vector<int> resultArray(arrayLength, -1); // @step:initialize
    std::stack<int> pendingStack; // @step:initialize

    for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
        int currentElement = inputArray[scanIndex]; // @step:visit

        while (!pendingStack.empty()) {
            int stackTop = pendingStack.top(); // @step:compare
            if (inputArray[stackTop] < currentElement) { // @step:compare
                pendingStack.pop(); // @step:compare
                resultArray[stackTop] = currentElement; // @step:compare
            } else {
                break;
            }
        }

        pendingStack.push(scanIndex); // @step:visit
    }

    return resultArray; // @step:complete
}
