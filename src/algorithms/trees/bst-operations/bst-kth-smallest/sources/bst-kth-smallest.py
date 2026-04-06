# BST Kth Smallest (Recursive) — in-order traversal with counter, stop at k

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_kth_smallest(root, kth_position: int) -> int:
    counter = [0]  # @step:initialize
    result = [-1]

    def inorder(node) -> None:
        if node is None or counter[0] >= kth_position:  # @step:initialize
            return

        # Visit left subtree first (smaller values)
        inorder(node.left)  # @step:search-node

        # Visit current node — increment counter
        counter[0] += 1
        if counter[0] == kth_position:
            result[0] = node.value  # @step:found
            return

        # Visit right subtree (larger values)
        inorder(node.right)  # @step:search-node

    inorder(root)
    return result[0]  # @step:complete
