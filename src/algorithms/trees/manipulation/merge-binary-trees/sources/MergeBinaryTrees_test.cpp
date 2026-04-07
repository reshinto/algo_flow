// g++ -o merge_test MergeBinaryTrees_test.cpp && ./merge_test
#include "MergeBinaryTrees.cpp"
#include <cassert>
#include <iostream>

BinaryNode* makeMBTNode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: tree A null returns tree B
    BinaryNode* treeB = makeMBTNode(1);
    assert(mergeBinaryTrees(nullptr, treeB) == treeB);

    // test: tree B null returns tree A
    BinaryNode* treeA = makeMBTNode(1);
    assert(mergeBinaryTrees(treeA, nullptr) == treeA);

    // test: sums two single nodes
    BinaryNode* result1 = mergeBinaryTrees(makeMBTNode(3), makeMBTNode(5));
    assert(result1->value == 8);

    // test: merges 7-node trees
    BinaryNode* a7 = makeMBTNode(4,
        makeMBTNode(2, makeMBTNode(1), makeMBTNode(3)),
        makeMBTNode(6, makeMBTNode(5), makeMBTNode(7)));
    BinaryNode* b7 = makeMBTNode(40,
        makeMBTNode(20, makeMBTNode(10), makeMBTNode(30)),
        makeMBTNode(60, makeMBTNode(50), makeMBTNode(70)));
    BinaryNode* result2 = mergeBinaryTrees(a7, b7);
    assert(result2->value == 44);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
