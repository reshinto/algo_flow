// Find Node by Value — walk the list comparing each node's value to a target, returning the node or null
public class FindNodeByValue {
    public static class ListNode {
        int value;
        ListNode next;
        ListNode(int value) { this.value = value; }
    }

    public static ListNode findNodeByValue(ListNode head, int target) {
        ListNode current = head; // @step:initialize
        while (current != null) {
            if (current.value == target) {
                // @step:compare
                return current; // @step:found
            }
            current = current.next; // @step:traverse-next
        }
        return null; // @step:complete
    }
}
