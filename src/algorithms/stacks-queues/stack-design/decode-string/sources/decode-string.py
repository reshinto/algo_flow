# Decode String — use a stack to decode encoded strings like "3[a2[c]]" → "accaccacc"
def decode_string(input_string):
    count_stack = []  # @step:initialize
    string_stack = []  # @step:initialize
    current_string = ""  # @step:initialize
    current_count = 0  # @step:initialize

    for current_char in input_string:  # @step:visit
        if current_char.isdigit():
            # Build up multi-digit multipliers
            current_count = current_count * 10 + int(current_char)  # @step:visit
        elif current_char == "[":
            # Push current context onto stacks and reset for nested segment
            count_stack.append(current_count)  # @step:push
            string_stack.append(current_string)  # @step:push
            current_count = 0  # @step:push
            current_string = ""  # @step:push
        elif current_char == "]":
            # Pop context and expand the repeated segment
            repeat_count = count_stack.pop()  # @step:pop
            prev_string = string_stack.pop()  # @step:pop
            current_string = prev_string + current_string * repeat_count  # @step:pop
        else:
            # Regular character — append to current string accumulator
            current_string += current_char  # @step:visit

    return current_string  # @step:complete
