# BST Post-Order Traversal (Iterative) — LRN using two stacks

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_postorder_iterative(root) -> list:
    result = []  # @step:initialize
    if root is None:  # @step:initialize
        return result

    stack1 = [root]  # @step:initialize
    stack2 = []  # @step:initialize

    # Phase 1: push nodes onto stack2 in reverse post-order
    while len(stack1) > 0:  # @step:push-to-stack
        node = stack1.pop()  # @step:pop-from-stack
        stack2.append(node)  # @step:push-to-stack

        if node.left is not None:  # @step:traverse-left
            stack1.append(node.left)  # @step:traverse-left
        if node.right is not None:  # @step:traverse-right
            stack1.append(node.right)  # @step:traverse-right

    # Phase 2: pop stack2 in post-order and visit each node
    while len(stack2) > 0:  # @step:visit
        node = stack2.pop()  # @step:pop-from-stack
        result.append(node.value)  # @step:visit

    return result  # @step:complete
