// BST Floor & Ceil (Iterative) — while loop, track best floor/ceil candidates
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

FloorCeilResult bstFloorCeilIterative(BSTNode* root, int target) {
    optional<int> floorValue = nullopt; // @step:initialize
    optional<int> ceilValue = nullopt;
    BSTNode* current = root;

    while (current != nullptr) {
        if (current->value == target) {
            // Exact match is both floor and ceil
            return { current->value, current->value }; // @step:found
        }

        if (target < current->value) {
            // Current node is a ceil candidate — go left for smaller ceil
            ceilValue = current->value; // @step:search-node
            current = current->left;
        } else {
            // Current node is a floor candidate — go right for larger floor
            floorValue = current->value; // @step:search-node
            current = current->right;
        }
    }

    return { floorValue, ceilValue }; // @step:complete
}
