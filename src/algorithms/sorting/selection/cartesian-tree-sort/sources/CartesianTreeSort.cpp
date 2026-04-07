// Cartesian Tree Sort — build a min-heap Cartesian tree, then repeatedly extract the minimum root
#include <vector>
#include <memory>

struct CartesianNode {
    int value;
    int originalIndex;
    std::shared_ptr<CartesianNode> leftChild;
    std::shared_ptr<CartesianNode> rightChild;

    CartesianNode(int val, int idx) : value(val), originalIndex(idx), leftChild(nullptr), rightChild(nullptr) {}
};

std::shared_ptr<CartesianNode> mergeTrees(
    std::shared_ptr<CartesianNode> leftTree,
    std::shared_ptr<CartesianNode> rightTree
) {
    if (!leftTree) return rightTree; // @step:extract
    if (!rightTree) return leftTree; // @step:extract

    if (leftTree->value <= rightTree->value) {
        // @step:compare
        leftTree->rightChild = mergeTrees(leftTree->rightChild, rightTree); // @step:extract
        return leftTree; // @step:extract
    } else {
        rightTree->leftChild = mergeTrees(leftTree, rightTree->leftChild); // @step:extract
        return rightTree; // @step:extract
    }
}

std::vector<int> cartesianTreeSort(std::vector<int> inputArray) {
    // @step:initialize
    int arrayLength = inputArray.size(); // @step:initialize
    if (arrayLength == 0) return {}; // @step:initialize

    // Build the Cartesian tree using a stack-based O(n) construction
    // @step:build-tree
    std::vector<std::shared_ptr<CartesianNode>> nodeStack; // @step:build-tree

    for (int buildIndex = 0; buildIndex < arrayLength; buildIndex++) {
        auto newNode = std::make_shared<CartesianNode>(inputArray[buildIndex], buildIndex); // @step:compare

        // Pop nodes from the stack that are larger than the new node (min-heap property)
        std::shared_ptr<CartesianNode> lastPopped = nullptr; // @step:swap
        while (!nodeStack.empty() && nodeStack.back()->value > newNode->value) {
            // @step:swap
            lastPopped = nodeStack.back(); // @step:swap
            nodeStack.pop_back(); // @step:swap
        }
        newNode->leftChild = lastPopped; // @step:swap
        if (!nodeStack.empty()) {
            nodeStack.back()->rightChild = newNode; // @step:swap
        }
        nodeStack.push_back(newNode); // @step:swap
    }

    // The root of the tree is the leftmost element in the stack (minimum value)
    std::shared_ptr<CartesianNode> treeRoot = nodeStack.empty() ? nullptr : nodeStack[0]; // @step:build-tree

    // Repeatedly extract the minimum (root) and merge its two subtrees
    std::vector<int> resultArray; // @step:extract

    while (treeRoot) {
        resultArray.push_back(treeRoot->value); // @step:mark-sorted

        // Merge left and right subtrees to form the new tree without the extracted root
        treeRoot = mergeTrees(treeRoot->leftChild, treeRoot->rightChild); // @step:extract
    }

    return resultArray; // @step:complete
}
