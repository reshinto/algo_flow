# Min Cost Climbing Stairs memoization — top-down recursion with cached subproblems

def min_cost_climbing_stairs_memoization(costs: list[int]) -> int:
    memo: dict[int, int] = {}  # @step:initialize

    def compute_memo(step: int) -> int:
        if step <= 1:  # @step:initialize
            return 0  # @step:initialize
        if step in memo:  # @step:read-cache
            return memo[step]  # @step:read-cache
        # Recursively compute the minimum cost from each of the two preceding steps, cache to avoid recomputation
        # @step:push-call
        cost_from_one = compute_memo(step - 1) + costs[step - 1]  # @step:compute-cell
        cost_from_two = compute_memo(step - 2) + costs[step - 2]  # @step:compute-cell
        result = min(cost_from_one, cost_from_two)  # @step:compute-cell
        memo[step] = result  # @step:compute-cell
        # @step:pop-call
        return result  # @step:complete

    return compute_memo(len(costs))
