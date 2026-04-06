# BST Insert (Recursive) — find correct leaf position and insert new node

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_insert(root, insert_value: int):
    if root is None:
        # Base case: insert new node at this position
        return BSTNode(insert_value)  # @step:insert-child

    if insert_value < root.value:
        # Insert value is smaller — recurse into left subtree
        root.left = bst_insert(root.left, insert_value)  # @step:search-node
    elif insert_value > root.value:
        # Insert value is larger — recurse into right subtree
        root.right = bst_insert(root.right, insert_value)  # @step:search-node
    # Duplicate values are ignored

    return root  # @step:complete
