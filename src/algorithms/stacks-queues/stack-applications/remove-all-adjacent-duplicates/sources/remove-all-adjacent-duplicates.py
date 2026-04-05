# Remove All Adjacent Duplicates — use a stack to repeatedly remove adjacent duplicate pairs
def remove_all_adjacent_duplicates(input_string):
    stack = []  # @step:initialize
    for char in input_string:  # @step:visit
        stack_top = stack[-1] if stack else None  # @step:visit
        if stack and stack_top == char:
            stack.pop()  # @step:match
        else:
            stack.append(char)  # @step:push
    # Remaining stack characters form the result after all duplicate pairs removed
    return "".join(stack)  # @step:complete
