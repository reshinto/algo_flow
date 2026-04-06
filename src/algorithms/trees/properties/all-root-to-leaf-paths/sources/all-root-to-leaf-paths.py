# All Root-to-Leaf Paths — recursive DFS collecting all paths as strings

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def all_root_to_leaf_paths(root) -> list:
    paths = []  # @step:initialize

    def dfs(node, current_path: str) -> None:
        if node is None:  # @step:initialize
            return

        path_so_far = f"{current_path}->{node.value}" if current_path else str(node.value)  # @step:visit

        # Leaf node — record this complete path
        if node.left is None and node.right is None:  # @step:visit
            paths.append(path_so_far)  # @step:add-to-result
            return

        dfs(node.left, path_so_far)  # @step:traverse-left
        dfs(node.right, path_so_far)  # @step:traverse-right

    dfs(root, "")  # @step:initialize
    return paths  # @step:complete
