// BST to Sorted Circular Doubly Linked List — in-place pointer manipulation

class DLLNode {
    int value;
    DLLNode left, right;
    DLLNode(int v) { value = v; }
}

class TreeToDoublyLinkedList {
    private DLLNode head = null;
    private DLLNode tail = null;

    private void inorder(DLLNode node) {
        if (node == null) return; // @step:initialize

        inorder(node.left); // @step:traverse-left

        if (tail == null) {
            head = node; // @step:visit
        } else {
            tail.right = node; // @step:visit
            node.left = tail; // @step:visit
        }
        tail = node; // @step:visit

        inorder(node.right); // @step:traverse-right
    }

    public DLLNode treeToDoublyLinkedList(DLLNode root) {
        if (root == null) return null; // @step:initialize
        head = null; tail = null; // @step:initialize
        inorder(root);
        if (head != null && tail != null) {
            tail.right = head; // @step:visit
            head.left = tail; // @step:visit
        }
        return head; // @step:complete
    }
}
