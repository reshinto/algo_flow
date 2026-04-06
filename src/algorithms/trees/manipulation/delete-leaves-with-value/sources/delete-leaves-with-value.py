# Delete Leaves With Value — post-order recursive: remove leaf if value matches target

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def delete_leaves_with_value(root, target_value: int):
    if root is None:  # @step:initialize
        return None

    # Recursively process children first (post-order)
    root.left = delete_leaves_with_value(root.left, target_value)  # @step:traverse-left
    root.right = delete_leaves_with_value(root.right, target_value)  # @step:traverse-right

    # Check if the current node is now a leaf with the target value
    if root.left is None and root.right is None and root.value == target_value:  # @step:compare
        return None  # @step:delete-node

    return root  # @step:visit
