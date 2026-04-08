import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MergeTwoSorted_test {
    static ListNode buildList(int[] values) {
        ListNode head = null;
        for (int idx = values.length - 1; idx >= 0; idx--) {
            ListNode node = new ListNode(values[idx]);
            node.next = head;
            head = node;
        }
        return head;
    }

    static List<Integer> listToArray(ListNode head) {
        List<Integer> result = new ArrayList<>();
        ListNode current = head;
        while (current != null) {
            result.add(current.value);
            current = current.next;
        }
        return result;
    }

    public static void main(String[] args) {
        // merges [1, 3, 5, 7] and [2, 4, 6, 8] to [1, 2, 3, 4, 5, 6, 7, 8]
        assert listToArray(MergeTwoSorted.mergeTwoSorted(
            buildList(new int[]{1, 3, 5, 7}), buildList(new int[]{2, 4, 6, 8})))
            .equals(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8));

        // merges two empty lists to empty list
        assert listToArray(MergeTwoSorted.mergeTwoSorted(null, null))
            .equals(Arrays.asList());

        // merges empty list with [1, 2, 3] to [1, 2, 3]
        assert listToArray(MergeTwoSorted.mergeTwoSorted(null, buildList(new int[]{1, 2, 3})))
            .equals(Arrays.asList(1, 2, 3));

        // merges [1, 2, 3] with empty list to [1, 2, 3]
        assert listToArray(MergeTwoSorted.mergeTwoSorted(buildList(new int[]{1, 2, 3}), null))
            .equals(Arrays.asList(1, 2, 3));

        // merges [1] and [2] to [1, 2]
        assert listToArray(MergeTwoSorted.mergeTwoSorted(
            buildList(new int[]{1}), buildList(new int[]{2})))
            .equals(Arrays.asList(1, 2));

        // merges [1, 2, 3] and [4, 5, 6] to [1, 2, 3, 4, 5, 6]
        assert listToArray(MergeTwoSorted.mergeTwoSorted(
            buildList(new int[]{1, 2, 3}), buildList(new int[]{4, 5, 6})))
            .equals(Arrays.asList(1, 2, 3, 4, 5, 6));

        // merges [4, 5, 6] and [1, 2, 3] to [1, 2, 3, 4, 5, 6]
        assert listToArray(MergeTwoSorted.mergeTwoSorted(
            buildList(new int[]{4, 5, 6}), buildList(new int[]{1, 2, 3})))
            .equals(Arrays.asList(1, 2, 3, 4, 5, 6));

        // merges lists with duplicate values [1, 3, 5] and [1, 4, 5]
        assert listToArray(MergeTwoSorted.mergeTwoSorted(
            buildList(new int[]{1, 3, 5}), buildList(new int[]{1, 4, 5})))
            .equals(Arrays.asList(1, 1, 3, 4, 5, 5));

        // merges single-node list [5] with [3] to [3, 5]
        assert listToArray(MergeTwoSorted.mergeTwoSorted(
            buildList(new int[]{5}), buildList(new int[]{3})))
            .equals(Arrays.asList(3, 5));

        // merges [10, 20, 30] and [15, 25] to [10, 15, 20, 25, 30]
        assert listToArray(MergeTwoSorted.mergeTwoSorted(
            buildList(new int[]{10, 20, 30}), buildList(new int[]{15, 25})))
            .equals(Arrays.asList(10, 15, 20, 25, 30));

        System.out.println("All tests passed.");
    }
}
