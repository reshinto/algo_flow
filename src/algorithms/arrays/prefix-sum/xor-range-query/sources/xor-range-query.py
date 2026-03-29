# XOR Range Query — O(n) build, O(1) per query via prefix XOR difference
def xor_range_query(input_array: list[int], queries: list[list[int]]) -> dict:
    prefix_xor = [0] * (len(input_array) + 1)  # @step:initialize

    # Build prefix XOR array where prefix_xor[i] = XOR of input_array[0..i-1]
    for build_index in range(len(input_array)):  # @step:visit
        prefix_xor[build_index + 1] = prefix_xor[build_index] ^ input_array[build_index]  # @step:visit

    query_results = []  # @step:compare

    # Answer range XOR queries in O(1) each using prefix XOR difference
    for current_query in queries:
        left_bound = current_query[0]
        right_bound = current_query[1]
        range_xor = prefix_xor[right_bound + 1] ^ prefix_xor[left_bound]  # @step:compare
        query_results.append(range_xor)  # @step:compare

    return {"prefix_xor": prefix_xor[1:], "query_results": query_results}  # @step:complete
