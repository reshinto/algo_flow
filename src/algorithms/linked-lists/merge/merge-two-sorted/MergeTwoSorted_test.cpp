#include <cassert>
#include <vector>
#include "sources/MergeTwoSorted.cpp"

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
    // merges [1, 3, 5, 7] and [2, 4, 6, 8] to [1, 2, 3, 4, 5, 6, 7, 8]
    assert(listToVec(mergeTwoSorted(buildList({1, 3, 5, 7}), buildList({2, 4, 6, 8})))
        == std::vector<int>({1, 2, 3, 4, 5, 6, 7, 8}));

    // merges two empty lists to empty list
    assert(listToVec(mergeTwoSorted(nullptr, nullptr)) == std::vector<int>({}));

    // merges empty list with [1, 2, 3] to [1, 2, 3]
    assert(listToVec(mergeTwoSorted(nullptr, buildList({1, 2, 3}))) == std::vector<int>({1, 2, 3}));

    // merges [1, 2, 3] with empty list to [1, 2, 3]
    assert(listToVec(mergeTwoSorted(buildList({1, 2, 3}), nullptr)) == std::vector<int>({1, 2, 3}));

    // merges [1] and [2] to [1, 2]
    assert(listToVec(mergeTwoSorted(buildList({1}), buildList({2}))) == std::vector<int>({1, 2}));

    // merges [1, 2, 3] and [4, 5, 6] to [1, 2, 3, 4, 5, 6]
    assert(listToVec(mergeTwoSorted(buildList({1, 2, 3}), buildList({4, 5, 6})))
        == std::vector<int>({1, 2, 3, 4, 5, 6}));

    // merges [4, 5, 6] and [1, 2, 3] to [1, 2, 3, 4, 5, 6]
    assert(listToVec(mergeTwoSorted(buildList({4, 5, 6}), buildList({1, 2, 3})))
        == std::vector<int>({1, 2, 3, 4, 5, 6}));

    // merges lists with duplicate values [1, 3, 5] and [1, 4, 5]
    assert(listToVec(mergeTwoSorted(buildList({1, 3, 5}), buildList({1, 4, 5})))
        == std::vector<int>({1, 1, 3, 4, 5, 5}));

    // merges single-node list [5] with [3] to [3, 5]
    assert(listToVec(mergeTwoSorted(buildList({5}), buildList({3}))) == std::vector<int>({3, 5}));

    // merges [10, 20, 30] and [15, 25] to [10, 15, 20, 25, 30]
    assert(listToVec(mergeTwoSorted(buildList({10, 20, 30}), buildList({15, 25})))
        == std::vector<int>({10, 15, 20, 25, 30}));

    return 0;
}
