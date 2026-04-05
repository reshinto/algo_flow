# Flatten Nested List Iterator — use a stack to peel nested lists layer by layer

def flatten_nested_list_iterator(nested_list):
    stack = list(reversed(nested_list))  # @step:initialize
    result = []  # @step:initialize
    while stack:
        top = stack.pop()  # @step:pop
        if isinstance(top, int):
            result.append(top)  # @step:visit
        else:
            for item in reversed(top):
                stack.append(item)  # @step:push
    return result  # @step:complete
