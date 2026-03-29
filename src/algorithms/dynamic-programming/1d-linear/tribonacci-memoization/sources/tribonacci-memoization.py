# Tribonacci memoization — top-down recursion with cached subproblems

def tribonacci_memoization(target_index: int, memo: dict = None) -> int:
    if memo is None:
        memo = {}  # @step:initialize
    if target_index == 0:  # @step:initialize
        return 0  # @step:initialize
    if target_index <= 2:  # @step:initialize
        return 1  # @step:initialize
    if target_index in memo:  # @step:read-cache
        return memo[target_index]  # @step:read-cache
    # Recursively compute the three preceding subproblems and cache the result
    result = (
        tribonacci_memoization(target_index - 1, memo) +  # @step:compute-cell
        tribonacci_memoization(target_index - 2, memo) +  # @step:compute-cell
        tribonacci_memoization(target_index - 3, memo)    # @step:compute-cell
    )
    memo[target_index] = result  # @step:compute-cell
    return result  # @step:complete
