// Insert at Position — insert a new node at a specified index
public class InsertAtPosition {
  public static class ListNode {
    int value;
    ListNode next;

    ListNode(int value) {
      this.value = value;
    }
  }

  public static ListNode insertAtPosition(ListNode head, int value, int position) {
    ListNode newNode = new ListNode(value); // @step:initialize

    if (position == 0) { // @step:initialize
      newNode.next = head; // @step:insert-node
      return newNode; // @step:complete
    }

    ListNode current = head; // @step:initialize
    int currentPosition = 0; // @step:initialize

    while (current != null && currentPosition < position - 1) {
      current = current.next; // @step:traverse-next
      currentPosition++; // @step:traverse-next
    }

    if (current != null) {
      newNode.next = current.next; // @step:insert-node
      current.next = newNode; // @step:insert-node
    }

    return head; // @step:complete
  }
}
