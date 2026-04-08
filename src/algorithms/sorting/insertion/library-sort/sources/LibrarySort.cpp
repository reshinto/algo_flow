// Library Sort (Gapped Insertion Sort) — insert into a gapped array, rebalance when gaps fill
#include <vector>
#include <algorithm>
#include <optional>

std::vector<int> librarySort(std::vector<int> inputArray) {
    // @step:initialize
    int arrayLength = inputArray.size(); // @step:initialize
    if (arrayLength <= 1) return inputArray; // @step:initialize

    // Use a gap factor: allocate extra space for gaps between elements
    const int gapFactor = 2;
    int gappedSize = arrayLength * gapFactor + 1; // @step:initialize
    std::vector<std::optional<int>> gappedArray(gappedSize, std::nullopt); // @step:initialize
    int filledCount = 0; // @step:initialize

    // Place the first element at the center of the gapped array
    int centerPosition = gappedSize / 2; // @step:initialize
    gappedArray[centerPosition] = inputArray[0]; // @step:initialize
    filledCount = 1; // @step:initialize

    for (int outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
        int currentElement = inputArray[outerIndex]; // @step:find-position

        // Collect sorted filled values to binary search among them
        std::vector<int> filledValues; // @step:find-position
        std::vector<int> filledPositions; // @step:find-position
        for (int scanIndex = 0; scanIndex < gappedSize; scanIndex++) {
            // @step:find-position
            if (gappedArray[scanIndex].has_value()) {
                filledValues.push_back(gappedArray[scanIndex].value()); // @step:find-position
                filledPositions.push_back(scanIndex); // @step:find-position
            }
        }

        // Binary search in filled values to find insertion rank
        int searchLeft = 0; // @step:compare
        int searchRight = filledValues.size() - 1; // @step:compare
        int insertRank = filledValues.size(); // @step:compare

        while (searchLeft <= searchRight) {
            // @step:compare
            int midRank = (searchLeft + searchRight) / 2; // @step:compare
            if (currentElement < filledValues[midRank]) {
                // @step:compare
                insertRank = midRank; // @step:compare
                searchRight = midRank - 1; // @step:compare
            } else {
                searchLeft = midRank + 1; // @step:compare
            }
        }

        // Determine insertion position in the gapped array
        int insertPosition; // @step:swap
        if (insertRank == 0) {
            // @step:swap
            insertPosition = filledPositions[0]; // @step:swap
        } else if (insertRank >= (int)filledPositions.size()) {
            insertPosition = filledPositions[filledPositions.size() - 1] + 1; // @step:swap
        } else {
            // Insert between rank-1 and rank — pick the position after the rank-1 element
            insertPosition = filledPositions[insertRank - 1] + 1; // @step:swap
        }

        // Clamp to valid range
        if (insertPosition >= gappedSize) insertPosition = gappedSize - 1; // @step:swap

        // Find a gap near the insertion position and insert
        // Search right for a nullopt gap
        int rightSearch = insertPosition; // @step:swap
        while (rightSearch < gappedSize && gappedArray[rightSearch].has_value()) rightSearch++; // @step:swap

        if (rightSearch < gappedSize) {
            // Shift elements right to open the gap at insertPosition
            for (int shiftPos = rightSearch; shiftPos > insertPosition; shiftPos--) {
                // @step:swap
                gappedArray[shiftPos] = gappedArray[shiftPos - 1]; // @step:swap
            }
            gappedArray[insertPosition] = currentElement; // @step:swap
        } else {
            // No gap to the right — search left
            int leftSearch = insertPosition - 1; // @step:swap
            while (leftSearch >= 0 && gappedArray[leftSearch].has_value()) leftSearch--; // @step:swap
            if (leftSearch >= 0) {
                for (int shiftPos = leftSearch; shiftPos < insertPosition - 1; shiftPos++) {
                    // @step:swap
                    gappedArray[shiftPos] = gappedArray[shiftPos + 1]; // @step:swap
                }
                gappedArray[insertPosition - 1] = currentElement; // @step:swap
            }
        }
        filledCount++; // @step:swap

        // Rebalance (redistribute with gaps) if the array is more than half full
        if (filledCount >= gappedSize / 2) {
            // @step:rebalance
            std::vector<int> filled;
            for (auto& val : gappedArray) {
                if (val.has_value()) filled.push_back(val.value()); // @step:rebalance
            }
            std::fill(gappedArray.begin(), gappedArray.end(), std::nullopt); // @step:rebalance
            int spacing = gappedSize / (filled.size() + 1); // @step:rebalance
            for (int rebalanceIndex = 0; rebalanceIndex < (int)filled.size(); rebalanceIndex++) {
                // @step:rebalance
                gappedArray[(rebalanceIndex + 1) * spacing] = filled[rebalanceIndex]; // @step:rebalance
            }
        }

        // @step:mark-sorted
    }

    // Collect the result in order, filtering out nullopts
    std::vector<int> resultArray; // @step:complete
    for (auto& val : gappedArray) {
        if (val.has_value()) resultArray.push_back(val.value()); // @step:complete
    }
    return resultArray; // @step:complete
}
