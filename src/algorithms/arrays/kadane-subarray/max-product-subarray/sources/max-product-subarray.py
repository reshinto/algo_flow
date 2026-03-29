# Max Product Subarray — O(n) tracking both max and min products to handle negative flips
def max_product_subarray(input_array: list[int]) -> dict:
    array_length = len(input_array)

    if array_length == 0:  # @step:initialize
        return {"max_product": 0, "start_index": 0, "end_index": 0}  # @step:initialize

    current_max = input_array[0]  # @step:initialize
    current_min = input_array[0]  # @step:initialize
    global_max = input_array[0]  # @step:initialize
    current_start = 0
    best_start = 0
    best_end = 0

    for scan_index in range(1, array_length):
        current_element = input_array[scan_index]  # @step:compare

        # When multiplying by a negative, max and min swap roles
        if current_element < 0:  # @step:compare
            current_max, current_min = current_min, current_max  # @step:compare

        # Extend or restart the subarray
        current_max = max(current_element, current_max * current_element)  # @step:compare
        current_min = min(current_element, current_min * current_element)  # @step:compare

        if current_max == current_element:  # @step:compare
            current_start = scan_index  # @step:compare

        if current_max > global_max:  # @step:compare
            global_max = current_max  # @step:compare
            best_start = current_start  # @step:compare
            best_end = scan_index  # @step:compare

    return {"max_product": global_max, "start_index": best_start, "end_index": best_end}  # @step:complete
