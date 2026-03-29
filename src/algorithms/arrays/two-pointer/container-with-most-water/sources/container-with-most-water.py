# Container With Most Water — two pointers converge inward, always moving the shorter bar to maximize area
def container_with_most_water(heights: list[int]) -> dict:
    left_pointer = 0  # @step:initialize
    right_pointer = len(heights) - 1  # @step:initialize
    max_area = 0  # @step:initialize
    best_left = 0  # @step:initialize
    best_right = len(heights) - 1  # @step:initialize

    while left_pointer < right_pointer:
        left_height = heights[left_pointer]  # @step:visit
        right_height = heights[right_pointer]  # @step:visit
        current_area = min(left_height, right_height) * (right_pointer - left_pointer)  # @step:compare

        if current_area > max_area:  # @step:compare
            max_area = current_area  # @step:compare
            best_left = left_pointer  # @step:compare
            best_right = right_pointer  # @step:compare

        if left_height <= right_height:  # @step:compare
            left_pointer += 1  # @step:visit
        else:
            right_pointer -= 1  # @step:visit

    return {"max_area": max_area, "left_index": best_left, "right_index": best_right}  # @step:complete
