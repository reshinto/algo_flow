// Lowest Common Ancestor Iterative — BFS to build parent map, then trace ancestors

#include <queue>
#include <unordered_map>
#include <unordered_set>

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

BinaryNode* lowestCommonAncestorIterative(BinaryNode* root, int nodeValueA, int nodeValueB) {
    if (root == nullptr) return nullptr; // @step:initialize

    // Build parent map using BFS
    std::unordered_map<BinaryNode*, BinaryNode*> parentMap; // @step:initialize
    parentMap[root] = nullptr; // @step:initialize
    std::queue<BinaryNode*> bfsQueue; // @step:initialize
    bfsQueue.push(root);

    // BFS until we find both target nodes
    BinaryNode* nodeA = nullptr;
    BinaryNode* nodeB = nullptr;

    while (!bfsQueue.empty() && (nodeA == nullptr || nodeB == nullptr)) {
        // @step:visit
        BinaryNode* current = bfsQueue.front(); // @step:dequeue
        bfsQueue.pop();

        if (current->value == nodeValueA) nodeA = current; // @step:compare
        if (current->value == nodeValueB) nodeB = current; // @step:compare

        if (current->left != nullptr) {
            // @step:enqueue
            parentMap[current->left] = current; // @step:enqueue
            bfsQueue.push(current->left); // @step:enqueue
        }
        if (current->right != nullptr) {
            // @step:enqueue
            parentMap[current->right] = current; // @step:enqueue
            bfsQueue.push(current->right); // @step:enqueue
        }
    }

    if (nodeA == nullptr || nodeB == nullptr) return nullptr;

    // Trace ancestors of nodeA into a set
    std::unordered_set<BinaryNode*> ancestorsA; // @step:visit
    BinaryNode* traceNode = nodeA;
    while (traceNode != nullptr) {
        // @step:visit
        ancestorsA.insert(traceNode); // @step:visit
        traceNode = parentMap.count(traceNode) ? parentMap[traceNode] : nullptr; // @step:visit
    }

    // Walk ancestors of nodeB until we hit the first ancestor also in ancestorsA
    traceNode = nodeB;
    while (traceNode != nullptr) {
        // @step:visit
        if (ancestorsA.count(traceNode)) return traceNode; // @step:compare
        traceNode = parentMap.count(traceNode) ? parentMap[traceNode] : nullptr; // @step:visit
    }

    return nullptr; // @step:complete
}
