// g++ -o merge_iter_test MergeBinaryTreesIterative_test.cpp && ./merge_iter_test
#include "../sources/MergeBinaryTreesIterative.cpp"
#include <cassert>
#include <iostream>

BinaryNode* makeMBTINode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: tree A null returns tree B
    BinaryNode* treeB = makeMBTINode(1);
    assert(mergeBinaryTreesIterative(nullptr, treeB) == treeB);

    // test: tree B null returns tree A
    BinaryNode* treeA = makeMBTINode(1);
    assert(mergeBinaryTreesIterative(treeA, nullptr) == treeA);

    // test: sums two single nodes
    BinaryNode* result1 = mergeBinaryTreesIterative(makeMBTINode(3), makeMBTINode(5));
    assert(result1->value == 8);

    // test: merges 7-node trees
    BinaryNode* a7 = makeMBTINode(4,
        makeMBTINode(2, makeMBTINode(1), makeMBTINode(3)),
        makeMBTINode(6, makeMBTINode(5), makeMBTINode(7)));
    BinaryNode* b7 = makeMBTINode(40,
        makeMBTINode(20, makeMBTINode(10), makeMBTINode(30)),
        makeMBTINode(60, makeMBTINode(50), makeMBTINode(70)));
    BinaryNode* result2 = mergeBinaryTreesIterative(a7, b7);
    assert(result2->value == 44);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
