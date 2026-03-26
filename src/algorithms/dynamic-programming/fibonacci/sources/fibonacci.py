def fibonacci_tabulation(target_index: int) -> int:
    if target_index <= 1:
        return target_index
    dp_table = [0] * (target_index + 1)
    dp_table[1] = 1
    for current_index in range(2, target_index + 1):
        dp_table[current_index] = dp_table[current_index - 1] + dp_table[current_index - 2]
    return dp_table[target_index]
