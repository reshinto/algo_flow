import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RemoveDuplicatesSorted_test {
    static RemoveDuplicatesSorted.ListNode buildList(int[] values) {
        RemoveDuplicatesSorted.ListNode head = null;
        for (int idx = values.length - 1; idx >= 0; idx--) {
            RemoveDuplicatesSorted.ListNode node = new RemoveDuplicatesSorted.ListNode(values[idx]);
            node.next = head;
            head = node;
        }
        return head;
    }

    static List<Integer> listToArray(RemoveDuplicatesSorted.ListNode head) {
        List<Integer> result = new ArrayList<>();
        RemoveDuplicatesSorted.ListNode current = head;
        while (current != null) {
            result.add(current.value);
            current = current.next;
        }
        return result;
    }

    public static void main(String[] args) {
        // removes consecutive duplicates from a sorted list
        assert listToArray(RemoveDuplicatesSorted.removeDuplicatesSorted(
            buildList(new int[]{1, 1, 2, 3, 3, 3, 4, 5, 5})))
            .equals(Arrays.asList(1, 2, 3, 4, 5));

        // leaves a list with no duplicates unchanged
        assert listToArray(RemoveDuplicatesSorted.removeDuplicatesSorted(
            buildList(new int[]{1, 2, 3, 4, 5})))
            .equals(Arrays.asList(1, 2, 3, 4, 5));

        // handles a list of all duplicate values
        assert listToArray(RemoveDuplicatesSorted.removeDuplicatesSorted(
            buildList(new int[]{7, 7, 7, 7})))
            .equals(Arrays.asList(7));

        // returns null for an empty list
        assert RemoveDuplicatesSorted.removeDuplicatesSorted(null) == null;

        // handles a single-element list
        assert listToArray(RemoveDuplicatesSorted.removeDuplicatesSorted(
            buildList(new int[]{5})))
            .equals(Arrays.asList(5));

        // removes duplicates from a two-element list
        assert listToArray(RemoveDuplicatesSorted.removeDuplicatesSorted(
            buildList(new int[]{3, 3})))
            .equals(Arrays.asList(3));

        // keeps two different elements unchanged
        assert listToArray(RemoveDuplicatesSorted.removeDuplicatesSorted(
            buildList(new int[]{1, 2})))
            .equals(Arrays.asList(1, 2));

        // removes duplicates with mixed run lengths
        assert listToArray(RemoveDuplicatesSorted.removeDuplicatesSorted(
            buildList(new int[]{1, 2, 2, 3, 3, 3, 4})))
            .equals(Arrays.asList(1, 2, 3, 4));

        System.out.println("All tests passed.");
    }
}
