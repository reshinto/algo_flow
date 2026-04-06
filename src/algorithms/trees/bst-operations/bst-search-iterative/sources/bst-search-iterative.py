# BST Search (Iterative) — while loop binary search, no recursion

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_search_iterative(root, target: int):
    current = root  # @step:initialize

    while current is not None:
        if current.value == target:  # @step:found
            return current

        if target < current.value:
            # Target is smaller — move left
            current = current.left  # @step:search-node
        else:
            # Target is larger — move right
            current = current.right  # @step:search-node

    return None  # @step:complete
