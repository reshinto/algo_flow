# BST Search (Recursive) — compare target, recurse left or right

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_search(root, target: int):
    if root is None:  # @step:initialize
        return None
    if root.value == target:  # @step:found
        return root

    if target < root.value:
        # Target is smaller — search the left subtree
        return bst_search(root.left, target)  # @step:search-node
    else:
        # Target is larger — search the right subtree
        return bst_search(root.right, target)  # @step:search-node
