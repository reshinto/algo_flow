# Prefix Sum — O(n) build, O(1) per query via prefix difference
def prefix_sum(input_array: list[int], queries: list[list[int]]) -> dict:
    prefix_array = [0] * (len(input_array) + 1)  # @step:initialize

    # Build prefix sum array where prefix_array[i] = sum of input_array[0..i-1]
    for scan_index in range(len(input_array)):  # @step:visit
        prefix_array[scan_index + 1] = prefix_array[scan_index] + input_array[scan_index]  # @step:visit

    query_results = []  # @step:compare

    # Answer range queries in O(1) each using prefix difference
    for current_query in queries:
        left_bound = current_query[0]
        right_bound = current_query[1]
        range_sum = prefix_array[right_bound + 1] - prefix_array[left_bound]  # @step:compare
        query_results.append(range_sum)  # @step:compare

    return {"prefix_array": prefix_array[1:], "query_results": query_results}  # @step:complete
