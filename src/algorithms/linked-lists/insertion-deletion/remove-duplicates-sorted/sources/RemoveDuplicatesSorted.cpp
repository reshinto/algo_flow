// Remove Duplicates from Sorted List — skip duplicate nodes in a sorted list
struct ListNode {
    int value;
    ListNode* next;
    ListNode(int val) : value(val), next(nullptr) {}
};

ListNode* removeDuplicatesSorted(ListNode* head) {
    ListNode* current = head; // @step:initialize
    while (current != nullptr && current->next != nullptr) {
        // @step:compare
        if (current->value == current->next->value) {
            // @step:delete-node
            current->next = current->next->next;
        } else {
            current = current->next; // @step:traverse-next
        }
    }
    return head; // @step:complete
}
