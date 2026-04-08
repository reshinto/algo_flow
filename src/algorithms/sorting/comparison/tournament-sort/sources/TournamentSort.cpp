// Tournament Sort — build a tournament tree of comparisons, extract winner, replace and rebuild
#include <vector>
#include <climits>

const int TOURNAMENT_INFINITY = INT_MAX;

std::vector<int> buildTournamentTree(std::vector<int>& leaves) {
    // @step:build-tournament
    int leafCount = leaves.size(); // @step:build-tournament
    int treeSize = 2 * leafCount; // @step:build-tournament
    std::vector<int> tree(treeSize, TOURNAMENT_INFINITY); // @step:build-tournament

    // Place leaf values in second half of tree
    for (int leafIndex = 0; leafIndex < leafCount; leafIndex++) {
        // @step:build-tournament
        tree[leafCount + leafIndex] = leaves[leafIndex]; // @step:build-tournament
    }

    // Build internal nodes (winners) bottom-up
    for (int nodeIndex = leafCount - 1; nodeIndex >= 1; nodeIndex--) {
        // @step:compare
        int leftChild = 2 * nodeIndex; // @step:compare
        int rightChild = 2 * nodeIndex + 1; // @step:compare
        tree[nodeIndex] = tree[leftChild] <= tree[rightChild] ? tree[leftChild] : tree[rightChild]; // @step:compare
    }

    return tree; // @step:build-tournament
}

int extractWinnerAndRebuild(std::vector<int>& tree, int leafCount) {
    // @step:extract-winner
    int winner = tree[1]; // @step:extract-winner

    // Find the leaf position that held the winner and replace with infinity
    int nodeIndex = 1; // @step:extract-winner
    while (nodeIndex < leafCount) {
        // @step:compare
        int leftChild = 2 * nodeIndex; // @step:compare
        int rightChild = 2 * nodeIndex + 1; // @step:compare
        nodeIndex = tree[leftChild] == winner ? leftChild : rightChild; // @step:compare
    }

    tree[nodeIndex] = TOURNAMENT_INFINITY; // @step:extract-winner

    // Rebuild internal nodes from the modified leaf upward
    nodeIndex /= 2; // @step:build-tournament
    while (nodeIndex >= 1) {
        // @step:build-tournament
        int leftChild = 2 * nodeIndex; // @step:build-tournament
        int rightChild = 2 * nodeIndex + 1; // @step:build-tournament
        tree[nodeIndex] = tree[leftChild] <= tree[rightChild] ? tree[leftChild] : tree[rightChild]; // @step:compare
        nodeIndex /= 2; // @step:build-tournament
    }

    return winner; // @step:extract-winner
}

std::vector<int> tournamentSort(std::vector<int> inputArray) {
    // @step:initialize
    int arrayLength = inputArray.size(); // @step:initialize

    if (arrayLength == 0) {
        return {}; // @step:complete
    }

    std::vector<int> leaves = inputArray; // @step:initialize
    std::vector<int> tree = buildTournamentTree(leaves); // @step:build-tournament
    std::vector<int> sortedArray; // @step:extract-winner

    for (int extractIndex = 0; extractIndex < arrayLength; extractIndex++) {
        // @step:extract-winner
        int winner = extractWinnerAndRebuild(tree, leaves.size()); // @step:extract-winner
        sortedArray.push_back(winner); // @step:mark-sorted
    }

    // @step:mark-sorted
    return sortedArray; // @step:complete
}
