# Cyclic Sort — O(n) sort for arrays containing values 1..n by placing each at index value-1
def cyclic_sort(input_array: list[int]) -> list[int]:
    result = input_array[:]  # @step:initialize
    current_index = 0  # @step:initialize

    while current_index < len(result):
        current_value = result[current_index]  # @step:compare
        correct_index = current_value - 1  # @step:compare

        if current_value != current_index + 1:  # @step:compare
            result[correct_index], result[current_index] = result[current_index], result[correct_index]  # @step:swap
        else:
            current_index += 1  # @step:visit

    return result  # @step:complete
