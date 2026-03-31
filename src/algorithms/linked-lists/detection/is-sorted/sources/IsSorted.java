// Check if Sorted — verify each node's value ≤ the next
class ListNode {
  int value;
  ListNode next;

  ListNode(int value) {
    this.value = value;
    this.next = null;
  }
}

class IsSorted {
  public static boolean isSorted(ListNode head) {
    ListNode current = head; // @step:initialize
    while (current != null && current.next != null) {
      if (current.value > current.next.value) { // @step:compare
        return false; // @step:complete
      }
      current = current.next; // @step:traverse-next
    }
    return true; // @step:complete
  }
}
