# BST Post-Order Traversal — left subtree, right subtree, visit root (LRN)

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_postorder(root) -> list:
    result = []  # @step:initialize

    def traverse(node) -> None:
        if node is None:  # @step:initialize
            return

        # Recurse into the left subtree first
        traverse(node.left)  # @step:traverse-left
        # Recurse into the right subtree
        traverse(node.right)  # @step:traverse-right
        # Visit the root last — after both children have been processed
        result.append(node.value)  # @step:visit

    traverse(root)  # @step:initialize
    return result  # @step:complete
