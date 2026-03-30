# Four Sum II — count tuples (i,j,k,l) such that A[i]+B[j]+C[k]+D[l] == 0
def four_sum_ii(nums_a, nums_b, nums_c, nums_d):
    pair_sum_counts = {}  # @step:initialize

    # Phase 1: build map of all A+B pair sums with their occurrence counts
    for outer_val in nums_a:
        for inner_val in nums_b:
            pair_sum = outer_val + inner_val
            if pair_sum in pair_sum_counts:
                pair_sum_counts[pair_sum] += 1  # @step:increment-count
            else:
                pair_sum_counts[pair_sum] = 1  # @step:insert-key

    # Phase 2: for each C+D pair, check if its negation exists in the map
    tuple_count = 0
    for outer_val in nums_c:
        for inner_val in nums_d:
            complement = -(outer_val + inner_val)
            if complement in pair_sum_counts:
                tuple_count += pair_sum_counts[complement]  # @step:key-found
            # @step:key-not-found

    return tuple_count  # @step:complete
