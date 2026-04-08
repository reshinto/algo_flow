public class FindNodeByValue_test {
    static FindNodeByValue.ListNode buildList(int[] values) {
        FindNodeByValue.ListNode head = null;
        for (int idx = values.length - 1; idx >= 0; idx--) {
            FindNodeByValue.ListNode node = new FindNodeByValue.ListNode(values[idx]);
            node.next = head;
            head = node;
        }
        return head;
    }

    public static void main(String[] args) {
        // returns the node when target is found at head
        FindNodeByValue.ListNode resultAtHead = FindNodeByValue.findNodeByValue(buildList(new int[]{5, 2, 3, 4}), 5);
        assert resultAtHead != null && resultAtHead.value == 5;

        // returns the node when target is found in the middle
        FindNodeByValue.ListNode resultInMiddle = FindNodeByValue.findNodeByValue(buildList(new int[]{1, 2, 7, 4, 5}), 7);
        assert resultInMiddle != null && resultInMiddle.value == 7;

        // returns the node when target is found at the end
        FindNodeByValue.ListNode resultAtEnd = FindNodeByValue.findNodeByValue(buildList(new int[]{1, 2, 3, 9}), 9);
        assert resultAtEnd != null && resultAtEnd.value == 9;

        // returns null when target is not found
        assert FindNodeByValue.findNodeByValue(buildList(new int[]{1, 2, 3, 4}), 42) == null;

        // returns null for an empty list
        assert FindNodeByValue.findNodeByValue(null, 5) == null;

        // returns the node for single-node list when target matches
        FindNodeByValue.ListNode resultSingleMatch = FindNodeByValue.findNodeByValue(buildList(new int[]{42}), 42);
        assert resultSingleMatch != null && resultSingleMatch.value == 42;

        // returns null for single-node list when target does not match
        assert FindNodeByValue.findNodeByValue(buildList(new int[]{42}), 7) == null;

        System.out.println("All tests passed.");
    }
}
