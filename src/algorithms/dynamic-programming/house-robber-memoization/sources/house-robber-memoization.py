# House Robber memoization — top-down recursion with cached subproblems

def house_robber_memoization(houses: list[int], memo: dict = None) -> int:
    if memo is None:
        memo = {}  # @step:initialize
    if len(houses) == 0:  # @step:initialize
        return 0  # @step:initialize
    if len(houses) == 1:  # @step:initialize
        return houses[0]  # @step:initialize

    def rob(house_index: int) -> int:
        if house_index == 0:  # @step:fill-table
            memo[0] = houses[0]  # @step:fill-table
            return houses[0]  # @step:fill-table
        if house_index == 1:  # @step:fill-table
            base_value = max(houses[0], houses[1])  # @step:fill-table
            memo[1] = base_value  # @step:fill-table
            return base_value  # @step:fill-table
        if house_index in memo:  # @step:read-cache
            return memo[house_index]  # @step:read-cache
        # Recursively compute skip vs rob decision and cache the result
        # @step:push-call
        skip_current = rob(house_index - 1)  # @step:compute-cell
        rob_current = rob(house_index - 2) + houses[house_index]  # @step:compute-cell
        max_profit = max(skip_current, rob_current)  # @step:compute-cell
        memo[house_index] = max_profit  # @step:compute-cell
        return max_profit  # @step:pop-call

    return rob(len(houses) - 1)  # @step:complete
