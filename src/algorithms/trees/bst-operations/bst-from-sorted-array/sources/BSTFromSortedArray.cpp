// BST From Sorted Array (Recursive) — pick middle as root, recurse on halves
#include <vector>
using namespace std;

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

BSTNode* buildBST(vector<int>& sortedArray, int leftIndex, int rightIndex) {
    if (leftIndex > rightIndex) return nullptr; // @step:initialize

    // Pick the middle element as root to keep the tree balanced
    int midIndex = (leftIndex + rightIndex) / 2; // @step:build-node
    BSTNode* node = new BSTNode(sortedArray[midIndex]);

    // Recursively build left and right subtrees
    node->left = buildBST(sortedArray, leftIndex, midIndex - 1);   // @step:connect-child
    node->right = buildBST(sortedArray, midIndex + 1, rightIndex); // @step:connect-child

    return node; // @step:complete
}

BSTNode* bstFromSortedArray(vector<int> sortedArray) {
    return buildBST(sortedArray, 0, (int)sortedArray.size() - 1);
}
