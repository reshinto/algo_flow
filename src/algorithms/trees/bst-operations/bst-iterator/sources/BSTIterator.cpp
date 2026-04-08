// BST Iterator — stack-based controlled in-order traversal (hasNext/next interface)
#include <vector>
#include <stack>
using namespace std;

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

class BSTIterator {
    stack<BSTNode*> stk; // @step:initialize

    void pushLeft(BSTNode* node) {
        while (node != nullptr) {
            stk.push(node); // @step:search-node
            node = node->left;
        }
    }

public:
    BSTIterator(BSTNode* root) {
        pushLeft(root); // @step:initialize
    }

    bool hasNext() {
        return !stk.empty(); // @step:search-node
    }

    int next() {
        BSTNode* node = stk.top(); stk.pop(); // @step:found
        pushLeft(node->right);
        return node->value;
    }
};

// Convenience function to collect all values via iterator
vector<int> bstIterator(BSTNode* root) {
    BSTIterator iterator(root); // @step:initialize
    vector<int> result;

    while (iterator.hasNext()) {
        result.push_back(iterator.next()); // @step:found
    }

    return result; // @step:complete
}
