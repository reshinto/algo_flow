# LIS (Longest Increasing Subsequence) memoization — top-down recursion with cached subproblems

def lis_memoization(sequence: list[int]) -> int:
    sequence_length = len(sequence)  # @step:initialize
    if sequence_length == 0:  # @step:initialize
        return 0  # @step:initialize
    memo: dict[int, int] = {}  # @step:initialize

    def lis(start_index: int) -> int:
        if start_index in memo:  # @step:read-cache
            return memo[start_index]  # @step:read-cache
        # @step:push-call
        max_length = 1  # @step:compute-cell
        for next_index in range(start_index + 1, sequence_length):  # @step:compute-cell
            if sequence[next_index] > sequence[start_index]:  # @step:compute-cell
                sub_length = 1 + lis(next_index)  # @step:compute-cell
                if sub_length > max_length:  # @step:compute-cell
                    max_length = sub_length  # @step:compute-cell
        memo[start_index] = max_length  # @step:compute-cell
        return max_length  # @step:pop-call

    result = 0  # @step:compute-cell
    for start_index in range(sequence_length):  # @step:compute-cell
        lis_length = lis(start_index)  # @step:compute-cell
        if lis_length > result:  # @step:compute-cell
            result = lis_length  # @step:compute-cell

    return result  # @step:complete
