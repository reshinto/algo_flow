# BST Delete (Recursive) — 3 cases: leaf, one child, two children with inorder successor

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_delete(root, delete_value: int):
    if root is None:  # @step:initialize
        return None

    if delete_value < root.value:
        # Target is in the left subtree
        root.left = bst_delete(root.left, delete_value)  # @step:search-node
    elif delete_value > root.value:
        # Target is in the right subtree
        root.right = bst_delete(root.right, delete_value)  # @step:search-node
    else:
        # Found the node to delete
        if root.left is None:  # @step:delete-child
            return root.right
        if root.right is None:  # @step:delete-child
            return root.left

        # Two children: find inorder successor (smallest in right subtree)
        successor = root.right
        while successor.left is not None:
            successor = successor.left  # @step:search-node
        # Replace value with successor's value, then delete the successor
        root.value = successor.value  # @step:delete-child
        root.right = bst_delete(root.right, successor.value)

    return root  # @step:complete
