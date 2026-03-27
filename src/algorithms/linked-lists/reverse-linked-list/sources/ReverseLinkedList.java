// Reverse Linked List — iteratively redirect each node's next pointer to its predecessor
public class ReverseLinkedList {
    public static class ListNode {
        int value;
        ListNode next;
        ListNode(int value) { this.value = value; }
    }

    public static ListNode reverseLinkedList(ListNode head) {
        ListNode prev = null; // @step:initialize
        ListNode current = head; // @step:initialize
        while (current != null) {
            ListNode nextNode = current.next; // @step:traverse-next
            current.next = prev; // @step:reverse-pointer
            prev = current; // @step:reverse-pointer
            current = nextNode; // @step:traverse-next
        }
        return prev; // @step:complete
    }
}
