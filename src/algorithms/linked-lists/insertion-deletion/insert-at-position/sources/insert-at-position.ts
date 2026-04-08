// Insert at Position — insert a new node at a specified index
interface ListNode {
  value: number;
  next: ListNode | null;
}

function insertAtPosition(head: ListNode | null, value: number, position: number): ListNode | null {
  const newNode: ListNode = { value, next: null }; // @step:initialize

  if (position === 0) {
    // @step:initialize
    newNode.next = head; // @step:insert-node
    return newNode; // @step:complete
  }

  let current: ListNode | null = head; // @step:initialize
  let currentPosition = 0; // @step:initialize

  while (current !== null && currentPosition < position - 1) {
    current = current.next; // @step:traverse-next
    currentPosition++; // @step:traverse-next
  }

  if (current !== null) {
    newNode.next = current.next; // @step:insert-node
    current.next = newNode; // @step:insert-node
  }

  return head; // @step:complete
}
