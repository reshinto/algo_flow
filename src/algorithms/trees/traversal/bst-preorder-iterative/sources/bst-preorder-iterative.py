# BST Pre-Order Traversal (Iterative) — NLR using an explicit stack

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_preorder_iterative(root) -> list:
    result = []  # @step:initialize
    if root is None:  # @step:initialize
        return result

    stack = [root]  # @step:initialize

    while len(stack) > 0:  # @step:initialize
        node = stack.pop()  # @step:pop-from-stack
        result.append(node.value)  # @step:visit

        # Push right first so left is processed first (LIFO)
        if node.right is not None:  # @step:push-to-stack
            stack.append(node.right)  # @step:push-to-stack
        if node.left is not None:  # @step:traverse-left
            stack.append(node.left)  # @step:traverse-left

    return result  # @step:complete
