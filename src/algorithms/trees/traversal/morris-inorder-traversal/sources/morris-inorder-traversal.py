# Morris In-Order Traversal — O(1) space in-order traversal using temporary threading

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def morris_inorder_traversal(root) -> list:
    result = []  # @step:initialize
    current = root  # @step:initialize

    while current is not None:  # @step:initialize
        if current.left is None:  # @step:visit
            # No left child — visit current and move right
            result.append(current.value)  # @step:visit
            current = current.right  # @step:traverse-right
        else:
            # Find the inorder predecessor (rightmost node in left subtree)
            predecessor = current.left  # @step:thread-node
            while predecessor.right is not None and predecessor.right is not current:  # @step:thread-node
                predecessor = predecessor.right  # @step:thread-node

            if predecessor.right is None:  # @step:thread-node
                # Thread: make predecessor point back to current
                predecessor.right = current  # @step:thread-node
                current = current.left  # @step:traverse-left
            else:
                # Unthread: restore predecessor's right, visit current, move right
                predecessor.right = None  # @step:unthread-node
                result.append(current.value)  # @step:visit
                current = current.right  # @step:traverse-right

    return result  # @step:complete
