def stalin_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    original_array = input_array.copy()  # @step:initialize
    array_length = len(original_array)  # @step:initialize

    if array_length == 0:
        return []  # @step:complete

    surviving_elements: list[int] = [original_array[0]]  # @step:initialize — first element always survives
    current_maximum = original_array[0]  # @step:initialize

    for scan_index in range(1, array_length):  # @step:compare
        candidate_value = original_array[scan_index]  # @step:compare

        if candidate_value >= current_maximum:  # @step:compare
            # Element is in order — keep it
            current_maximum = candidate_value  # @step:compare
            surviving_elements.append(candidate_value)  # @step:compare — keep
        # Otherwise the element is eliminated (out of order)
        # @step:compare — eliminate

    return surviving_elements  # @step:complete
