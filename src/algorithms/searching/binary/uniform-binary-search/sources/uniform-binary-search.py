import math

def uniform_binary_search(sorted_array: list[int], target_value: int) -> int:  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    if array_length == 0:  # @step:initialize
        return -1  # @step:initialize

    # Build the delta lookup table: delta[k] = ceil(delta[k-1] / 2)
    delta_table: list[int] = []  # @step:initialize
    delta_value = math.ceil(array_length / 2)  # @step:initialize
    while delta_value > 0:  # @step:initialize
        delta_table.append(delta_value)  # @step:initialize
        if delta_value == 1:  # @step:initialize
            break  # @step:initialize
        delta_value = math.ceil(delta_value / 2)  # @step:initialize

    current_index = delta_table[0] - 1  # @step:initialize
    step_level = 0  # @step:initialize

    while True:  # @step:compare
        current_value = sorted_array[current_index]  # @step:compare

        if current_value == target_value:  # @step:compare,found
            return current_index  # @step:found

        step_level += 1  # @step:eliminate
        if step_level >= len(delta_table):  # @step:eliminate
            break  # @step:eliminate

        next_delta = delta_table[step_level]  # @step:eliminate

        if current_value < target_value:  # @step:eliminate
            # Move right
            current_index += next_delta  # @step:eliminate
            if current_index >= array_length:  # @step:eliminate
                break  # @step:eliminate
        else:  # @step:eliminate
            # Move left
            current_index -= next_delta  # @step:eliminate
            if current_index < 0:  # @step:eliminate
                break  # @step:eliminate

    return -1  # @step:complete
