// N-ary Tree Traversal — preorder visit using children list
import java.util.ArrayList;
import java.util.List;

class NAryNode {
    int value;
    List<NAryNode> children;
    NAryNode(int v) { value = v; children = new ArrayList<>(); }
}

class NAryTreeTraversal {
    private void preorder(NAryNode node, List<Integer> result) {
        if (node == null) return; // @step:initialize

        result.add(node.value); // @step:visit

        for (NAryNode child : node.children) {
            preorder(child, result); // @step:traverse-next
        }
    }

    public List<Integer> nAryTreeTraversal(NAryNode root) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        preorder(root, result); // @step:initialize
        return result; // @step:complete
    }
}
