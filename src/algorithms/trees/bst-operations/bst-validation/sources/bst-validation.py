# BST Validation (Recursive) — validate BST property using min/max bounds

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_validation(root) -> bool:
    def validate(node, min_val, max_val) -> bool:
        if node is None:  # @step:initialize
            return True

        if node.value <= min_val or node.value >= max_val:
            # Node value violates BST bounds
            return False  # @step:found

        # Recurse: left subtree values must be less than current node
        # Right subtree values must be greater than current node
        return (
            validate(node.left, min_val, node.value) and  # @step:search-node
            validate(node.right, node.value, max_val)  # @step:search-node
        )

    return validate(root, float("-inf"), float("inf"))  # @step:complete
