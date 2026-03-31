// Remove Duplicates from Sorted List — skip duplicate nodes in a sorted list
interface ListNode {
  value: number;
  next: ListNode | null;
}

export function removeDuplicatesSorted(head: ListNode | null): ListNode | null {
  let current: ListNode | null = head; // @step:initialize
  while (current !== null && current.next !== null) {
    // @step:compare
    if (current.value === current.next.value) {
      // @step:delete-node
      current.next = current.next.next;
    } else {
      current = current.next; // @step:traverse-next
    }
  }
  return head; // @step:complete
}
