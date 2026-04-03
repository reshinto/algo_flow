def spaghetti_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    original_array = input_array.copy()  # @step:initialize
    array_length = len(original_array)  # @step:initialize

    remaining_strands = original_array.copy()  # @step:initialize
    sorted_result: list[int] = []  # @step:initialize

    # Repeatedly find and remove the tallest strand (maximum element)
    for _ in range(array_length):  # @step:find-tallest
        tallest_index = 0  # @step:find-tallest
        tallest_value = remaining_strands[0]  # @step:find-tallest

        # Scan all remaining strands to find the tallest
        for scan_index in range(1, len(remaining_strands)):  # @step:compare
            if remaining_strands[scan_index] > tallest_value:  # @step:compare
                tallest_index = scan_index  # @step:compare
                tallest_value = remaining_strands[scan_index]  # @step:compare

        # Remove the tallest strand and prepend it to build ascending result
        remaining_strands.pop(tallest_index)  # @step:swap
        sorted_result.insert(0, tallest_value)  # @step:swap

        # @step:mark-sorted

    return sorted_result  # @step:complete
