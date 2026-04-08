public class LinkedListLength_test {
    static LinkedListLength.ListNode buildList(int[] values) {
        LinkedListLength.ListNode head = null;
        for (int idx = values.length - 1; idx >= 0; idx--) {
            LinkedListLength.ListNode node = new LinkedListLength.ListNode(values[idx]);
            node.next = head;
            head = node;
        }
        return head;
    }

    public static void main(String[] args) {
        // returns 5 for a 5-node list
        assert LinkedListLength.linkedListLength(buildList(new int[]{1, 2, 3, 4, 5})) == 5;

        // returns 0 for null input
        assert LinkedListLength.linkedListLength(null) == 0;

        // returns 1 for a single-node list
        assert LinkedListLength.linkedListLength(buildList(new int[]{42})) == 1;

        // returns 3 for a 3-node list
        assert LinkedListLength.linkedListLength(buildList(new int[]{10, 20, 30})) == 3;

        // returns 10 for a 10-node list
        assert LinkedListLength.linkedListLength(buildList(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10})) == 10;

        System.out.println("All tests passed.");
    }
}
