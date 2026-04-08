// Delete by Value — find and remove the first node matching a target value
interface ListNode {
  value: number;
  next: ListNode | null;
}

function deleteByValue(head: ListNode | null, target: number): ListNode | null {
  if (head === null) {
    // @step:initialize
    return null; // @step:complete
  }

  if (head.value === target) {
    // @step:initialize
    // @step:compare
    return head.next; // @step:delete-node
  }

  let current: ListNode | null = head; // @step:initialize
  let previous: ListNode | null = null; // @step:initialize

  while (current !== null) {
    // @step:traverse-next
    if (current.value === target) {
      // @step:compare
      if (previous !== null) {
        previous.next = current.next; // @step:delete-node
      }
      return head; // @step:complete
    }

    previous = current; // @step:traverse-next
    current = current.next; // @step:traverse-next
  }

  return head; // @step:complete
}
