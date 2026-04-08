import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DeleteByValue_test {
    static DeleteByValue.ListNode buildList(int[] values) {
        DeleteByValue.ListNode head = null;
        for (int idx = values.length - 1; idx >= 0; idx--) {
            DeleteByValue.ListNode node = new DeleteByValue.ListNode(values[idx]);
            node.next = head;
            head = node;
        }
        return head;
    }

    static List<Integer> listToArray(DeleteByValue.ListNode head) {
        List<Integer> result = new ArrayList<>();
        DeleteByValue.ListNode current = head;
        while (current != null) {
            result.add(current.value);
            current = current.next;
        }
        return result;
    }

    public static void main(String[] args) {
        // deletes a node in the middle of the list
        assert listToArray(DeleteByValue.deleteByValue(buildList(new int[]{1, 2, 3, 4, 5}), 3))
            .equals(Arrays.asList(1, 2, 4, 5));

        // deletes the head of the list
        assert listToArray(DeleteByValue.deleteByValue(buildList(new int[]{1, 2, 3}), 1))
            .equals(Arrays.asList(2, 3));

        // deletes the last node in the list
        assert listToArray(DeleteByValue.deleteByValue(buildList(new int[]{1, 2, 3, 4}), 4))
            .equals(Arrays.asList(1, 2, 3));

        // returns null for an empty list
        assert DeleteByValue.deleteByValue(null, 5) == null;

        // returns the list unchanged when target is not found
        assert listToArray(DeleteByValue.deleteByValue(buildList(new int[]{1, 2, 3}), 99))
            .equals(Arrays.asList(1, 2, 3));

        // deletes from a single-node list
        assert listToArray(DeleteByValue.deleteByValue(buildList(new int[]{7}), 7))
            .equals(Arrays.asList());

        // does not delete when single-node list value differs from target
        assert listToArray(DeleteByValue.deleteByValue(buildList(new int[]{7}), 5))
            .equals(Arrays.asList(7));

        // deletes only the first occurrence
        assert listToArray(DeleteByValue.deleteByValue(buildList(new int[]{1, 2, 2, 3}), 2))
            .equals(Arrays.asList(1, 2, 3));

        System.out.println("All tests passed.");
    }
}
