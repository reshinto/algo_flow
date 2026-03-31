// Check if Sorted — verify each node's value ≤ the next
interface ListNode {
  value: number;
  next: ListNode | null;
}

function isSorted(head: ListNode | null): boolean {
  let current: ListNode | null = head; // @step:initialize
  while (current !== null && current.next !== null) {
    if (current.value > current.next.value) {
      // @step:compare
      return false; // @step:complete
    }
    current = current.next; // @step:traverse-next
  }
  return true; // @step:complete
}
