# BST From Sorted Array (Recursive) — pick middle as root, recurse on halves

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_from_sorted_array(sorted_array: list) -> object:
    def build_bst(left_index: int, right_index: int):
        if left_index > right_index:  # @step:initialize
            return None

        # Pick the middle element as root to keep the tree balanced
        mid_index = (left_index + right_index) // 2  # @step:build-node
        node = BSTNode(sorted_array[mid_index])

        # Recursively build left and right subtrees
        node.left = build_bst(left_index, mid_index - 1)  # @step:connect-child
        node.right = build_bst(mid_index + 1, right_index)  # @step:connect-child

        return node  # @step:complete

    return build_bst(0, len(sorted_array) - 1)
