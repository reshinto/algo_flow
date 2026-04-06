// BST Iterator — stack-based controlled in-order traversal (hasNext/next interface)
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTIteratorImpl {
    private Stack<BSTNode> stack = new Stack<>(); // @step:initialize

    public BSTIteratorImpl(BSTNode root) {
        pushLeft(root); // @step:initialize
    }

    private void pushLeft(BSTNode node) {
        while (node != null) {
            stack.push(node); // @step:search-node
            node = node.left;
        }
    }

    public boolean hasNext() {
        return !stack.isEmpty(); // @step:search-node
    }

    public int next() {
        BSTNode node = stack.pop(); // @step:found
        pushLeft(node.right);
        return node.value;
    }
}

class BSTIterator {
    public List<Integer> bstIterator(BSTNode root) {
        BSTIteratorImpl iterator = new BSTIteratorImpl(root); // @step:initialize
        List<Integer> result = new ArrayList<>();

        while (iterator.hasNext()) {
            result.add(iterator.next()); // @step:found
        }

        return result; // @step:complete
    }
}
