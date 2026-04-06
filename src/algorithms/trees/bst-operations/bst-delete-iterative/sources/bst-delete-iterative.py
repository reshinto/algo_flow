# BST Delete (Iterative) — 3 cases using while loop with parent tracking

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_delete_iterative(root, delete_value: int):
    parent = None  # @step:initialize
    current = root

    # Find the node to delete and its parent
    while current is not None and current.value != delete_value:
        parent = current
        if delete_value < current.value:
            current = current.left  # @step:search-node
        else:
            current = current.right  # @step:search-node

    if current is None:  # @step:complete
        return root  # value not found

    # Case: node has two children — replace with inorder successor
    if current.left is not None and current.right is not None:
        successor_parent = current
        successor = current.right
        while successor.left is not None:
            successor_parent = successor
            successor = successor.left  # @step:search-node
        current.value = successor.value  # @step:delete-child
        # Now delete the successor
        current = successor
        parent = successor_parent

    # Case: node has 0 or 1 child
    child = current.left if current.left is not None else current.right

    if parent is None:  # @step:delete-child
        return child  # deleting root

    if parent.left == current:
        parent.left = child  # @step:delete-child
    else:
        parent.right = child  # @step:delete-child

    return root  # @step:complete
