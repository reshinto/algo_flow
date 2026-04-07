// Smooth Sort — Leonardo heap variant of heap sort; adaptive O(n) best case on nearly-sorted data
#include <vector>
#include <algorithm>

static std::vector<int> leonardoNumbers;

void initLeonardo(int limit) {
    leonardoNumbers = {1, 1};
    while (leonardoNumbers.back() < limit) {
        int len = leonardoNumbers.size();
        leonardoNumbers.push_back(leonardoNumbers[len-1] + leonardoNumbers[len-2] + 1);
    }
}

void sift(std::vector<int>& sortedArray, int rootIndex, int order) {
    // @step:build-heap
    int currentRoot = rootIndex;
    int currentOrder = order;

    while (currentOrder >= 2) {
        int rightChild = currentRoot - 1; // @step:compare
        int leftChild = currentRoot - 1 - leonardoNumbers[currentOrder - 1]; // @step:compare

        int largestIndex = currentRoot;
        if (sortedArray[rightChild] > sortedArray[largestIndex]) {
            largestIndex = rightChild; // @step:compare
        }
        if (sortedArray[leftChild] > sortedArray[largestIndex]) {
            largestIndex = leftChild; // @step:compare
        }

        if (largestIndex == currentRoot) break;

        // @step:swap
        std::swap(sortedArray[currentRoot], sortedArray[largestIndex]); // @step:swap

        if (largestIndex == rightChild) {
            currentOrder--;
        } else {
            currentOrder -= 2;
        }
        currentRoot = largestIndex;
    }
}

void trinkle(
    std::vector<int>& sortedArray,
    int rootIndex,
    int order,
    std::vector<int> prevPositions,
    std::vector<int> prevOrders
) {
    // @step:build-heap
    int currentRoot = rootIndex;
    int currentOrder = order;

    while (!prevPositions.empty()) {
        int prevRootIndex = prevPositions.back();
        int prevRootOrder = prevOrders.back();

        if (sortedArray[currentRoot] >= sortedArray[prevRootIndex]) break; // @step:compare

        if (currentOrder >= 2) {
            int rightChild = currentRoot - 1;
            int leftChild = currentRoot - 1 - leonardoNumbers[currentOrder - 1];
            if (sortedArray[prevRootIndex] < sortedArray[rightChild] ||
                sortedArray[prevRootIndex] < sortedArray[leftChild]) {
                break; // @step:compare
            }
        }

        // @step:swap
        std::swap(sortedArray[currentRoot], sortedArray[prevRootIndex]); // @step:swap

        prevPositions.pop_back();
        prevOrders.pop_back();
        currentRoot = prevRootIndex;
        currentOrder = prevRootOrder;
    }

    sift(sortedArray, currentRoot, currentOrder);
}

std::vector<int> smoothSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    if (arrayLength <= 1) return sortedArray; // @step:initialize

    initLeonardo(arrayLength);

    // Build the Leonardo heap forest incrementally.
    std::vector<int> heapPositions;
    std::vector<int> heapOrders;

    for (int buildIndex = 0; buildIndex < arrayLength; buildIndex++) {
        // @step:build-heap
        int rootCount = heapOrders.size();
        if (rootCount >= 2 && heapOrders[rootCount-1] == heapOrders[rootCount-2] + 1) {
            int newOrder = heapOrders[rootCount-1] + 1;
            heapPositions.erase(heapPositions.end()-2, heapPositions.end());
            heapOrders.erase(heapOrders.end()-2, heapOrders.end());
            heapPositions.push_back(buildIndex);
            heapOrders.push_back(newOrder);
        } else if (rootCount >= 1 && heapOrders[rootCount-1] == 1) {
            heapPositions.push_back(buildIndex);
            heapOrders.push_back(0);
        } else {
            heapPositions.push_back(buildIndex);
            heapOrders.push_back(1);
        }

        int lastIndex = heapPositions.size() - 1;
        std::vector<int> prevPos(heapPositions.begin(), heapPositions.begin() + lastIndex);
        std::vector<int> prevOrd(heapOrders.begin(), heapOrders.begin() + lastIndex);
        trinkle(sortedArray, heapPositions[lastIndex], heapOrders[lastIndex], prevPos, prevOrd);
    }

    // Extract phase: shrink the heap forest from the right, exposing sorted elements.
    for (int extractIndex = arrayLength - 1; extractIndex >= 0; extractIndex--) {
        // @step:extract
        int currentOrder = heapOrders.back();
        heapPositions.pop_back();
        heapOrders.pop_back();

        if (currentOrder >= 2) {
            int rightRoot = extractIndex - 1;
            int leftRoot = extractIndex - 1 - leonardoNumbers[currentOrder - 1];
            heapPositions.push_back(leftRoot);
            heapOrders.push_back(currentOrder - 2);
            heapPositions.push_back(rightRoot);
            heapOrders.push_back(currentOrder - 1);

            int lastIndex = heapPositions.size() - 1;
            std::vector<int> prevLeftPos(heapPositions.begin(), heapPositions.begin() + lastIndex - 1);
            std::vector<int> prevLeftOrd(heapOrders.begin(), heapOrders.begin() + lastIndex - 1);
            trinkle(sortedArray, leftRoot, currentOrder - 2, prevLeftPos, prevLeftOrd);
            std::vector<int> prevRightPos(heapPositions.begin(), heapPositions.begin() + lastIndex);
            std::vector<int> prevRightOrd(heapOrders.begin(), heapOrders.begin() + lastIndex);
            trinkle(sortedArray, rightRoot, currentOrder - 1, prevRightPos, prevRightOrd);
        }

        // @step:mark-sorted
    }

    return sortedArray; // @step:complete
}
