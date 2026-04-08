// Delete by Value — find and remove the first node matching a target value
struct ListNode {
    int value;
    ListNode* next;
    ListNode(int val) : value(val), next(nullptr) {}
};

ListNode* deleteByValue(ListNode* head, int target) {
    if (head == nullptr) {
        // @step:initialize
        return nullptr; // @step:complete
    }

    if (head->value == target) {
        // @step:initialize
        // @step:compare
        return head->next; // @step:delete-node
    }

    ListNode* current = head; // @step:initialize
    ListNode* previous = nullptr; // @step:initialize

    while (current != nullptr) {
        // @step:traverse-next
        if (current->value == target) {
            // @step:compare
            if (previous != nullptr) {
                previous->next = current->next; // @step:delete-node
            }
            return head; // @step:complete
        }

        previous = current; // @step:traverse-next
        current = current->next; // @step:traverse-next
    }

    return head; // @step:complete
}
