// javac *.java && java -ea TreeToDoublyLinkedList_test
public class TreeToDoublyLinkedList_test {
    static DLLNode makeNode(int value, DLLNode left, DLLNode right) {
        DLLNode node = new DLLNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static DLLNode leaf(int value) {
        return new DLLNode(value);
    }

    public static void main(String[] args) {
        TreeToDoublyLinkedList converter = new TreeToDoublyLinkedList();

        // test: null input
        assert converter.treeToDoublyLinkedList(null) == null : "Null input should return null";

        // test: single node (circular)
        DLLNode single = leaf(5);
        DLLNode head1 = converter.treeToDoublyLinkedList(single);
        assert head1.value == 5 : "Single node value failed";
        assert head1.right == head1 : "Single node should be circular right";
        assert head1.left == head1 : "Single node should be circular left";

        // test: 3-node BST
        DLLNode root2 = makeNode(2, leaf(1), leaf(3));
        DLLNode head2 = converter.treeToDoublyLinkedList(root2);
        assert head2.value == 1 : "Head should be 1";
        assert head2.right.value == 2 : "Next should be 2";
        assert head2.right.right.value == 3 : "Next next should be 3";
        assert head2.right.right.right == head2 : "Tail.right should wrap to head";

        // test: 7-node BST
        DLLNode root3 = makeNode(4,
            makeNode(2, leaf(1), leaf(3)),
            makeNode(6, leaf(5), leaf(7))
        );
        DLLNode head3 = converter.treeToDoublyLinkedList(root3);
        int[] expectedValues = {1, 2, 3, 4, 5, 6, 7};
        DLLNode current = head3;
        for (int val : expectedValues) {
            assert current.value == val : "Expected " + val + " got " + current.value;
            current = current.right;
        }

        System.out.println("All tests passed!");
    }
}
