// g++ -o nary_test NAryTreeTraversal_test.cpp && ./nary_test
#include "NAryTreeTraversal.cpp"
#include <cassert>
#include <iostream>

NAryNode* makeNAryNode(int value, std::vector<NAryNode*> children = {}) {
    NAryNode* node = new NAryNode(value);
    node->children = children;
    return node;
}

int main() {
    // test: null root returns empty
    assert(nAryTreeTraversal(nullptr).empty());

    // test: single node
    assert(nAryTreeTraversal(makeNAryNode(5)) == (std::vector<int>{5}));

    // test: correct preorder
    NAryNode* root = makeNAryNode(1, {
        makeNAryNode(3, {makeNAryNode(5), makeNAryNode(6)}),
        makeNAryNode(2, {makeNAryNode(7), makeNAryNode(8)}),
        makeNAryNode(4, {makeNAryNode(9), makeNAryNode(10)}),
    });
    auto result = nAryTreeTraversal(root);
    assert(result == (std::vector<int>{1, 3, 5, 6, 2, 7, 8, 4, 9, 10}));

    // test: root before children
    assert(result[0] == 1);
    assert(result[1] == 3);
    assert(result.size() == 10);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
