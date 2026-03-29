# Climbing stairs memoization — top-down recursion with cached subproblems

def climbing_stairs_memoization(number_of_stairs: int, memo: dict = None) -> int:
    if memo is None:
        memo = {}  # @step:initialize
    if number_of_stairs <= 1:  # @step:initialize
        return 1  # @step:initialize
    if number_of_stairs in memo:  # @step:read-cache
        return memo[number_of_stairs]  # @step:read-cache
    # Recursively count distinct ways from the previous two steps, cache to avoid recomputation
    # @step:push-call
    result = (
        climbing_stairs_memoization(number_of_stairs - 1, memo) +  # @step:compute-cell
        climbing_stairs_memoization(number_of_stairs - 2, memo)    # @step:compute-cell
    )
    memo[number_of_stairs] = result  # @step:compute-cell
    # @step:pop-call
    return result  # @step:complete
