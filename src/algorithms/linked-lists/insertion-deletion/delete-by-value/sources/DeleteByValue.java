// Delete by Value — find and remove the first node matching a target value
public class DeleteByValue {
  public static class ListNode {
    int value;
    ListNode next;

    ListNode(int value) {
      this.value = value;
    }
  }

  public static ListNode deleteByValue(ListNode head, int target) {
    if (head == null) { // @step:initialize
      return null; // @step:complete
    }

    if (head.value == target) { // @step:initialize
      // @step:compare
      return head.next; // @step:delete-node
    }

    ListNode current = head; // @step:initialize
    ListNode previous = null; // @step:initialize

    while (current != null) { // @step:traverse-next
      if (current.value == target) { // @step:compare
        if (previous != null) {
          previous.next = current.next; // @step:delete-node
        }
        return head; // @step:complete
      }

      previous = current; // @step:traverse-next
      current = current.next; // @step:traverse-next
    }

    return head; // @step:complete
  }
}
