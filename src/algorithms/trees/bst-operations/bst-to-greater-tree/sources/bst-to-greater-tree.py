# BST to Greater Tree (Recursive) — reverse in-order: accumulate running sum

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_to_greater_tree(root):
    running_sum = [0]  # @step:initialize

    def reverse_inorder(node) -> None:
        if node is None:  # @step:initialize
            return

        # Visit right subtree first (larger values in descending order)
        reverse_inorder(node.right)  # @step:search-node

        # Add current node's value to running sum, then update node
        running_sum[0] += node.value  # @step:found
        node.value = running_sum[0]

        # Visit left subtree (smaller values)
        reverse_inorder(node.left)  # @step:search-node

    reverse_inorder(root)
    return root  # @step:complete
