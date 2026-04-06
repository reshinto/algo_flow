// BST Floor & Ceil (Recursive) — largest value ≤ target (floor), smallest value ≥ target (ceil)

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTFloorCeil {
    public int[] bstFloorCeil(BSTNode root, int target) {
        return new int[]{ findFloor(root, target), findCeil(root, target) };
    }

    private int findFloor(BSTNode node, int target) {
        if (node == null) return Integer.MIN_VALUE; // @step:initialize
        if (node.value == target) return node.value; // @step:found

        if (target < node.value) {
            // Target smaller than node — floor must be in left subtree
            return findFloor(node.left, target); // @step:search-node
        }
        // Target larger than node — this node is a candidate, check right
        int rightFloor = findFloor(node.right, target); // @step:search-node
        return rightFloor != Integer.MIN_VALUE ? rightFloor : node.value; // @step:complete
    }

    private int findCeil(BSTNode node, int target) {
        if (node == null) return Integer.MAX_VALUE; // @step:initialize
        if (node.value == target) return node.value; // @step:found

        if (target > node.value) {
            // Target larger than node — ceil must be in right subtree
            return findCeil(node.right, target); // @step:search-node
        }
        // Target smaller than node — this node is a candidate, check left
        int leftCeil = findCeil(node.left, target); // @step:search-node
        return leftCeil != Integer.MAX_VALUE ? leftCeil : node.value; // @step:complete
    }
}
