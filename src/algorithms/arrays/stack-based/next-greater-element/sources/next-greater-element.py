# Next Greater Element — monotonic stack: for each element, find the next strictly greater element to its right
def next_greater_element(input_array: list[int]) -> list[int]:
    array_length = len(input_array)
    result_array = [-1] * array_length  # @step:initialize
    pending_stack: list[int] = []  # @step:initialize

    for scan_index in range(array_length):
        current_element = input_array[scan_index]  # @step:visit

        while pending_stack:
            stack_top = pending_stack[-1]  # @step:compare
            if input_array[stack_top] < current_element:  # @step:compare
                popped_index = pending_stack.pop()  # @step:compare
                result_array[popped_index] = current_element  # @step:compare
            else:
                break

        pending_stack.append(scan_index)  # @step:visit

    return result_array  # @step:complete
