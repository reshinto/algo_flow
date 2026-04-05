# Backspace String Compare — use a stack to process each string, treating '#' as backspace
def process_with_backspace(input_str):
    result_stack = []  # @step:initialize
    for char in input_str:  # @step:visit
        if char == "#":
            if result_stack:
                result_stack.pop()  # @step:pop
        else:
            result_stack.append(char)  # @step:push
    return result_stack  # @step:compare


def backspace_string_compare(first_string, second_string):
    processed_first = process_with_backspace(first_string)  # @step:initialize
    processed_second = process_with_backspace(second_string)  # @step:initialize
    if len(processed_first) != len(processed_second):  # @step:compare
        return False  # @step:compare
    for char_idx in range(len(processed_first)):  # @step:compare
        if processed_first[char_idx] != processed_second[char_idx]:  # @step:compare
            return False  # @step:compare
    return True  # @step:complete
