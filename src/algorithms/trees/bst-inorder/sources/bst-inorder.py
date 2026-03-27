# BST In-Order Traversal — left subtree, visit root, then right subtree

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_inorder(root) -> list:
    result = []  # @step:initialize

    def traverse(node) -> None:
        if node is None:  # @step:initialize
            return

        # Recurse into the left subtree first — smaller values come before root
        traverse(node.left)  # @step:traverse-left
        # Record the root value — in-order guarantees sorted output for a valid BST
        result.append(node.value)  # @step:visit
        # Recurse into the right subtree — larger values come after root
        traverse(node.right)  # @step:traverse-right

    traverse(root)  # @step:initialize
    return result  # @step:complete
