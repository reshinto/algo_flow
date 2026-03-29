// Reverse Linked List — iteratively redirect each node's next pointer to its predecessor
interface ListNode {
  value: number;
  next: ListNode | null;
}

function reverseLinkedList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null; // @step:initialize
  let current: ListNode | null = head; // @step:initialize
  while (current !== null) {
    const nextNode: ListNode | null = current.next; // @step:traverse-next
    current.next = prev; // @step:reverse-pointer
    prev = current; // @step:reverse-pointer
    current = nextNode; // @step:traverse-next
  }
  return prev; // @step:complete
}
