// AVL Tree Insertion with Rotations — maintains balance via LL/RR/LR/RL rotations
import java.util.ArrayList;
import java.util.List;

class AVLNode {
    int value, height;
    AVLNode left, right;
    AVLNode(int v) { value = v; height = 1; }
}

class AVLInsertRotation {
    private int height(AVLNode node) {
        return node == null ? 0 : node.height; // @step:check-balance
    }

    private void updateHeight(AVLNode node) {
        node.height = 1 + Math.max(height(node.left), height(node.right)); // @step:update-height
    }

    private int balanceFactor(AVLNode node) {
        return height(node.left) - height(node.right); // @step:check-balance
    }

    private AVLNode rotateRight(AVLNode pivot) {
        AVLNode leftChild = pivot.left; // @step:rotate-right
        pivot.left = leftChild.right;
        leftChild.right = pivot;
        updateHeight(pivot);
        updateHeight(leftChild);
        return leftChild; // @step:rotate-right
    }

    private AVLNode rotateLeft(AVLNode pivot) {
        AVLNode rightChild = pivot.right; // @step:rotate-left
        pivot.right = rightChild.left;
        rightChild.left = pivot;
        updateHeight(pivot);
        updateHeight(rightChild);
        return rightChild; // @step:rotate-left
    }

    private AVLNode insert(AVLNode node, int value) {
        if (node == null) return new AVLNode(value); // @step:insert-node

        if (value < node.value) node.left = insert(node.left, value); // @step:traverse-left
        else if (value > node.value) node.right = insert(node.right, value); // @step:traverse-right
        else return node; // @step:visit

        updateHeight(node);
        int balance = balanceFactor(node); // @step:check-balance

        if (balance > 1 && node.left != null && value < node.left.value) return rotateRight(node); // @step:rotate-right
        if (balance < -1 && node.right != null && value > node.right.value) return rotateLeft(node); // @step:rotate-left
        if (balance > 1 && node.left != null) { node.left = rotateLeft(node.left); return rotateRight(node); } // @step:rotate-left
        if (balance < -1 && node.right != null) { node.right = rotateRight(node.right); return rotateLeft(node); } // @step:rotate-right

        return node;
    }

    public List<Integer> avlInsertRotation(int[] values) {
        AVLNode root = null; // @step:initialize
        for (int value : values) root = insert(root, value); // @step:insert-node
        List<Integer> result = new ArrayList<>();
        inorder(root, result);
        return result; // @step:complete
    }

    private void inorder(AVLNode node, List<Integer> result) {
        if (node == null) return;
        inorder(node.left, result);
        result.add(node.value);
        inorder(node.right, result);
    }
}
