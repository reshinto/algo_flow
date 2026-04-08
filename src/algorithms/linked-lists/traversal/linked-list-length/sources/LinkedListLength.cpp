// Linked List Length — count nodes by traversing from head to null
struct ListNode {
    int value;
    ListNode* next;
    ListNode(int val) : value(val), next(nullptr) {}
};

int linkedListLength(ListNode* head) {
    int count = 0; // @step:initialize
    ListNode* current = head; // @step:initialize
    while (current != nullptr) {
        count++; // @step:traverse-next
        current = current->next; // @step:traverse-next
    }
    return count; // @step:complete
}
