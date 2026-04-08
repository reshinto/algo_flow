public class IsSorted_test {
    static ListNode buildList(int[] values) {
        ListNode head = null;
        for (int idx = values.length - 1; idx >= 0; idx--) {
            ListNode node = new ListNode(values[idx]);
            node.next = head;
            head = node;
        }
        return head;
    }

    public static void main(String[] args) {
        // returns true for a sorted list [1, 3, 5, 7, 9]
        assert IsSorted.isSorted(buildList(new int[]{1, 3, 5, 7, 9})) == true;

        // returns true for an empty list
        assert IsSorted.isSorted(null) == true;

        // returns true for a single-node list
        assert IsSorted.isSorted(buildList(new int[]{42})) == true;

        // returns false for an unsorted list [1, 5, 3, 7]
        assert IsSorted.isSorted(buildList(new int[]{1, 5, 3, 7})) == false;

        // returns true for a list with duplicates [2, 2, 3, 3, 5]
        assert IsSorted.isSorted(buildList(new int[]{2, 2, 3, 3, 5})) == true;

        // returns true for a two-node sorted list [1, 2]
        assert IsSorted.isSorted(buildList(new int[]{1, 2})) == true;

        // returns false for a two-node unsorted list [5, 2]
        assert IsSorted.isSorted(buildList(new int[]{5, 2})) == false;

        // returns false when first pair is unsorted [5, 1, 2, 3]
        assert IsSorted.isSorted(buildList(new int[]{5, 1, 2, 3})) == false;

        // returns true for a long sorted list
        assert IsSorted.isSorted(buildList(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10})) == true;

        // returns false when last pair is unsorted [1, 2, 3, 2]
        assert IsSorted.isSorted(buildList(new int[]{1, 2, 3, 2})) == false;

        System.out.println("All tests passed.");
    }
}
