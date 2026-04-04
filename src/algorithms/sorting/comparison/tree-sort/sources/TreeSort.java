import java.util.ArrayList;
import java.util.List;

public class TreeSort {
    private static class BstNode { // @step:initialize
        int value; // @step:initialize
        BstNode left; // @step:initialize
        BstNode right; // @step:initialize

        BstNode(int value) { // @step:initialize
            this.value = value; // @step:initialize
            this.left = null; // @step:initialize
            this.right = null; // @step:initialize
        }
    }

    private static BstNode insertNode(BstNode root, int value) { // @step:insert
        if (root == null) {
            return new BstNode(value); // @step:insert
        }

        if (value < root.value) { // @step:compare
            root.left = insertNode(root.left, value); // @step:insert
        } else {
            root.right = insertNode(root.right, value); // @step:insert
        }

        return root; // @step:insert
    }

    private static void inorderTraversal(BstNode root, List<Integer> result) { // @step:extract
        if (root == null) {
            return; // @step:extract
        }

        inorderTraversal(root.left, result); // @step:extract
        result.add(root.value); // @step:mark-sorted
        inorderTraversal(root.right, result); // @step:extract
    }

    public static int[] treeSort(int[] inputArray) { // @step:initialize
        int arrayLength = inputArray.length; // @step:initialize

        if (arrayLength == 0) {
            return new int[0]; // @step:complete
        }

        BstNode treeRoot = null; // @step:initialize

        // Insert each element into the BST
        for (int insertIndex = 0; insertIndex < arrayLength; insertIndex++) { // @step:insert
            treeRoot = insertNode(treeRoot, inputArray[insertIndex]); // @step:insert
        }

        // Extract sorted order via inorder traversal
        List<Integer> sortedList = new ArrayList<>(); // @step:extract
        inorderTraversal(treeRoot, sortedList); // @step:extract

        int[] sortedArray = new int[arrayLength]; // @step:mark-sorted
        for (int resultIndex = 0; resultIndex < arrayLength; resultIndex++) { // @step:mark-sorted
            sortedArray[resultIndex] = sortedList.get(resultIndex); // @step:mark-sorted
        }

        return sortedArray; // @step:complete
    }
}
