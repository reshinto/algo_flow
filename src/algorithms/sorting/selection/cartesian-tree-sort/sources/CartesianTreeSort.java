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

        // Extract elements via inorder traversal
        List<Integer> resultList = new ArrayList<>(); // @step:extract
        Deque<CartesianNode[]> traversalStack = new ArrayDeque<>(); // @step:extract
        if (treeRoot != null) { // @step:extract
            traversalStack.push(new CartesianNode[]{treeRoot}); // @step:extract
        }

        while (!traversalStack.isEmpty()) { // @step:extract
            CartesianNode[] frame = traversalStack.peek(); // @step:extract
            CartesianNode currentNode = frame[0]; // @step:extract

            if (currentNode.leftChild != null) { // @step:extract
                frame[0] = currentNode.leftChild; // @step:extract
                currentNode.leftChild = null; // @step:extract
                traversalStack.push(new CartesianNode[]{currentNode}); // @step:extract
            } else {
                traversalStack.pop(); // @step:extract
                resultList.add(currentNode.value); // @step:mark-sorted
                if (currentNode.rightChild != null) { // @step:extract
                    traversalStack.push(new CartesianNode[]{currentNode.rightChild}); // @step:extract
                }
            }
        }

        return resultList.stream().mapToInt(Integer::intValue).toArray(); // @step:complete
    }
}
