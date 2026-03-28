# Move Zeros to End — O(n) two-pointer: write pointer tracks next write position, read pointer scans
def move_zeros(input_array: list[int]) -> list[int]:
    result = input_array[:]
    write_pointer = 0  # @step:initialize

    for read_pointer in range(len(result)):
        current_element = result[read_pointer]  # @step:compare
        if current_element != 0:  # @step:compare
            temp_value = result[write_pointer]  # @step:swap
            result[write_pointer] = current_element  # @step:swap
            result[read_pointer] = temp_value  # @step:swap
            write_pointer += 1  # @step:visit

    return result  # @step:complete
