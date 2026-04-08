// Find Node by Value — walk the list comparing each node's value to a target, returning the node or null
interface ListNode {
  value: number;
  next: ListNode | null;
}

function findNodeByValue(head: ListNode | null, target: number): ListNode | null {
  let current: ListNode | null = head; // @step:initialize
  while (current !== null) {
    if (current.value === target) {
      // @step:compare
      return current; // @step:found
    }
    current = current.next; // @step:traverse-next
  }
  return null; // @step:complete
}
