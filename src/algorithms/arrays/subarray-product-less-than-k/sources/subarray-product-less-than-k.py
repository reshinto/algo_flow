# Subarray Product < K — O(n) variable sliding window counting subarrays with product below threshold
def subarray_product_less_than_k(input_array: list[int], threshold: int) -> dict:
    if len(input_array) == 0 or threshold <= 1:  # @step:initialize
        return {"count": 0}  # @step:initialize

    left_pointer = 0  # @step:initialize
    current_product = 1
    count = 0

    # Expand the right boundary of the window
    for right_pointer in range(len(input_array)):
        current_product *= input_array[right_pointer]  # @step:expand-window

        # Shrink from the left while product meets or exceeds threshold
        while current_product >= threshold and left_pointer <= right_pointer:  # @step:compare
            current_product //= input_array[left_pointer]  # @step:shrink-window
            left_pointer += 1  # @step:shrink-window

        # Every subarray ending at right_pointer and starting anywhere in [left_pointer, right_pointer]
        count += right_pointer - left_pointer + 1  # @step:compare

    return {"count": count}  # @step:complete
