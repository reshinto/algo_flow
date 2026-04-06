// Flip Equivalent Trees — recursive: trees are flip-equivalent if children match or are swapped

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class FlipEquivalentTrees {
    public boolean flipEquivalentTrees(BinaryNode treeA, BinaryNode treeB) {
        if (treeA == null && treeB == null) return true; // @step:initialize
        if (treeA == null || treeB == null) return false; // @step:compare
        if (treeA.value != treeB.value) return false; // @step:compare

        // Check if children match without flipping
        boolean noFlip = // @step:traverse-left
            flipEquivalentTrees(treeA.left, treeB.left) && // @step:traverse-left
            flipEquivalentTrees(treeA.right, treeB.right); // @step:traverse-right

        // Check if children match with flipping
        boolean withFlip = // @step:traverse-left
            flipEquivalentTrees(treeA.left, treeB.right) && // @step:traverse-left
            flipEquivalentTrees(treeA.right, treeB.left); // @step:traverse-right

        return noFlip || withFlip; // @step:visit
    }
}
