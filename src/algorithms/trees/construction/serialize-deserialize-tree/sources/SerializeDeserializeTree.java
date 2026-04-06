// Serialize and Deserialize Binary Tree (BFS / Level-Order)
// Serialization: BFS level-by-level, null nodes represented as "null"
// Deserialization: parse the string back into a tree using a queue
import java.util.LinkedList;
import java.util.Queue;

class TreeNode {
    int value;
    TreeNode left, right;
    TreeNode(int value) { this.value = value; }
}

class SerializeDeserializeTree {
    public String serializeTree(TreeNode root) {
        if (root == null) return "null"; // @step:initialize

        Queue<TreeNode> queue = new LinkedList<>(); // @step:initialize
        queue.add(root); // @step:initialize
        StringBuilder result = new StringBuilder(); // @step:initialize

        while (!queue.isEmpty()) { // @step:search-node
            TreeNode node = queue.poll(); // @step:search-node

            if (node == null) {
                result.append("null,"); // @step:visit
            } else {
                result.append(node.value).append(","); // @step:visit
                queue.add(node.left); // @step:build-node
                queue.add(node.right); // @step:build-node
            }
        }

        return result.toString(); // @step:complete
    }

    public TreeNode deserializeTree(String data) {
        if (data.equals("null") || data.isEmpty()) return null; // @step:initialize

        String[] parts = data.split(","); // @step:initialize
        TreeNode root = new TreeNode(Integer.parseInt(parts[0])); // @step:build-node
        Queue<TreeNode> queue = new LinkedList<>(); // @step:initialize
        queue.add(root); // @step:initialize
        int partIndex = 1; // @step:initialize

        while (!queue.isEmpty() && partIndex < parts.length) { // @step:search-node
            TreeNode currentNode = queue.poll(); // @step:search-node

            String leftValue = parts[partIndex++]; // @step:select-element
            if (!leftValue.equals("null")) {
                TreeNode leftNode = new TreeNode(Integer.parseInt(leftValue)); // @step:build-node
                currentNode.left = leftNode; // @step:connect-child
                queue.add(leftNode); // @step:visit
            }

            if (partIndex < parts.length) {
                String rightValue = parts[partIndex++]; // @step:select-element
                if (!rightValue.equals("null")) {
                    TreeNode rightNode = new TreeNode(Integer.parseInt(rightValue)); // @step:build-node
                    currentNode.right = rightNode; // @step:connect-child
                    queue.add(rightNode); // @step:visit
                }
            }
        }

        return root; // @step:complete
    }
}
