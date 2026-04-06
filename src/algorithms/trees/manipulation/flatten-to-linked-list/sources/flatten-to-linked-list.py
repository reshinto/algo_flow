# Flatten Binary Tree to Linked List — recursive preorder: rewire nodes in-place

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def flatten_to_linked_list(root) -> None:
    if root is None:  # @step:initialize
        return

    # Recursively flatten the left and right subtrees
    flatten_to_linked_list(root.left)  # @step:traverse-left
    flatten_to_linked_list(root.right)  # @step:traverse-right

    # Save the original right subtree
    right_subtree = root.right  # @step:connect-child

    # Move the left subtree to the right
    root.right = root.left  # @step:connect-child
    root.left = None  # @step:connect-child

    # Find the rightmost node of the newly-placed subtree
    current = root
    while current.right is not None:  # @step:visit
        current = current.right  # @step:visit

    # Attach the original right subtree at the tail
    current.right = right_subtree  # @step:connect-child
