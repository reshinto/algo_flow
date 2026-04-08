// g++ -o bst_fsa_test BSTFromSortedArray_test.cpp && ./bst_fsa_test
#include "../sources/BSTFromSortedArray.cpp"
#include <cassert>
#include <iostream>

int main() {
    // test: root at mid value
    BSTNode* result1 = bstFromSortedArray({1, 2, 3, 4, 5, 6, 7});
    assert(result1->value == 4);

    // test: single element
    BSTNode* result2 = bstFromSortedArray({42});
    assert(result2->value == 42);
    assert(result2->left == nullptr);
    assert(result2->right == nullptr);

    // test: empty array
    assert(bstFromSortedArray({}) == nullptr);

    // test: two elements
    BSTNode* result3 = bstFromSortedArray({1, 2});
    assert(result3->value == 1);
    assert(result3->right->value == 2);

    // test: five elements
    BSTNode* result4 = bstFromSortedArray({1, 2, 3, 4, 5});
    assert(result4->value == 3);
    assert(result4->left->value == 1);
    assert(result4->right->value == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
