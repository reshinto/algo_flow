// Merge Binary Trees — recursive: if both nodes exist, sum values; otherwise take non-null node

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class MergeBinaryTrees {
    public BinaryNode mergeBinaryTrees(BinaryNode treeA, BinaryNode treeB) {
        if (treeA == null) return treeB; // @step:initialize
        if (treeB == null) return treeA; // @step:initialize

        // Both nodes exist — merge by summing values
        treeA.value = treeA.value + treeB.value; // @step:merge-node

        // Recursively merge left and right subtrees
        treeA.left = mergeBinaryTrees(treeA.left, treeB.left); // @step:traverse-left
        treeA.right = mergeBinaryTrees(treeA.right, treeB.right); // @step:traverse-right

        return treeA; // @step:visit
    }
}
