def bozo_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    max_iterations = 200  # @step:initialize

    # Seeded linear congruential generator for deterministic behavior
    seed = 42  # @step:initialize

    def next_random() -> int:
        nonlocal seed
        seed = (seed * 1103515245 + 12345) & 0x7fffffff
        return seed

    def is_sorted() -> bool:  # @step:check-sorted
        for check_index in range(array_length - 1):  # @step:compare
            if sorted_array[check_index] > sorted_array[check_index + 1]:  # @step:compare
                return False  # @step:compare
        return True  # @step:check-sorted

    iteration_count = 0
    while not is_sorted() and iteration_count < max_iterations:
        # Pick two random distinct indices and swap them
        first_swap_index = next_random() % array_length  # @step:swap
        second_swap_index = next_random() % array_length  # @step:swap

        if first_swap_index != second_swap_index:  # @step:swap
            temporary_value = sorted_array[first_swap_index]  # @step:swap
            sorted_array[first_swap_index] = sorted_array[second_swap_index]  # @step:swap
            sorted_array[second_swap_index] = temporary_value  # @step:swap

        iteration_count += 1

    return sorted_array  # @step:complete
