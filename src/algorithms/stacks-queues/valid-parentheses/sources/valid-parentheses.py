# Valid Parentheses — use a stack to verify every opening bracket has a matching closing bracket
def valid_parentheses(input_string):
    stack = []  # @step:initialize
    pairs = {")": "(", "]": "[", "}": "{"}  # @step:initialize
    for char in input_string:  # @step:push,pop
        if char in "([{":
            stack.append(char)  # @step:push
        else:
            # Closing bracket — check that stack top matches the expected opening bracket
            if not stack or stack[-1] != pairs[char]:  # @step:mismatch
                return False  # @step:mismatch
            stack.pop()  # @step:pop
    # Valid only if every opened bracket was closed
    return len(stack) == 0  # @step:complete
