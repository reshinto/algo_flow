# BST Recover Swapped (Recursive) — in-order detect two swapped nodes and fix

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_recover_swapped(root) -> None:
    first_violation = [None]  # @step:initialize
    second_violation = [None]
    previous_node = [None]

    def inorder(node) -> None:
        if node is None:  # @step:initialize
            return

        inorder(node.left)  # @step:search-node

        # Check if BST property is violated at this position
        if previous_node[0] is not None and previous_node[0].value > node.value:
            if first_violation[0] is None:
                # First violation: previous is the first swapped node
                first_violation[0] = previous_node[0]  # @step:found
            # Second violation: current is always updated to the second swapped node
            second_violation[0] = node  # @step:found

        previous_node[0] = node
        inorder(node.right)  # @step:search-node

    inorder(root)

    # Swap the values of the two misplaced nodes to recover the BST
    if first_violation[0] is not None and second_violation[0] is not None:
        first_violation[0].value, second_violation[0].value = (
            second_violation[0].value, first_violation[0].value  # @step:complete
        )
