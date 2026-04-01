def find_peak_element(array: list[int]) -> int:  # @step:initialize
    low_index = 0  # @step:initialize
    high_index = len(array) - 1  # @step:initialize

    while low_index < high_index:
        mid_index = (low_index + high_index) // 2  # @step:compare
        mid_value = array[mid_index]  # @step:compare
        next_value = array[mid_index + 1]  # @step:compare

        if mid_value < next_value:  # @step:eliminate
            # Slope is ascending — peak must be to the right
            low_index = mid_index + 1  # @step:eliminate
        else:  # @step:eliminate
            # Slope is descending or flat — peak is at mid or to the left
            high_index = mid_index  # @step:eliminate

    return low_index  # @step:found,complete
