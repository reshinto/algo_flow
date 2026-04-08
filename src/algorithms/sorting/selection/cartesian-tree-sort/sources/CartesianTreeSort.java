import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;


public class CartesianTreeSort {
    static class CartesianNode { // @step:initialize
        int value; // @step:initialize
        int originalIndex; // @step:initialize
        CartesianNode leftChild; // @step:initialize
        CartesianNode rightChild; // @step:initialize

        CartesianNode(int value, int originalIndex) { // @step:initialize
            this.value = value; // @step:initialize
            this.originalIndex = originalIndex; // @step:initialize
        }
    }

    public static int[] cartesianTreeSort(int[] inputArray) { // @step:initialize
        int arrayLength = inputArray.length; // @step:initialize
        if (arrayLength == 0) return new int[0]; // @step:initialize

        // Build the Cartesian tree using a stack-based O(n) construction
        Deque<CartesianNode> nodeStack = new ArrayDeque<>(); // @step:build-tree

        for (int buildIndex = 0; buildIndex < arrayLength; buildIndex++) { // @step:compare
            CartesianNode newNode = new CartesianNode(inputArray[buildIndex], buildIndex); // @step:compare

            // Pop nodes that are larger than the new node (min-heap property)
            CartesianNode lastPopped = null; // @step:swap
            while (!nodeStack.isEmpty() && nodeStack.peek().value > newNode.value) { // @step:swap
                lastPopped = nodeStack.pop(); // @step:swap
            }
            newNode.leftChild = lastPopped; // @step:swap
            if (!nodeStack.isEmpty()) { // @step:swap
                nodeStack.peek().rightChild = newNode; // @step:swap
            }
            nodeStack.push(newNode); // @step:swap
        }

        // Find the root (bottom of the stack)
        CartesianNode treeRoot = null; // @step:build-tree
        while (!nodeStack.isEmpty()) { // @step:build-tree
            treeRoot = nodeStack.pop(); // @step:build-tree
        }

        // Repeatedly extract the minimum (root) and merge its two subtrees
        List<Integer> resultList = new ArrayList<>(); // @step:extract

        while (treeRoot != null) {
            resultList.add(treeRoot.value); // @step:mark-sorted

            // Merge left and right subtrees to form the new tree without the extracted root
            treeRoot = mergeTrees(treeRoot.leftChild, treeRoot.rightChild); // @step:extract
        }

        return resultList.stream().mapToInt(Integer::intValue).toArray(); // @step:complete
    }

    private static CartesianNode mergeTrees(CartesianNode leftTree, CartesianNode rightTree) {
        if (leftTree == null) return rightTree; // @step:extract
        if (rightTree == null) return leftTree; // @step:extract

        if (leftTree.value <= rightTree.value) { // @step:compare
            leftTree.rightChild = mergeTrees(leftTree.rightChild, rightTree); // @step:extract
            return leftTree; // @step:extract
        } else {
            rightTree.leftChild = mergeTrees(leftTree, rightTree.leftChild); // @step:extract
            return rightTree; // @step:extract
        }
    }
}
