# Remove K Digits — greedy monotonic stack to produce the smallest number after k removals
def remove_k_digits(num: str, removal_count: int) -> str:
    digit_stack = []  # @step:initialize
    removals_left = removal_count  # @step:initialize

    for digit_idx, current_digit in enumerate(num):  # @step:visit
        # While we still have removals and the stack top is greater than the current digit, pop it
        while removals_left > 0 and digit_stack and digit_stack[-1] > current_digit:  # @step:compare
            digit_stack.pop()  # @step:pop
            removals_left -= 1  # @step:maintain-monotonic
        digit_stack.append(current_digit)  # @step:push

    # Remove remaining digits from the end if we still have removals left
    while removals_left > 0:  # @step:pop
        digit_stack.pop()  # @step:pop
        removals_left -= 1  # @step:complete

    # Strip leading zeros and return; default to "0" for an empty result
    result = "".join(digit_stack).lstrip("0") or "0"  # @step:complete
    return result  # @step:complete
