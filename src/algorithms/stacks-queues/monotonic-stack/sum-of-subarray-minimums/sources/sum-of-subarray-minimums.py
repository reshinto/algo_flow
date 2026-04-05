# Sum of Subarray Minimums — for each element, compute its contribution as minimum across subarrays using monotonic stack
def sum_of_subarray_minimums(arr):
    MOD = 1_000_000_007  # @step:initialize
    array_length = len(arr)  # @step:initialize
    left_distances = [0] * array_length  # @step:initialize
    right_distances = [0] * array_length  # @step:initialize
    index_stack = []  # @step:initialize

    # Compute left distances: distance to previous less element
    for element_idx in range(array_length):  # @step:visit
        current_value = arr[element_idx]  # @step:visit
        # Pop while stack top has value >= current (not strictly less)
        while index_stack and arr[index_stack[-1]] >= current_value:  # @step:compare
            index_stack.pop()  # @step:maintain-monotonic
        left_distances[element_idx] = (
            element_idx + 1 if not index_stack else element_idx - index_stack[-1]
        )  # @step:resolve
        index_stack.append(element_idx)  # @step:push

    index_stack.clear()  # @step:initialize

    # Compute right distances: distance to next less-or-equal element
    for element_idx in range(array_length - 1, -1, -1):  # @step:visit
        current_value = arr[element_idx]  # @step:visit
        # Pop while stack top has value > current (strictly greater — allows equal on right)
        while index_stack and arr[index_stack[-1]] > current_value:  # @step:compare
            index_stack.pop()  # @step:maintain-monotonic
        right_distances[element_idx] = (
            array_length - element_idx if not index_stack else index_stack[-1] - element_idx
        )  # @step:resolve
        index_stack.append(element_idx)  # @step:push

    # Sum contributions: each element contributes arr[i] * left[i] * right[i]
    result = 0  # @step:initialize
    for element_idx in range(array_length):  # @step:resolve
        result = (
            result + arr[element_idx] * left_distances[element_idx] * right_distances[element_idx]
        ) % MOD  # @step:resolve

    return result  # @step:complete
