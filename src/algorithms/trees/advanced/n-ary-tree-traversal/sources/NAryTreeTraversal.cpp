// N-ary Tree Traversal — preorder visit using children vector
#include <vector>
using namespace std;

struct NAryNode {
    int value;
    vector<NAryNode*> children;
    NAryNode(int v) : value(v) {}
};

void preorder(NAryNode* node, vector<int>& result) {
    if (!node) return; // @step:initialize

    result.push_back(node->value); // @step:visit

    for (NAryNode* child : node->children) {
        preorder(child, result); // @step:traverse-next
    }
}

vector<int> nAryTreeTraversal(NAryNode* root) {
    vector<int> result; // @step:initialize

    preorder(root, result); // @step:initialize
    return result; // @step:complete
}
