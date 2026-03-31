// Remove Duplicates from Sorted List — skip duplicate nodes in a sorted list
public class RemoveDuplicatesSorted {
  public static class ListNode {
    int value;
    ListNode next;

    ListNode(int value) {
      this.value = value;
    }
  }

  public static ListNode removeDuplicatesSorted(ListNode head) {
    ListNode current = head; // @step:initialize
    while (current != null && current.next != null) {
      // @step:compare
      if (current.value == current.next.value) {
        // @step:delete-node
        current.next = current.next.next;
      } else {
        current = current.next; // @step:traverse-next
      }
    }
    return head; // @step:complete
  }
}
