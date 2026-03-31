// Linked List Length — count nodes by traversing from head to null
interface ListNode {
  value: number;
  next: ListNode | null;
}

export function linkedListLength(head: ListNode | null): number {
  let count = 0; // @step:initialize
  let current: ListNode | null = head; // @step:initialize
  while (current !== null) {
    count++; // @step:traverse-next
    current = current.next; // @step:traverse-next
  }
  return count; // @step:complete
}
