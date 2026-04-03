def pairwise_sorting_network(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    if array_length <= 1:
        return sorted_array  # @step:complete

    def compare_and_swap(first_index: int, second_index: int) -> None:
        if first_index < array_length and second_index < array_length:
            if sorted_array[first_index] > sorted_array[second_index]:
                # @step:swap
                temporary_value = sorted_array[first_index]  # @step:swap
                sorted_array[first_index] = sorted_array[second_index]  # @step:swap
                sorted_array[second_index] = temporary_value  # @step:swap

    outer_stride = 1
    while outer_stride < array_length:  # @step:compare
        inner_stride = outer_stride
        while inner_stride >= 1:  # @step:compare
            base_index = inner_stride % outer_stride
            while base_index + inner_stride < array_length:  # @step:compare
                pair_index = 0
                while pair_index < inner_stride and base_index + pair_index + inner_stride < array_length:  # @step:compare
                    compare_and_swap(base_index + pair_index, base_index + pair_index + inner_stride)  # @step:compare
                    pair_index += 1
                base_index += inner_stride * 2
            inner_stride = inner_stride // 2 if inner_stride > 1 else 0
        outer_stride *= 2

    # @step:mark-sorted

    return sorted_array  # @step:complete
