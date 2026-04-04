import math


def cube_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    if array_length <= 1:  # @step:initialize
        return sorted_array  # @step:initialize

    # Compute block size as cube root of array length
    block_size = max(1, math.ceil(array_length ** (1 / 3)))  # @step:initialize

    # Phase 1: Insertion sort each block
    block_count = math.ceil(array_length / block_size)
    for block_index in range(block_count):  # @step:divide-block
        block_start = block_index * block_size  # @step:divide-block
        block_end = min(block_start + block_size, array_length)  # @step:divide-block

        for outer_index in range(block_start + 1, block_end):
            current_value = sorted_array[outer_index]  # @step:compare
            inner_index = outer_index - 1

            while inner_index >= block_start and sorted_array[inner_index] > current_value:  # @step:swap
                sorted_array[inner_index + 1] = sorted_array[inner_index]  # @step:swap
                inner_index -= 1
            sorted_array[inner_index + 1] = current_value  # @step:swap

    # Phase 2: K-way merge of all sorted blocks
    result_array: list[int] = [0] * array_length
    block_pointers = [block_index * block_size for block_index in range(block_count)]

    for result_index in range(array_length):  # @step:merge-blocks
        minimum_value = float("inf")
        minimum_block = -1

        for block_index in range(block_count):  # @step:compare
            pointer = block_pointers[block_index]
            block_end = min((block_index + 1) * block_size, array_length)

            if pointer < block_end:  # @step:compare
                if sorted_array[pointer] < minimum_value:  # @step:compare
                    minimum_value = sorted_array[pointer]
                    minimum_block = block_index

        result_array[result_index] = minimum_value  # @step:merge-blocks
        block_pointers[minimum_block] += 1  # @step:merge-blocks

    # Copy result back
    for copy_index in range(array_length):
        sorted_array[copy_index] = result_array[copy_index]  # @step:mark-sorted

    return sorted_array  # @step:complete
