# Is Balanced Tree (Iterative) — bottom-up post-order using stack with height tracking

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def is_balanced_tree_iterative(root) -> bool:
    if root is None:  # @step:initialize
        return True

    stack = [{"node": root, "phase": 0}]  # @step:initialize
    heights = {}  # @step:initialize

    while stack:  # @step:visit
        entry = stack[-1]  # @step:visit
        node = entry["node"]  # @step:visit

        if entry["phase"] == 0:
            entry["phase"] = 1  # @step:visit
            if node.left is not None:  # @step:traverse-left
                stack.append({"node": node.left, "phase": 0})  # @step:traverse-left
        elif entry["phase"] == 1:
            entry["phase"] = 2  # @step:visit
            if node.right is not None:  # @step:traverse-right
                stack.append({"node": node.right, "phase": 0})  # @step:traverse-right
        else:
            stack.pop()  # @step:visit
            left_height = heights.get(id(node.left), 0) if node.left else 0  # @step:check-balance
            right_height = heights.get(id(node.right), 0) if node.right else 0  # @step:check-balance

            if abs(left_height - right_height) > 1:  # @step:check-balance
                return False

            heights[id(node)] = max(left_height, right_height) + 1  # @step:update-height

    return True  # @step:complete
