// BST Floor & Ceil (Recursive) — largest value ≤ target (floor), smallest value ≥ target (ceil)
#include <optional>
using namespace std;

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

struct FloorCeilResult {
    optional<int> floor;
    optional<int> ceil;
};

optional<int> findFloor(BSTNode* node, int target) {
    if (node == nullptr) return nullopt; // @step:initialize
    if (node->value == target) return node->value; // @step:found

    if (target < node->value) {
        // Target smaller than node — floor must be in left subtree
        return findFloor(node->left, target); // @step:search-node
    }
    // Target larger than node — this node is a candidate, check right
    optional<int> rightFloor = findFloor(node->right, target); // @step:search-node
    return rightFloor.has_value() ? rightFloor : optional<int>(node->value); // @step:complete
}

optional<int> findCeil(BSTNode* node, int target) {
    if (node == nullptr) return nullopt; // @step:initialize
    if (node->value == target) return node->value; // @step:found

    if (target > node->value) {
        // Target larger than node — ceil must be in right subtree
        return findCeil(node->right, target); // @step:search-node
    }
    // Target smaller than node — this node is a candidate, check left
    optional<int> leftCeil = findCeil(node->left, target); // @step:search-node
    return leftCeil.has_value() ? leftCeil : optional<int>(node->value); // @step:complete
}

FloorCeilResult bstFloorCeil(BSTNode* root, int target) {
    return { findFloor(root, target), findCeil(root, target) };
}
