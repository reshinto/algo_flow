# Flatten Binary Tree to Linked List Iterative — Morris-like: find rightmost of left subtree and rewire

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def flatten_to_linked_list_iterative(root) -> None:
    current = root  # @step:initialize

    while current is not None:  # @step:visit
        if current.left is not None:  # @step:visit
            # Find the rightmost node of the left subtree
            rightmost = current.left  # @step:connect-child
            while rightmost.right is not None:  # @step:connect-child
                rightmost = rightmost.right  # @step:connect-child

            # Attach original right subtree at the rightmost node
            rightmost.right = current.right  # @step:connect-child

            # Move left subtree to right, clear left pointer
            current.right = current.left  # @step:connect-child
            current.left = None  # @step:connect-child

        current = current.right  # @step:visit
