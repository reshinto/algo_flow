# Dutch National Flag — O(n) 3-way partition using three pointers (low, mid, high)
def dutch_national_flag(input_array: list[int]) -> list[int]:
    result = input_array[:]
    low_pointer = 0  # @step:initialize
    mid_pointer = 0  # @step:initialize
    high_pointer = len(result) - 1  # @step:initialize

    while mid_pointer <= high_pointer:
        current_value = result[mid_pointer]  # @step:compare

        if current_value == 0:  # @step:compare
            result[low_pointer], result[mid_pointer] = result[mid_pointer], result[low_pointer]  # @step:swap
            low_pointer += 1  # @step:visit
            mid_pointer += 1  # @step:visit
        elif current_value == 1:  # @step:compare
            mid_pointer += 1  # @step:visit
        else:
            result[mid_pointer], result[high_pointer] = result[high_pointer], result[mid_pointer]  # @step:swap
            high_pointer -= 1  # @step:visit

    return result  # @step:complete
