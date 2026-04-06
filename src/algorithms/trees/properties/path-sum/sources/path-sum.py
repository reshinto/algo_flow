# Path Sum — recursive DFS: check if any root-to-leaf path sums to target

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def path_sum(root, target_sum: int) -> bool:
    if root is None:  # @step:initialize
        return False

    # Leaf node — check if remaining sum equals node value
    if root.left is None and root.right is None:  # @step:visit
        return root.value == target_sum  # @step:check-balance

    remaining = target_sum - root.value  # @step:compute-value

    # Recurse on left and right subtrees
    found_left = path_sum(root.left, remaining)  # @step:traverse-left
    if found_left:  # @step:check-balance
        return True

    found_right = path_sum(root.right, remaining)  # @step:traverse-right
    return found_right  # @step:complete
