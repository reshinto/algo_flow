// Block Sort (WikiSort) — in-place stable merge sort using rotation-based merging without extra memory
#include <vector>
#include <algorithm>

void reverseSegment(std::vector<int>& sortedArray, int startIndex, int endIndex) {
    // @step:rotate
    int low = startIndex;
    int high = endIndex;
    while (low < high) {
        // @step:swap
        std::swap(sortedArray[low], sortedArray[high]); // @step:swap
        low++;
        high--;
    }
}

void rotateLeft(std::vector<int>& sortedArray, int leftStart, int midPoint, int rightEnd) {
    // @step:rotate
    reverseSegment(sortedArray, leftStart, midPoint - 1);
    reverseSegment(sortedArray, midPoint, rightEnd);
    reverseSegment(sortedArray, leftStart, rightEnd);
}

void mergeInPlace(std::vector<int>& sortedArray, int runStart, int runMid, int runEnd) {
    // @step:merge
    if (runStart >= runMid || runMid > runEnd) return; // @step:merge

    int leftPointer = runStart;
    int rightPointer = runMid;

    while (leftPointer < rightPointer && rightPointer <= runEnd) {
        // @step:compare
        if (sortedArray[leftPointer] <= sortedArray[rightPointer]) {
            // @step:compare
            leftPointer++; // Left element already in correct position
        } else {
            // Find how far to rotate
            int insertionPoint = rightPointer;
            while (insertionPoint <= runEnd && sortedArray[insertionPoint] < sortedArray[leftPointer]) {
                // @step:compare
                insertionPoint++;
            }

            // Rotate the segment to bring right-run elements into position
            int rightSegmentLength = insertionPoint - rightPointer;
            rotateLeft(sortedArray, leftPointer, rightPointer, insertionPoint - 1); // @step:rotate

            leftPointer += rightSegmentLength;
            rightPointer = insertionPoint;
        }
    }
}

std::vector<int> blockSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    if (arrayLength <= 1) return sortedArray; // @step:initialize

    // Find natural sorted runs in the array
    std::vector<std::pair<int,int>> runs;
    int runStart = 0;

    for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
        // @step:find-runs
        if (sortedArray[scanIndex] < sortedArray[scanIndex - 1]) {
            // @step:compare
            runs.push_back({runStart, scanIndex - 1}); // @step:find-runs
            runStart = scanIndex;
        }
    }
    runs.push_back({runStart, arrayLength - 1}); // @step:find-runs

    // Merge adjacent runs iteratively (bottom-up merge sort style)
    while (runs.size() > 1) {
        // @step:merge
        std::vector<std::pair<int,int>> mergedRuns;

        for (int runIndex = 0; runIndex < (int)runs.size(); runIndex += 2) {
            if (runIndex + 1 < (int)runs.size()) {
                auto leftRun = runs[runIndex];
                auto rightRun = runs[runIndex + 1];

                mergeInPlace(sortedArray, leftRun.first, rightRun.first, rightRun.second); // @step:merge

                mergedRuns.push_back({leftRun.first, rightRun.second});
            } else {
                mergedRuns.push_back(runs[runIndex]);
            }
        }

        runs = mergedRuns;
    }

    // Mark all elements as sorted
    for (int sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
        // @step:mark-sorted
    }

    return sortedArray; // @step:complete
}
