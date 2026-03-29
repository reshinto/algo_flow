# Fibonacci memoization — top-down recursion with cached subproblems

def fibonacci_memoization(target_index: int, memo: dict = None) -> int:
    if memo is None:
        memo = {}  # @step:initialize
    if target_index <= 1:  # @step:initialize
        return target_index  # @step:initialize
    if target_index in memo:  # @step:read-cache
        return memo[target_index]  # @step:read-cache
    # Recursively compute subproblems and cache the result to avoid recomputation
    result = (
        fibonacci_memoization(target_index - 1, memo) +  # @step:compute-cell
        fibonacci_memoization(target_index - 2, memo)    # @step:compute-cell
    )
    memo[target_index] = result  # @step:compute-cell
    return result  # @step:complete
