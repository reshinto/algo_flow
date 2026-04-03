def bogo_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    max_iterations = 100  # @step:initialize

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

    def shuffle_array() -> None:  # @step:shuffle
        for shuffle_index in range(array_length - 1, 0, -1):  # @step:shuffle
            swap_target = next_random() % (shuffle_index + 1)  # @step:shuffle
            temporary_value = sorted_array[shuffle_index]  # @step:swap
            sorted_array[shuffle_index] = sorted_array[swap_target]  # @step:swap
            sorted_array[swap_target] = temporary_value  # @step:swap

    iteration_count = 0
    while not is_sorted() and iteration_count < max_iterations:
        shuffle_array()
        iteration_count += 1

    # @step:mark-sorted

    return sorted_array  # @step:complete
