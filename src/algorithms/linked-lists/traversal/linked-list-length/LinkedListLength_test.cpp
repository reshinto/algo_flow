#include <cassert>
#include <vector>
#include "sources/LinkedListLength.cpp"

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
    // returns 5 for a 5-node list
    assert(linkedListLength(buildList({1, 2, 3, 4, 5})) == 5);

    // returns 0 for null input
    assert(linkedListLength(nullptr) == 0);

    // returns 1 for a single-node list
    assert(linkedListLength(buildList({42})) == 1);

    // returns 3 for a 3-node list
    assert(linkedListLength(buildList({10, 20, 30})) == 3);

    // returns 10 for a 10-node list
    assert(linkedListLength(buildList({1, 2, 3, 4, 5, 6, 7, 8, 9, 10})) == 10);

    return 0;
}
