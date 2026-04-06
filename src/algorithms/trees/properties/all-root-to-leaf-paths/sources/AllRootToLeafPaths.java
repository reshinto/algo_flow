// All Root-to-Leaf Paths — recursive DFS collecting all paths as strings
import java.util.ArrayList;
import java.util.List;

class PathsNode {
    int value;
    PathsNode left, right;
    PathsNode(int value) { this.value = value; }
}

class AllRootToLeafPaths {
    public List<String> allRootToLeafPaths(PathsNode root) {
        List<String> paths = new ArrayList<>(); // @step:initialize
        dfs(root, "", paths); // @step:initialize
        return paths; // @step:complete
    }

    private void dfs(PathsNode node, String currentPath, List<String> paths) {
        if (node == null) return; // @step:initialize

        String pathSoFar = currentPath.isEmpty() ? String.valueOf(node.value) : currentPath + "->" + node.value; // @step:visit

        // Leaf node — record this complete path
        if (node.left == null && node.right == null) { // @step:visit
            paths.add(pathSoFar); // @step:add-to-result
            return;
        }

        dfs(node.left, pathSoFar, paths); // @step:traverse-left
        dfs(node.right, pathSoFar, paths); // @step:traverse-right
    }
}
