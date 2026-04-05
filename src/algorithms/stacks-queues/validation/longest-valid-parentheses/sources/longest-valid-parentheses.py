# Longest Valid Parentheses — find the length of the longest well-formed parentheses substring
def longest_valid_parentheses(input_string):
    index_stack = [-1]  # @step:initialize
    max_length = 0  # @step:initialize
    for char_idx, char in enumerate(input_string):  # @step:visit
        if char == "(":
            index_stack.append(char_idx)  # @step:push
        else:
            # Pop the top; if stack becomes empty, push current index as new base
            index_stack.pop()  # @step:pop
            if not index_stack:
                index_stack.append(char_idx)  # @step:push
            else:
                # Length of current valid substring = current index minus new stack top
                stack_top = index_stack[-1]  # @step:compare
                current_length = char_idx - stack_top  # @step:compare
                if current_length > max_length:
                    max_length = current_length  # @step:compare
    return max_length  # @step:complete
