// Linked List Length — count nodes by traversing from head to null
public class LinkedListLength {
    public static class ListNode {
        int value;
        ListNode next;
        ListNode(int value) { this.value = value; }
    }

    public static int linkedListLength(ListNode head) {
        int count = 0; // @step:initialize
        ListNode current = head; // @step:initialize
        while (current != null) {
            count++; // @step:traverse-next
            current = current.next; // @step:traverse-next
        }
        return count; // @step:complete
    }
}
