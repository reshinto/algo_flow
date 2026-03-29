# Min Cost Climbing Stairs tabulation — minimum cost to reach the top
def min_cost_climbing_stairs_tabulation(costs: list[int]) -> int:  # @step:initialize
    stair_count = len(costs)  # @step:initialize
    if stair_count == 0:  # @step:initialize
        return 0  # @step:initialize
    dp_table = [0] * (stair_count + 1)  # @step:initialize,fill-table
    dp_table[0] = 0  # @step:fill-table
    dp_table[1] = 0  # @step:fill-table
    # Each entry is the minimum cost to reach that step from either one or two steps below
    for current_step in range(2, stair_count + 1):  # @step:compute-cell
        dp_table[current_step] = min(
            dp_table[current_step - 1] + costs[current_step - 1],  # @step:compute-cell,read-cache
            dp_table[current_step - 2] + costs[current_step - 2],  # @step:compute-cell,read-cache
        )
    return dp_table[stair_count]  # @step:complete
