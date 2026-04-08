#include <cassert>
#include <vector>
#include "sources/IsSorted.cpp"

ListNode* buildList(const std::vector<int>& values) {
    ListNode* head = nullptr;
    for (int idx = static_cast<int>(values.size()) - 1; idx >= 0; idx--) {
        ListNode* node = new ListNode(values[idx]);
        node->next = head;
        head = node;
    }
    return head;
}

int main() {
    // returns true for a sorted list [1, 3, 5, 7, 9]
    assert(isSorted(buildList({1, 3, 5, 7, 9})) == true);

    // returns true for an empty list
    assert(isSorted(nullptr) == true);

    // returns true for a single-node list
    assert(isSorted(buildList({42})) == true);

    // returns false for an unsorted list [1, 5, 3, 7]
    assert(isSorted(buildList({1, 5, 3, 7})) == false);

    // returns true for a list with duplicates [2, 2, 3, 3, 5]
    assert(isSorted(buildList({2, 2, 3, 3, 5})) == true);

    // returns true for a two-node sorted list [1, 2]
    assert(isSorted(buildList({1, 2})) == true);

    // returns false for a two-node unsorted list [5, 2]
    assert(isSorted(buildList({5, 2})) == false);

    // returns false when first pair is unsorted [5, 1, 2, 3]
    assert(isSorted(buildList({5, 1, 2, 3})) == false);

    // returns true for a long sorted list
    assert(isSorted(buildList({1, 2, 3, 4, 5, 6, 7, 8, 9, 10})) == true);

    // returns false when last pair is unsorted [1, 2, 3, 2]
    assert(isSorted(buildList({1, 2, 3, 2})) == false);

    return 0;
}
