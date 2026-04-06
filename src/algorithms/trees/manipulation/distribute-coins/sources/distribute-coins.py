# Distribute Coins — DFS: each node sends or receives excess coins from children

class BinaryNode:
    def __init__(self, value: int):
        self.value = value  # number of coins at this node
        self.left = None
        self.right = None

def distribute_coins(root) -> int:
    total_moves = 0  # @step:initialize

    def dfs(node) -> int:
        nonlocal total_moves
        if node is None:  # @step:initialize
            return 0

        # Get excess from left and right children
        left_excess = dfs(node.left)  # @step:traverse-left
        right_excess = dfs(node.right)  # @step:traverse-right

        # Each move on the edge to a child counts
        total_moves += abs(left_excess) + abs(right_excess)  # @step:accumulate

        # Excess this node sends upward: (coins here) + (excess from children) - 1 (keep 1)
        return node.value + left_excess + right_excess - 1  # @step:visit

    dfs(root)  # @step:initialize
    return total_moves  # @step:complete
