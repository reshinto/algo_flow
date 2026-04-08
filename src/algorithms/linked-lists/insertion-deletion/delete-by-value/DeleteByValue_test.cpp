#include <cassert>
#include <vector>
#include "sources/DeleteByValue.cpp"

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
    // deletes a node in the middle of the list
    assert(listToVec(deleteByValue(buildList({1, 2, 3, 4, 5}), 3)) == std::vector<int>({1, 2, 4, 5}));

    // deletes the head of the list
    assert(listToVec(deleteByValue(buildList({1, 2, 3}), 1)) == std::vector<int>({2, 3}));

    // deletes the last node in the list
    assert(listToVec(deleteByValue(buildList({1, 2, 3, 4}), 4)) == std::vector<int>({1, 2, 3}));

    // returns null for an empty list
    assert(deleteByValue(nullptr, 5) == nullptr);

    // returns the list unchanged when target is not found
    assert(listToVec(deleteByValue(buildList({1, 2, 3}), 99)) == std::vector<int>({1, 2, 3}));

    // deletes from a single-node list
    assert(listToVec(deleteByValue(buildList({7}), 7)) == std::vector<int>({}));

    // does not delete when single-node list value differs from target
    assert(listToVec(deleteByValue(buildList({7}), 5)) == std::vector<int>({7}));

    // deletes only the first occurrence
    assert(listToVec(deleteByValue(buildList({1, 2, 2, 3}), 2)) == std::vector<int>({1, 2, 3}));

    return 0;
}
