# Rotate Array (Reversal Method) — O(n) three-reversal technique with O(1) space
def rotate_array(input_array: list[int], rotate_count: int) -> list[int]:
    result = input_array[:]
    array_length = len(result)

    if array_length == 0:  # @step:initialize
        return result  # @step:initialize

    effective_rotation = rotate_count % array_length  # @step:initialize

    if effective_rotation == 0:  # @step:initialize
        return result  # @step:initialize

    def reverse_segment(arr: list[int], left: int, right: int) -> None:
        while left < right:
            arr[left], arr[right] = arr[right], arr[left]  # @step:swap
            left += 1  # @step:visit
            right -= 1  # @step:visit

    # Phase 1: reverse entire array
    reverse_segment(result, 0, array_length - 1)  # @step:swap

    # Phase 2: reverse first effective_rotation elements
    reverse_segment(result, 0, effective_rotation - 1)  # @step:swap

    # Phase 3: reverse remaining elements
    reverse_segment(result, effective_rotation, array_length - 1)  # @step:swap

    return result  # @step:complete
