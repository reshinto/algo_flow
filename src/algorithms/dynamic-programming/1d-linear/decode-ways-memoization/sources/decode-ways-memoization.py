# Decode Ways memoization — count decoding possibilities for a digit string top-down

def decode_ways_memoization(digits: str, memo: dict = None) -> int:
    if memo is None:
        memo = {}  # @step:initialize
    digit_count = len(digits)  # @step:initialize
    if digit_count == 0:  # @step:initialize
        return 0  # @step:initialize

    def decode(position: int) -> int:
        if position == 0:  # @step:fill-table
            return 1  # @step:fill-table
        if position in memo:  # @step:read-cache
            return memo[position]  # @step:read-cache
        # Recursively count ways using single and double digit decoding
        # @step:push-call
        ways = 0  # @step:compute-cell
        single_digit = int(digits[position - 1])  # @step:compute-cell
        if 1 <= single_digit <= 9:  # @step:compute-cell
            ways += decode(position - 1)  # @step:compute-cell
        if position >= 2:  # @step:compute-cell
            two_digit_value = int(digits[position - 2 : position])  # @step:compute-cell
            if 10 <= two_digit_value <= 26:  # @step:compute-cell
                ways += decode(position - 2)  # @step:compute-cell
        memo[position] = ways  # @step:compute-cell
        return ways  # @step:pop-call

    return decode(digit_count)  # @step:complete
