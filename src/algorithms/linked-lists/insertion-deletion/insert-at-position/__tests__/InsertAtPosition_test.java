import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class InsertAtPosition_test {
    static InsertAtPosition.ListNode buildList(int[] values) {
        InsertAtPosition.ListNode head = null;
        for (int idx = values.length - 1; idx >= 0; idx--) {
            InsertAtPosition.ListNode node = new InsertAtPosition.ListNode(values[idx]);
            node.next = head;
            head = node;
        }
        return head;
    }

    static List<Integer> listToArray(InsertAtPosition.ListNode head) {
        List<Integer> result = new ArrayList<>();
        InsertAtPosition.ListNode current = head;
        while (current != null) {
            result.add(current.value);
            current = current.next;
        }
        return result;
    }

    public static void main(String[] args) {
        // inserts at position 2 in a 4-node list
        assert listToArray(InsertAtPosition.insertAtPosition(buildList(new int[]{1, 3, 5, 7}), 4, 2))
            .equals(Arrays.asList(1, 3, 4, 5, 7));

        // inserts at position 0 (head) prepends the node
        assert listToArray(InsertAtPosition.insertAtPosition(buildList(new int[]{2, 3, 4}), 1, 0))
            .equals(Arrays.asList(1, 2, 3, 4));

        // inserts at the end of a 3-node list
        assert listToArray(InsertAtPosition.insertAtPosition(buildList(new int[]{1, 2, 3}), 4, 3))
            .equals(Arrays.asList(1, 2, 3, 4));

        // inserts into an empty list at position 0
        assert listToArray(InsertAtPosition.insertAtPosition(null, 5, 0))
            .equals(Arrays.asList(5));

        // inserts into a single-node list at position 1
        assert listToArray(InsertAtPosition.insertAtPosition(buildList(new int[]{10}), 20, 1))
            .equals(Arrays.asList(10, 20));

        // handles insertion at position beyond list length gracefully
        assert listToArray(InsertAtPosition.insertAtPosition(buildList(new int[]{1, 2}), 3, 10))
            .equals(Arrays.asList(1, 2));

        // inserts value 0 at position 1
        assert listToArray(InsertAtPosition.insertAtPosition(buildList(new int[]{1, 2}), 0, 1))
            .equals(Arrays.asList(1, 0, 2));

        System.out.println("All tests passed.");
    }
}
