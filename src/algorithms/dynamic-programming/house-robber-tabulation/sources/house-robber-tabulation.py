# House Robber tabulation — build DP table iteratively from base cases
def house_robber_tabulation(houses: list[int]) -> int:  # @step:initialize
    if len(houses) == 0:  # @step:initialize
        return 0  # @step:initialize
    if len(houses) == 1:  # @step:initialize,fill-table
        return houses[0]  # @step:initialize,fill-table
    dp_table = [0] * len(houses)  # @step:initialize,fill-table
    dp_table[0] = houses[0]  # @step:fill-table
    dp_table[1] = max(houses[0], houses[1])  # @step:fill-table
    # Each entry is max(rob current + dp[i-2], skip current = dp[i-1])
    for house_index in range(2, len(houses)):  # @step:compute-cell
        dp_table[house_index] = max(dp_table[house_index - 1], dp_table[house_index - 2] + houses[house_index])  # @step:compute-cell,read-cache
    return dp_table[len(houses) - 1]  # @step:complete
