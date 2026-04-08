#include <cassert>
#include <vector>
#include "sources/ReverseLinkedList.cpp"

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
    // reverses a 5-node list
    assert(listToVec(reverseLinkedList(buildList({1, 2, 3, 4, 5}))) == std::vector<int>({5, 4, 3, 2, 1}));

    // returns null for a null input
    assert(reverseLinkedList(nullptr) == nullptr);

    // handles a single-node list
    assert(listToVec(reverseLinkedList(buildList({42}))) == std::vector<int>({42}));

    // handles a two-node list
    assert(listToVec(reverseLinkedList(buildList({1, 2}))) == std::vector<int>({2, 1}));

    // handles a three-node list
    assert(listToVec(reverseLinkedList(buildList({3, 1, 4}))) == std::vector<int>({4, 1, 3}));

    // new head is last element of original list
    ListNode* reversed = reverseLinkedList(buildList({10, 20, 30}));
    assert(reversed != nullptr && reversed->value == 30);

    return 0;
}
