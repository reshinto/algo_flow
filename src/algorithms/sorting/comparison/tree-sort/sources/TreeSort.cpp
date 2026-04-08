// Tree Sort — insert all elements into a Binary Search Tree, then extract via inorder traversal
#include <vector>

struct BstNode {
    int value;
    BstNode* left;
    BstNode* right;
    BstNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

BstNode* createNode(int value) {
    return new BstNode(value);
}

BstNode* insertNode(BstNode* root, int value) {
    // @step:insert
    if (root == nullptr) {
        return createNode(value); // @step:insert
    }

    if (value < root->value) {
        // @step:compare
        root->left = insertNode(root->left, value); // @step:insert
    } else {
        root->right = insertNode(root->right, value); // @step:insert
    }

    return root; // @step:insert
}

void inorderTraversal(BstNode* root, std::vector<int>& result) {
    // @step:extract
    if (root == nullptr) {
        return; // @step:extract
    }

    inorderTraversal(root->left, result); // @step:extract
    result.push_back(root->value); // @step:mark-sorted
    inorderTraversal(root->right, result); // @step:extract
}

void freeTree(BstNode* root) {
    if (!root) return;
    freeTree(root->left);
    freeTree(root->right);
    delete root;
}

std::vector<int> treeSort(std::vector<int> inputArray) {
    // @step:initialize
    int arrayLength = inputArray.size(); // @step:initialize

    if (arrayLength == 0) {
        return {}; // @step:complete
    }

    BstNode* treeRoot = nullptr; // @step:initialize

    // Insert each element into the BST
    for (int insertIndex = 0; insertIndex < arrayLength; insertIndex++) {
        // @step:insert
        treeRoot = insertNode(treeRoot, inputArray[insertIndex]); // @step:insert
    }

    // Extract sorted order via inorder traversal
    std::vector<int> sortedArray; // @step:extract
    inorderTraversal(treeRoot, sortedArray); // @step:extract

    freeTree(treeRoot);

    // @step:mark-sorted
    return sortedArray; // @step:complete
}
