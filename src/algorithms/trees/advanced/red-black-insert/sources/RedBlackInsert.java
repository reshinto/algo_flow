// Red-Black Tree Insertion — color rebalancing and rotations
import java.util.ArrayList;
import java.util.List;

class RBNode {
    int value;
    String color;
    RBNode left, right, parent;
    RBNode(int v) { value = v; color = "red"; }
}

class RedBlackInsert {
    private RBNode root = null;

    private void rotateLeft(RBNode node) {
        RBNode rightChild = node.right; // @step:rotate-left
        node.right = rightChild.left;
        if (rightChild.left != null) rightChild.left.parent = node;
        rightChild.parent = node.parent;
        if (node.parent == null) root = rightChild;
        else if (node == node.parent.left) node.parent.left = rightChild;
        else node.parent.right = rightChild;
        rightChild.left = node;
        node.parent = rightChild; // @step:rotate-left
    }

    private void rotateRight(RBNode node) {
        RBNode leftChild = node.left; // @step:rotate-right
        node.left = leftChild.right;
        if (leftChild.right != null) leftChild.right.parent = node;
        leftChild.parent = node.parent;
        if (node.parent == null) root = leftChild;
        else if (node == node.parent.right) node.parent.right = leftChild;
        else node.parent.left = leftChild;
        leftChild.right = node;
        node.parent = leftChild; // @step:rotate-right
    }

    private void fixInsert(RBNode curr) {
        while (curr.parent != null && curr.parent.color.equals("red")) { // @step:recolor-node
            RBNode parent = curr.parent;
            RBNode gp = parent.parent;
            if (parent == gp.left) {
                RBNode uncle = gp.right;
                if (uncle != null && uncle.color.equals("red")) {
                    parent.color = "black"; uncle.color = "black"; gp.color = "red"; // @step:recolor-node
                    curr = gp;
                } else {
                    if (curr == parent.right) { curr = parent; rotateLeft(curr); } // @step:rotate-left
                    curr.parent.color = "black"; gp.color = "red"; rotateRight(gp); // @step:rotate-right
                }
            } else {
                RBNode uncle = gp.left;
                if (uncle != null && uncle.color.equals("red")) {
                    parent.color = "black"; uncle.color = "black"; gp.color = "red"; // @step:recolor-node
                    curr = gp;
                } else {
                    if (curr == parent.left) { curr = parent; rotateRight(curr); } // @step:rotate-right
                    curr.parent.color = "black"; gp.color = "red"; rotateLeft(gp); // @step:rotate-left
                }
            }
        }
        root.color = "black"; // @step:recolor-node
    }

    private void insert(int value) {
        RBNode newNode = new RBNode(value); // @step:insert-node
        if (root == null) { root = newNode; root.color = "black"; return; } // @step:recolor-node
        RBNode curr = root;
        while (true) {
            if (value < curr.value) {
                if (curr.left == null) { curr.left = newNode; newNode.parent = curr; break; }
                curr = curr.left;
            } else {
                if (curr.right == null) { curr.right = newNode; newNode.parent = curr; break; }
                curr = curr.right;
            }
        }
        fixInsert(newNode); // @step:recolor-node
    }

    public List<Integer> redBlackInsert(int[] values) {
        root = null; // @step:initialize
        for (int value : values) insert(value); // @step:insert-node
        List<Integer> result = new ArrayList<>();
        inorder(root, result);
        return result; // @step:complete
    }

    private void inorder(RBNode node, List<Integer> result) {
        if (node == null) return;
        inorder(node.left, result);
        result.add(node.value);
        inorder(node.right, result);
    }
}
