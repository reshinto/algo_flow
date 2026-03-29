# Previous Smaller Element — monotonic stack: for each element, find the nearest element to the LEFT that is strictly smaller, or -1
def previous_smaller_element(input_array: list[int]) -> list[int]:
    array_length = len(input_array)
    result_array = [-1] * array_length  # @step:initialize
    increasing_stack: list[int] = []  # @step:initialize

    for scan_index in range(array_length):  # @step:visit
        current_element = input_array[scan_index]  # @step:visit

        # Pop elements from the stack that are >= current_element
        while increasing_stack and input_array[increasing_stack[-1]] >= current_element:  # @step:compare
            increasing_stack.pop()  # @step:compare

        # The new stack top (if any) is the nearest smaller element to the left
        if increasing_stack:  # @step:visit
            nearest_smaller_index = increasing_stack[-1]  # @step:visit
            result_array[scan_index] = input_array[nearest_smaller_index]  # @step:visit

        increasing_stack.append(scan_index)  # @step:visit

    return result_array  # @step:complete
