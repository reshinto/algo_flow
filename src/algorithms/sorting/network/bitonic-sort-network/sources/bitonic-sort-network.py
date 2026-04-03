import sys

def bitonic_sort_network(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    original_length = len(sorted_array)  # @step:initialize

    # Pad to next power of 2 with large sentinel values
    padded_length = 1  # @step:initialize
    while padded_length < original_length:  # @step:initialize
        padded_length *= 2  # @step:initialize
    while len(sorted_array) < padded_length:  # @step:initialize
        sorted_array.append(sys.maxsize)  # @step:initialize

    # Bitonic sort network: log2(n) stages, each with sub-stages of compare-swap pairs
    stage_size = 2
    while stage_size <= padded_length:  # @step:compare
        sub_size = stage_size
        while sub_size >= 2:  # @step:compare
            half_sub_size = sub_size // 2  # @step:compare
            for element_index in range(padded_length):  # @step:compare
                partner_index = element_index ^ half_sub_size  # @step:compare
                if partner_index > element_index:  # @step:compare
                    ascending = (element_index & stage_size) == 0  # @step:compare
                    if (ascending and sorted_array[element_index] > sorted_array[partner_index]) or \
                       (not ascending and sorted_array[element_index] < sorted_array[partner_index]):
                        # @step:swap
                        temporary_value = sorted_array[element_index]  # @step:swap
                        sorted_array[element_index] = sorted_array[partner_index]  # @step:swap
                        sorted_array[partner_index] = temporary_value  # @step:swap
            sub_size //= 2
        stage_size *= 2

    # Remove padding sentinels
    # @step:mark-sorted
    result = sorted_array[:original_length]  # @step:mark-sorted

    return result  # @step:complete
