# Integer Break memoization — top-down recursion to maximize product of parts

def integer_break_memoization(target_number: int, memo: dict = None) -> int:
    if memo is None:
        memo = {}  # @step:initialize
    if target_number == 1:  # @step:initialize
        return 1  # @step:initialize
    if target_number in memo:  # @step:read-cache
        return memo[target_number]  # @step:read-cache
    # Recursively compute the maximum product of parts and cache the result
    # @step:push-call
    max_product = 0  # @step:compute-cell
    for part_size in range(1, target_number):  # @step:compute-cell
        remainder = target_number - part_size  # @step:compute-cell
        split_product = part_size * remainder  # @step:compute-cell
        recurse_product = part_size * integer_break_memoization(remainder, memo)  # @step:compute-cell
        max_product = max(max_product, split_product, recurse_product)  # @step:compute-cell
    memo[target_number] = max_product  # @step:compute-cell
    return max_product  # @step:pop-call
