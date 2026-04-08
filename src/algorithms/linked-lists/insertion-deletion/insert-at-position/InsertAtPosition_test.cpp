#include <cassert>
#include <vector>
#include "sources/InsertAtPosition.cpp"

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
    // inserts at position 2 in a 4-node list
    assert(listToVec(insertAtPosition(buildList({1, 3, 5, 7}), 4, 2)) == std::vector<int>({1, 3, 4, 5, 7}));

    // inserts at position 0 (head) prepends the node
    assert(listToVec(insertAtPosition(buildList({2, 3, 4}), 1, 0)) == std::vector<int>({1, 2, 3, 4}));

    // inserts at the end of a 3-node list
    assert(listToVec(insertAtPosition(buildList({1, 2, 3}), 4, 3)) == std::vector<int>({1, 2, 3, 4}));

    // inserts into an empty list at position 0
    assert(listToVec(insertAtPosition(nullptr, 5, 0)) == std::vector<int>({5}));

    // inserts into a single-node list at position 1
    assert(listToVec(insertAtPosition(buildList({10}), 20, 1)) == std::vector<int>({10, 20}));

    // handles insertion at position beyond list length gracefully
    assert(listToVec(insertAtPosition(buildList({1, 2}), 3, 10)) == std::vector<int>({1, 2}));

    // inserts value 0 at position 1
    assert(listToVec(insertAtPosition(buildList({1, 2}), 0, 1)) == std::vector<int>({1, 0, 2}));

    return 0;
}
