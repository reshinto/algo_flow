# BST Floor & Ceil (Recursive) — largest value ≤ target (floor), smallest value ≥ target (ceil)

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_floor_ceil(root, target: int) -> dict:
    def find_floor(node, target):
        if node is None:  # @step:initialize
            return None
        if node.value == target:  # @step:found
            return node.value

        if target < node.value:
            # Target smaller than node — floor must be in left subtree
            return find_floor(node.left, target)  # @step:search-node

        # Target larger than node — this node is a candidate, check right
        right_floor = find_floor(node.right, target)  # @step:search-node
        return right_floor if right_floor is not None else node.value  # @step:complete

    def find_ceil(node, target):
        if node is None:  # @step:initialize
            return None
        if node.value == target:  # @step:found
            return node.value

        if target > node.value:
            # Target larger than node — ceil must be in right subtree
            return find_ceil(node.right, target)  # @step:search-node

        # Target smaller than node — this node is a candidate, check left
        left_ceil = find_ceil(node.left, target)  # @step:search-node
        return left_ceil if left_ceil is not None else node.value  # @step:complete

    return {"floor": find_floor(root, target), "ceil": find_ceil(root, target)}
