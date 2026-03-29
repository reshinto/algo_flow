# 0/1 Knapsack (Tabulation) — max value from items with weight/value pairs within capacity
def knapsack_01(weights: list[int], values: list[int], capacity: int) -> int:  # @step:initialize
    item_count = len(weights)  # @step:initialize
    dp_table = [0] * (capacity + 1)  # @step:initialize,fill-table
    # For each item, iterate capacity right-to-left to enforce 0/1 constraint
    for item_index in range(item_count):  # @step:compute-cell
        item_weight = weights[item_index]  # @step:compute-cell
        item_value = values[item_index]  # @step:compute-cell
        for capacity_w in range(capacity, item_weight - 1, -1):  # @step:read-cache
            without_item = dp_table[capacity_w]  # @step:read-cache
            with_item = dp_table[capacity_w - item_weight] + item_value  # @step:read-cache
            if with_item > without_item:
                dp_table[capacity_w] = with_item  # @step:compute-cell
    return dp_table[capacity]  # @step:complete
