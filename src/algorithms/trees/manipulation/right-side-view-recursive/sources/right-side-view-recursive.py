# Right Side View Recursive — DFS: visit right child first, record first node seen at each depth

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def right_side_view_recursive(root) -> list:
    result = []  # @step:initialize

    def dfs(node, depth: int) -> None:
        if node is None:  # @step:initialize
            return

        # First node encountered at this depth is visible from the right
        if depth == len(result):  # @step:visit
            result.append(node.value)  # @step:collect-element

        # Visit right child first to ensure rightmost value is recorded first
        dfs(node.right, depth + 1)  # @step:traverse-right
        dfs(node.left, depth + 1)  # @step:traverse-left

    dfs(root, 0)  # @step:initialize
    return result  # @step:complete
