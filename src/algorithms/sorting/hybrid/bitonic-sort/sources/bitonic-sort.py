import math

def bitonic_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    array_length = len(input_array)  # @step:initialize
    if array_length <= 1:  # @step:initialize
        return list(input_array)  # @step:initialize

    # Pad to the next power of 2 with float('inf') so real elements always sort first
    padded_length = 1  # @step:initialize
    while padded_length < array_length:  # @step:initialize
        padded_length <<= 1  # @step:initialize
    sorted_array: list[float] = list(input_array) + [float("inf")] * (padded_length - array_length)  # @step:initialize

    # Bitonic sort network
    stage = 2
    while stage <= padded_length:  # @step:compare
        step = stage >> 1
        while step > 0:
            for element_index in range(padded_length):  # @step:compare
                partner_index = element_index ^ step  # @step:compare

                if partner_index > element_index:  # @step:compare
                    is_ascending = (element_index & stage) == 0  # @step:compare

                    if is_ascending and sorted_array[element_index] > sorted_array[partner_index]:  # @step:swap
                        sorted_array[element_index], sorted_array[partner_index] = (
                            sorted_array[partner_index],
                            sorted_array[element_index],
                        )
                    elif not is_ascending and sorted_array[element_index] < sorted_array[partner_index]:  # @step:swap
                        sorted_array[element_index], sorted_array[partner_index] = (
                            sorted_array[partner_index],
                            sorted_array[element_index],
                        )
            step >>= 1
        stage <<= 1

    # @step:mark-sorted
    return [int(val) for val in sorted_array[:array_length]]  # @step:complete
