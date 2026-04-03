import math

def odd_even_merge_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    if array_length <= 1:
        return sorted_array  # @step:complete

    # Batcher's odd-even transposition sort:
    # Alternates between odd-phase and even-phase compare-swap passes
    total_rounds = math.ceil(array_length / 2) * 2  # @step:merge

    for round_index in range(total_rounds):  # @step:compare
        is_odd_round = round_index % 2 == 0  # @step:compare
        start_index = 0 if is_odd_round else 1  # @step:compare

        left_index = start_index
        while left_index + 1 < array_length:  # @step:compare
            if sorted_array[left_index] > sorted_array[left_index + 1]:  # @step:compare
                # @step:swap
                temporary_value = sorted_array[left_index]  # @step:swap
                sorted_array[left_index] = sorted_array[left_index + 1]  # @step:swap
                sorted_array[left_index + 1] = temporary_value  # @step:swap
            left_index += 2

    # @step:mark-sorted

    return sorted_array  # @step:complete
