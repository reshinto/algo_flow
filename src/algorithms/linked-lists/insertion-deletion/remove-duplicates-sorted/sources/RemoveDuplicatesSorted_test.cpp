#include <cassert>
#include <vector>
#include "RemoveDuplicatesSorted.cpp"

ListNode* buildList(const std::vector<int>& values) {
    ListNode* head = nullptr;
    for (int idx = static_cast<int>(values.size()) - 1; idx >= 0; idx--) {
        ListNode* node = new ListNode(values[idx]);
        node->next = head;
        head = node;
    }
    return head;
}

std::vector<int> listToVec(ListNode* head) {
    std::vector<int> result;
    while (head != nullptr) {
        result.push_back(head->value);
        head = head->next;
    }
    return result;
}

int main() {
    // removes consecutive duplicates from a sorted list
    assert(listToVec(removeDuplicatesSorted(buildList({1, 1, 2, 3, 3, 3, 4, 5, 5})))
        == std::vector<int>({1, 2, 3, 4, 5}));

    // leaves a list with no duplicates unchanged
    assert(listToVec(removeDuplicatesSorted(buildList({1, 2, 3, 4, 5})))
        == std::vector<int>({1, 2, 3, 4, 5}));

    // handles a list of all duplicate values
    assert(listToVec(removeDuplicatesSorted(buildList({7, 7, 7, 7})))
        == std::vector<int>({7}));

    // returns null for an empty list
    assert(removeDuplicatesSorted(nullptr) == nullptr);

    // handles a single-element list
    assert(listToVec(removeDuplicatesSorted(buildList({5})))
        == std::vector<int>({5}));

    // removes duplicates from a two-element list
    assert(listToVec(removeDuplicatesSorted(buildList({3, 3})))
        == std::vector<int>({3}));

    // keeps two different elements unchanged
    assert(listToVec(removeDuplicatesSorted(buildList({1, 2})))
        == std::vector<int>({1, 2}));

    // removes duplicates with mixed run lengths
    assert(listToVec(removeDuplicatesSorted(buildList({1, 2, 2, 3, 3, 3, 4})))
        == std::vector<int>({1, 2, 3, 4}));

    return 0;
}
