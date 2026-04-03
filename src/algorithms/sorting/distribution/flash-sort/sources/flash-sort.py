import math


def flash_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    if array_length <= 1:
        return sorted_array  # @step:complete

    min_value = sorted_array[0]  # @step:initialize
    max_index = 0  # @step:initialize
    for scan_index in range(1, array_length):  # @step:initialize
        if sorted_array[scan_index] < min_value:
            min_value = sorted_array[scan_index]  # @step:initialize
        if sorted_array[scan_index] > sorted_array[max_index]:
            max_index = scan_index  # @step:initialize

    if sorted_array[max_index] == min_value:
        return sorted_array  # @step:complete

    class_count = max(1, math.floor(0.45 * array_length))  # @step:initialize
    class_vector = [0] * class_count  # @step:initialize
    scale_factor = (class_count - 1) / (sorted_array[max_index] - min_value)  # @step:initialize

    # Classify — count how many elements fall in each class
    for classify_index in range(array_length):  # @step:classify
        class_index = math.floor(scale_factor * (sorted_array[classify_index] - min_value))  # @step:classify
        class_vector[class_index] += 1  # @step:classify

    # Compute prefix sums (class upper boundaries)
    for prefix_index in range(1, class_count):  # @step:classify
        class_vector[prefix_index] += class_vector[prefix_index - 1]  # @step:classify

    # Swap maximum element to front temporarily
    sorted_array[0], sorted_array[max_index] = sorted_array[max_index], sorted_array[0]  # @step:swap

    cycle_index = 0  # @step:swap
    permutations_done = 0  # @step:swap

    while permutations_done < array_length - 1:  # @step:swap
        while cycle_index >= class_vector[math.floor(scale_factor * (sorted_array[cycle_index] - min_value))]:  # @step:compare
            cycle_index += 1  # @step:compare
        hold_value = sorted_array[cycle_index]  # @step:swap
        target_class = math.floor(scale_factor * (hold_value - min_value))  # @step:swap

        while cycle_index != class_vector[target_class] - 1:  # @step:swap
            target_class = math.floor(scale_factor * (hold_value - min_value))  # @step:swap
            target_position = class_vector[target_class] - 1  # @step:swap
            new_hold = sorted_array[target_position]  # @step:swap
            sorted_array[target_position] = hold_value  # @step:swap
            hold_value = new_hold  # @step:swap
            class_vector[target_class] -= 1  # @step:swap
            permutations_done += 1  # @step:swap
        # Place the final held value at cycle_index to complete this cycle
        sorted_array[cycle_index] = hold_value  # @step:swap
        permutations_done += 1  # @step:swap

    # Insertion sort pass to clean up small disorder within classes
    for outer_index in range(1, array_length):  # @step:insertion-pass
        current_value = sorted_array[outer_index]  # @step:insertion-pass
        insert_position = outer_index - 1  # @step:insertion-pass

        while insert_position >= 0 and sorted_array[insert_position] > current_value:  # @step:compare
            sorted_array[insert_position + 1] = sorted_array[insert_position]  # @step:swap
            insert_position -= 1  # @step:swap
        sorted_array[insert_position + 1] = current_value  # @step:mark-sorted

    return sorted_array  # @step:complete
