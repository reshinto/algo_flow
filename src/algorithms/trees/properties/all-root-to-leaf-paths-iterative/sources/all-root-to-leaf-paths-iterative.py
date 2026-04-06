# All Root-to-Leaf Paths (Iterative) — stack-based with path tracking

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def all_root_to_leaf_paths_iterative(root) -> list:
    if root is None:  # @step:initialize
        return []

    paths = []  # @step:initialize
    stack = [(root, str(root.value))]  # @step:initialize

    while stack:  # @step:visit
        current, path_so_far = stack.pop()  # @step:visit

        # Leaf node — record complete path
        if current.left is None and current.right is None:  # @step:check-balance
            paths.append(path_so_far)  # @step:add-to-result

        if current.right is not None:  # @step:traverse-right
            stack.append((current.right, f"{path_so_far}->{current.right.value}"))  # @step:traverse-right

        if current.left is not None:  # @step:traverse-left
            stack.append((current.left, f"{path_so_far}->{current.left.value}"))  # @step:traverse-left

    return paths  # @step:complete
