// Largest Rectangle in Histogram — O(n) monotonic stack approach
#include <vector>
#include <stack>
#include <tuple>

std::tuple<int, int, int, int> largestRectangleHistogram(const std::vector<int>& heights) {
    int arrayLength = (int)heights.size();
    if (arrayLength == 0) {
        // @step:initialize
        return {0, -1, -1, 0}; // @step:initialize
    }

    std::stack<int> indexStack; // @step:initialize
    int maxArea = 0; // @step:initialize
    int bestLeft = 0; // @step:initialize
    int bestRight = 0; // @step:initialize
    int bestHeight = 0; // @step:initialize

    for (int currentIndex = 0; currentIndex <= arrayLength; currentIndex++) {
        int currentHeight = (currentIndex == arrayLength) ? 0 : heights[currentIndex]; // @step:compare

        while (!indexStack.empty() && currentHeight < heights[indexStack.top()]) { // @step:compare
            int poppedIndex = indexStack.top(); indexStack.pop(); // @step:visit
            int poppedHeight = heights[poppedIndex]; // @step:visit
            int leftBoundary = indexStack.empty() ? 0 : indexStack.top() + 1; // @step:visit
            int width = currentIndex - leftBoundary; // @step:visit
            int area = poppedHeight * width; // @step:visit

            if (area > maxArea) { // @step:compare
                maxArea = area; // @step:visit
                bestLeft = leftBoundary; // @step:visit
                bestRight = currentIndex - 1; // @step:visit
                bestHeight = poppedHeight; // @step:visit
            }
        }

        indexStack.push(currentIndex); // @step:visit
    }

    return {maxArea, bestLeft, bestRight, bestHeight}; // @step:complete
}
