# BST Pre-Order Traversal — visit root, then left subtree, then right subtree (NLR)

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_preorder(root) -> list:
    result = []  # @step:initialize

    def traverse(node) -> None:
        if node is None:  # @step:initialize
            return

        # Visit the current node first — root before any subtrees
        result.append(node.value)  # @step:visit
        # Recurse into the left subtree
        traverse(node.left)  # @step:traverse-left
        # Recurse into the right subtree
        traverse(node.right)  # @step:traverse-right

    traverse(root)  # @step:initialize
    return result  # @step:complete
