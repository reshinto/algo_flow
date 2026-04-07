import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ReverseLinkedList_test {
    static ReverseLinkedList.ListNode buildList(int[] values) {
        ReverseLinkedList.ListNode head = null;
        for (int idx = values.length - 1; idx >= 0; idx--) {
            ReverseLinkedList.ListNode node = new ReverseLinkedList.ListNode(values[idx]);
            node.next = head;
            head = node;
        }
        return head;
    }

    static List<Integer> listToArray(ReverseLinkedList.ListNode head) {
        List<Integer> result = new ArrayList<>();
        ReverseLinkedList.ListNode current = head;
        while (current != null) {
            result.add(current.value);
            current = current.next;
        }
        return result;
    }

    public static void main(String[] args) {
        // reverses a 5-node list
        assert listToArray(ReverseLinkedList.reverseLinkedList(buildList(new int[]{1, 2, 3, 4, 5})))
            .equals(Arrays.asList(5, 4, 3, 2, 1));

        // returns null for a null input
        assert ReverseLinkedList.reverseLinkedList(null) == null;

        // handles a single-node list
        assert listToArray(ReverseLinkedList.reverseLinkedList(buildList(new int[]{42})))
            .equals(Arrays.asList(42));

        // handles a two-node list
        assert listToArray(ReverseLinkedList.reverseLinkedList(buildList(new int[]{1, 2})))
            .equals(Arrays.asList(2, 1));

        // handles a three-node list
        assert listToArray(ReverseLinkedList.reverseLinkedList(buildList(new int[]{3, 1, 4})))
            .equals(Arrays.asList(4, 1, 3));

        // new head is last element of original list
        ReverseLinkedList.ListNode reversed = ReverseLinkedList.reverseLinkedList(buildList(new int[]{10, 20, 30}));
        assert reversed != null && reversed.value == 30;

        System.out.println("All tests passed.");
    }
}
