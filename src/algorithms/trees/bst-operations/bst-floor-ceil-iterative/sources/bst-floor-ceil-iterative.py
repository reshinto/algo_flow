# BST Floor & Ceil (Iterative) — while loop, track best floor/ceil candidates

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_floor_ceil_iterative(root, target: int) -> dict:
    floor_value = None  # @step:initialize
    ceil_value = None
    current = root

    while current is not None:
        if current.value == target:
            # Exact match is both floor and ceil
            return {"floor": current.value, "ceil": current.value}  # @step:found

        if target < current.value:
            # Current node is a ceil candidate — go left for smaller ceil
            ceil_value = current.value  # @step:search-node
            current = current.left
        else:
            # Current node is a floor candidate — go right for larger floor
            floor_value = current.value  # @step:search-node
            current = current.right

    return {"floor": floor_value, "ceil": ceil_value}  # @step:complete
