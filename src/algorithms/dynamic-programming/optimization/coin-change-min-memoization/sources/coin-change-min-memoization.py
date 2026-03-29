# Coin Change Minimum — top-down memoization: find the fewest coins summing to target amount

def coin_change_min_memoization(amount: int, coins: list[int]) -> int:
    memo: dict[int, int] = {}  # @step:initialize
    if amount == 0:  # @step:initialize
        return 0  # @step:initialize

    def min_coins(remaining: int) -> int:
        if remaining == 0:  # @step:fill-table
            memo[0] = 0  # @step:fill-table
            return 0  # @step:fill-table
        if remaining < 0:  # @step:fill-table
            return -1  # @step:fill-table
        if remaining in memo:  # @step:read-cache
            return memo[remaining]  # @step:read-cache
        # Recursively try each coin and cache the minimum result
        # @step:push-call
        best_result = -1
        for coin in coins:  # @step:compute-cell
            sub_result = min_coins(remaining - coin)  # @step:compute-cell
            if sub_result >= 0:  # @step:compute-cell
                candidate = sub_result + 1  # @step:compute-cell
                if best_result == -1 or candidate < best_result:  # @step:compute-cell
                    best_result = candidate  # @step:compute-cell
        memo[remaining] = best_result  # @step:compute-cell
        return best_result  # @step:pop-call

    return min_coins(amount)  # @step:complete
