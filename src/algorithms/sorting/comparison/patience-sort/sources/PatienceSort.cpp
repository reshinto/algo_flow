// Patience Sort — place cards into piles using patience game rules, then merge piles
#include <vector>
#include <climits>

int findPileIndex(std::vector<std::vector<int>>& piles, int cardValue) {
    // @step:compare
    // Binary search for the leftmost pile whose top is >= cardValue
    int leftBound = 0; // @step:compare
    int rightBound = piles.size(); // @step:compare

    while (leftBound < rightBound) {
        // @step:compare
        int midIndex = (leftBound + rightBound) / 2; // @step:compare
        if (piles[midIndex].back() < cardValue) {
            // @step:compare
            leftBound = midIndex + 1; // @step:compare
        } else {
            rightBound = midIndex; // @step:compare
        }
    }

    return leftBound; // @step:compare
}

std::vector<int> mergePiles(std::vector<std::vector<int>>& piles) {
    // @step:merge-piles
    std::vector<int> sortedOutput; // @step:merge-piles

    auto anyNonEmpty = [&]() {
        for (auto& pile : piles) if (!pile.empty()) return true;
        return false;
    };

    while (anyNonEmpty()) {
        // @step:merge-piles
        int minimumValue = INT_MAX; // @step:compare
        int minimumPileIndex = 0; // @step:compare

        for (int pileIndex = 0; pileIndex < (int)piles.size(); pileIndex++) {
            // @step:compare
            if (!piles[pileIndex].empty()) {
                int pileTop = piles[pileIndex].back(); // @step:compare
                if (pileTop < minimumValue) {
                    // @step:compare
                    minimumValue = pileTop; // @step:compare
                    minimumPileIndex = pileIndex; // @step:compare
                }
            }
        }

        sortedOutput.push_back(piles[minimumPileIndex].back()); // @step:swap
        piles[minimumPileIndex].pop_back();
        if (piles[minimumPileIndex].empty()) {
            piles.erase(piles.begin() + minimumPileIndex); // @step:merge-piles
        }
    }

    return sortedOutput; // @step:merge-piles
}

std::vector<int> patienceSort(std::vector<int> inputArray) {
    // @step:initialize
    int arrayLength = inputArray.size(); // @step:initialize

    if (arrayLength == 0) {
        return {}; // @step:complete
    }

    std::vector<std::vector<int>> piles; // @step:initialize

    // Place each card into the leftmost valid pile
    for (int cardIndex = 0; cardIndex < arrayLength; cardIndex++) {
        // @step:place-card
        int cardValue = inputArray[cardIndex]; // @step:place-card
        int targetPileIndex = findPileIndex(piles, cardValue); // @step:compare

        if (targetPileIndex == (int)piles.size()) {
            piles.push_back({cardValue}); // @step:place-card
        } else {
            piles[targetPileIndex].push_back(cardValue); // @step:place-card
        }
    }

    // Merge all piles into sorted output
    std::vector<int> sortedArray = mergePiles(piles); // @step:merge-piles

    // @step:mark-sorted
    return sortedArray; // @step:complete
}
