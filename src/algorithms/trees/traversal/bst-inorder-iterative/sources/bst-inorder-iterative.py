# BST In-Order Traversal (Iterative) — LNR using an explicit stack

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_inorder_iterative(root) -> list:
    result = []  # @step:initialize
    stack = []  # @step:initialize
    current = root  # @step:initialize

    while current is not None or len(stack) > 0:  # @step:initialize
        # Push all left children onto the stack
        while current is not None:  # @step:push-to-stack
            stack.append(current)  # @step:push-to-stack
            current = current.left  # @step:traverse-left

        # Pop the top node and visit it
        current = stack.pop()  # @step:pop-from-stack
        result.append(current.value)  # @step:visit

        # Move to right subtree
        current = current.right  # @step:traverse-right

    return result  # @step:complete
