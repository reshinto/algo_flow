// BST From Sorted Array (Recursive) — pick middle as root, recurse on halves

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTFromSortedArray {
    public BSTNode bstFromSortedArray(int[] sortedArray) {
        return buildBST(sortedArray, 0, sortedArray.length - 1);
    }

    private BSTNode buildBST(int[] sortedArray, int leftIndex, int rightIndex) {
        if (leftIndex > rightIndex) return null; // @step:initialize

        // Pick the middle element as root to keep the tree balanced
        int midIndex = (leftIndex + rightIndex) / 2; // @step:build-node
        BSTNode node = new BSTNode(sortedArray[midIndex]);

        // Recursively build left and right subtrees
        node.left = buildBST(sortedArray, leftIndex, midIndex - 1); // @step:connect-child
        node.right = buildBST(sortedArray, midIndex + 1, rightIndex); // @step:connect-child

        return node; // @step:complete
    }
}
