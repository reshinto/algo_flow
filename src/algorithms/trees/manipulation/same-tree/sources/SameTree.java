// Same Tree — recursive: check structural equality and value equality

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class SameTree {
    public boolean sameTree(BinaryNode treeA, BinaryNode treeB) {
        if (treeA == null && treeB == null) return true; // @step:initialize
        if (treeA == null || treeB == null) return false; // @step:compare
        if (treeA.value != treeB.value) return false; // @step:compare

        // Recursively check left and right subtrees
        boolean leftMatch = sameTree(treeA.left, treeB.left); // @step:traverse-left
        boolean rightMatch = sameTree(treeA.right, treeB.right); // @step:traverse-right

        return leftMatch && rightMatch; // @step:visit
    }
}
