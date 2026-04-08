// Check if Sorted — verify each node's value <= the next
#include <stdbool.h>

struct ListNode {
    int value;
    ListNode* next;
    ListNode(int val) : value(val), next(nullptr) {}
};

bool isSorted(ListNode* head) {
    ListNode* current = head; // @step:initialize
    while (current != nullptr && current->next != nullptr) {
        if (current->value > current->next->value) {
            // @step:compare
            return false; // @step:complete
        }
        current = current->next; // @step:traverse-next
    }
    return true; // @step:complete
}
