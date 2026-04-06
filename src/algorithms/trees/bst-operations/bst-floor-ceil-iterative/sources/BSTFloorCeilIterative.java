// BST Floor & Ceil (Iterative) — while loop, track best floor/ceil candidates

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTFloorCeilIterative {
    public int[] bstFloorCeilIterative(BSTNode root, int target) {
        Integer floorValue = null; // @step:initialize
        Integer ceilValue = null;
        BSTNode current = root;

        while (current != null) {
            if (current.value == target) {
                // Exact match is both floor and ceil
                return new int[]{ current.value, current.value }; // @step:found
            }

            if (target < current.value) {
                // Current node is a ceil candidate — go left for smaller ceil
                ceilValue = current.value; // @step:search-node
                current = current.left;
            } else {
                // Current node is a floor candidate — go right for larger floor
                floorValue = current.value; // @step:search-node
                current = current.right;
            }
        }

        int floor = floorValue != null ? floorValue : Integer.MIN_VALUE;
        int ceil = ceilValue != null ? ceilValue : Integer.MAX_VALUE;
        return new int[]{ floor, ceil }; // @step:complete
    }
}
