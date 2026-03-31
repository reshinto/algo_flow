// Merge Two Sorted Lists — combine two sorted lists by comparing heads
interface ListNode {
  value: number;
  next: ListNode | null;
}

function mergeTwoSorted(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  const dummy: ListNode = { value: -1, next: null }; // @step:initialize
  let tail: ListNode = dummy; // @step:initialize
  let currentA: ListNode | null = headA; // @step:initialize
  let currentB: ListNode | null = headB; // @step:initialize
  while (currentA !== null && currentB !== null) {
    if (currentA.value <= currentB.value) {
      // @step:compare
      tail.next = currentA; // @step:traverse-next
      currentA = currentA.next; // @step:traverse-next
    } else {
      tail.next = currentB; // @step:traverse-next
      currentB = currentB.next; // @step:traverse-next
    }
    tail = tail.next!; // @step:traverse-next
  }
  tail.next = currentA ?? currentB; // @step:complete
  return dummy.next; // @step:complete
}
