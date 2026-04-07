#include <cassert>
#include <vector>
#include "FindNodeByValue.cpp"

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
    // returns the node when target is found at head
    ListNode* resultAtHead = findNodeByValue(buildList({5, 2, 3, 4}), 5);
    assert(resultAtHead != nullptr && resultAtHead->value == 5);

    // returns the node when target is found in the middle
    ListNode* resultInMiddle = findNodeByValue(buildList({1, 2, 7, 4, 5}), 7);
    assert(resultInMiddle != nullptr && resultInMiddle->value == 7);

    // returns the node when target is found at the end
    ListNode* resultAtEnd = findNodeByValue(buildList({1, 2, 3, 9}), 9);
    assert(resultAtEnd != nullptr && resultAtEnd->value == 9);

    // returns nullptr when target is not found
    assert(findNodeByValue(buildList({1, 2, 3, 4}), 42) == nullptr);

    // returns nullptr for an empty list
    assert(findNodeByValue(nullptr, 5) == nullptr);

    // returns the node for single-node list when target matches
    ListNode* resultSingleMatch = findNodeByValue(buildList({42}), 42);
    assert(resultSingleMatch != nullptr && resultSingleMatch->value == 42);

    // returns nullptr for single-node list when target does not match
    assert(findNodeByValue(buildList({42}), 7) == nullptr);

    return 0;
}
