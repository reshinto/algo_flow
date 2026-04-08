// Reverse Linked List — iteratively redirect each node's next pointer to its predecessor
struct ListNode {
    int value;
    ListNode* next;
    ListNode(int val) : value(val), next(nullptr) {}
};

ListNode* reverseLinkedList(ListNode* head) {
    ListNode* prev = nullptr; // @step:initialize
    ListNode* current = head; // @step:initialize
    while (current != nullptr) {
        ListNode* nextNode = current->next; // @step:traverse-next
        current->next = prev; // @step:reverse-pointer
        prev = current; // @step:reverse-pointer
        current = nextNode; // @step:traverse-next
    }
    return prev; // @step:complete
}
