# Count Bits tabulation — dp[i] = number of 1-bits in binary representation of i
def count_bits(target_number: int) -> list[int]:  # @step:initialize
    dp_table = [0] * (target_number + 1)  # @step:initialize,fill-table
    # dp[0] = 0: zero has no set bits
    for bit_index in range(1, target_number + 1):  # @step:compute-cell
        # Half the number shares all bits except possibly the LSB
        dp_table[bit_index] = dp_table[bit_index >> 1] + (bit_index & 1)  # @step:compute-cell,read-cache
    return dp_table  # @step:complete
