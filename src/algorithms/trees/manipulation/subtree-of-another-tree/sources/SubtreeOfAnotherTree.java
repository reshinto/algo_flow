// Subtree of Another Tree — recursive: for each node in main tree, check if subtree matches

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class SubtreeOfAnotherTree {
    private boolean isSameTree(BinaryNode treeA, BinaryNode treeB) {
        if (treeA == null && treeB == null) return true;
        if (treeA == null || treeB == null) return false;
        if (treeA.value != treeB.value) return false;
        return isSameTree(treeA.left, treeB.left) && isSameTree(treeA.right, treeB.right);
    }

    public boolean subtreeOfAnotherTree(BinaryNode mainTree, BinaryNode subTree) {
        if (subTree == null) return true; // @step:initialize
        if (mainTree == null) return false; // @step:initialize

        // Check if the tree rooted at mainTree matches subTree
        if (isSameTree(mainTree, subTree)) return true; // @step:compare

        // Recursively check left and right subtrees
        return subtreeOfAnotherTree(mainTree.left, subTree) || // @step:traverse-left
               subtreeOfAnotherTree(mainTree.right, subTree); // @step:traverse-right
    }
}
