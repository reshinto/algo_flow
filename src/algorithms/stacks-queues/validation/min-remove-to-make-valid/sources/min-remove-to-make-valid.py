# Min Remove to Make Valid — use a stack of indices to track unmatched '(' and a set for unmatched ')'
def min_remove_to_make_valid(input_string):
    unmatched_open_indices = []  # @step:initialize
    unmatched_close_indices = set()  # @step:initialize
    for char_idx, char in enumerate(input_string):  # @step:visit
        if char == "(":
            unmatched_open_indices.append(char_idx)  # @step:push
        elif char == ")":
            if unmatched_open_indices:
                unmatched_open_indices.pop()  # @step:pop
            else:
                unmatched_close_indices.add(char_idx)  # @step:mismatch
    # Remaining indices in the stack are unmatched opening brackets
    unmatched_indices = set(unmatched_open_indices) | unmatched_close_indices  # @step:mismatch
    result = ""  # @step:complete
    for char_idx, char in enumerate(input_string):  # @step:complete
        if char_idx not in unmatched_indices:
            result += char  # @step:complete
    return result  # @step:complete
