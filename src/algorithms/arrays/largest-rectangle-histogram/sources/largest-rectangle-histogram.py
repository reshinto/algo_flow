# Largest Rectangle in Histogram — O(n) monotonic stack approach
def largest_rectangle_histogram(heights: list[int]) -> dict:
    array_length = len(heights)
    if array_length == 0:  # @step:initialize
        return {"max_area": 0, "left_index": -1, "right_index": -1, "height": 0}  # @step:initialize

    index_stack = []  # @step:initialize
    max_area = 0  # @step:initialize
    best_left = 0  # @step:initialize
    best_right = 0  # @step:initialize
    best_height = 0  # @step:initialize

    for current_index in range(array_length + 1):
        current_height = 0 if current_index == array_length else heights[current_index]  # @step:compare

        while index_stack and current_height < heights[index_stack[-1]]:  # @step:compare
            popped_index = index_stack.pop()  # @step:visit
            popped_height = heights[popped_index]  # @step:visit
            left_boundary = 0 if not index_stack else index_stack[-1] + 1  # @step:visit
            width = current_index - left_boundary  # @step:visit
            area = popped_height * width  # @step:visit

            if area > max_area:  # @step:compare
                max_area = area  # @step:visit
                best_left = left_boundary  # @step:visit
                best_right = current_index - 1  # @step:visit
                best_height = popped_height  # @step:visit

        index_stack.append(current_index)  # @step:visit

    return {"max_area": max_area, "left_index": best_left, "right_index": best_right, "height": best_height}  # @step:complete
