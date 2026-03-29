# Decode Ways tabulation — count decoding possibilities for a digit string bottom-up
def decode_ways_tabulation(digits: str) -> int:  # @step:initialize
    digit_count = len(digits)  # @step:initialize
    if digit_count == 0:  # @step:initialize
        return 0  # @step:initialize
    dp_table = [0] * (digit_count + 1)  # @step:initialize
    dp_table[0] = 1  # @step:fill-table
    # A string of one digit can be decoded iff it is not '0'
    dp_table[1] = 0 if digits[0] == "0" else 1  # @step:fill-table
    for position in range(2, digit_count + 1):  # @step:read-cache
        single_digit = int(digits[position - 1])  # @step:read-cache
        if 1 <= single_digit <= 9:  # @step:read-cache
            dp_table[position] += dp_table[position - 1]  # @step:read-cache
        two_digit_value = int(digits[position - 2 : position])  # @step:read-cache
        if 10 <= two_digit_value <= 26:  # @step:read-cache
            dp_table[position] += dp_table[position - 2]  # @step:read-cache
        # @step:compute-cell
    return dp_table[digit_count]  # @step:complete
