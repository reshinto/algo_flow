// Merge Two Sorted Lists — combine two sorted lists by comparing heads
class ListNode {
  int value;
  ListNode next;

  ListNode(int value) {
    this.value = value;
    this.next = null;
  }
}

class MergeTwoSorted {
  public static ListNode mergeTwoSorted(ListNode headA, ListNode headB) {
    ListNode dummy = new ListNode(-1); // @step:initialize
    ListNode tail = dummy; // @step:initialize
    ListNode currentA = headA; // @step:initialize
    ListNode currentB = headB; // @step:initialize
    while (currentA != null && currentB != null) {
      if (currentA.value <= currentB.value) { // @step:compare
        tail.next = currentA; // @step:traverse-next
        currentA = currentA.next; // @step:traverse-next
      } else {
        tail.next = currentB; // @step:traverse-next
        currentB = currentB.next; // @step:traverse-next
      }
      tail = tail.next; // @step:traverse-next
    }
    tail.next = (currentA != null) ? currentA : currentB; // @step:complete
    return dummy.next; // @step:complete
  }
}
