# Two Sum (Sorted Array) — O(n) two-pointer: converge from both ends toward the target sum
def two_pointer_sum(sorted_array: list[int], target: int) -> dict:
    left_pointer = 0  # @step:initialize
    right_pointer = len(sorted_array) - 1  # @step:initialize

    while left_pointer < right_pointer:
        current_sum = sorted_array[left_pointer] + sorted_array[right_pointer]  # @step:visit

        if current_sum == target:  # @step:compare
            return {"found": True, "left_index": left_pointer, "right_index": right_pointer}  # @step:complete
        elif current_sum < target:  # @step:compare
            left_pointer += 1  # @step:visit
        else:
            right_pointer -= 1  # @step:visit

    return {"found": False, "left_index": -1, "right_index": -1}  # @step:complete
