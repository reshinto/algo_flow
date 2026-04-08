// Find Node by Value — walk the list comparing each node's value to a target, returning the node or null
struct ListNode {
    int value;
    ListNode* next;
    ListNode(int val) : value(val), next(nullptr) {}
};

ListNode* findNodeByValue(ListNode* head, int target) {
    ListNode* current = head; // @step:initialize
    while (current != nullptr) {
        if (current->value == target) {
            // @step:compare
            return current; // @step:found
        }
        current = current->next; // @step:traverse-next
    }
    return nullptr; // @step:complete
}
