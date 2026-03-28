# Trapping Rain Water — O(n) two-pointer approach
def trapping_rain_water(heights: list[int]) -> dict:
    array_length = len(heights)
    if array_length == 0:  # @step:initialize
        return {"total_water": 0, "water_per_index": []}  # @step:initialize

    left_pointer = 0  # @step:initialize
    right_pointer = array_length - 1  # @step:initialize
    max_left = 0  # @step:initialize
    max_right = 0  # @step:initialize
    total_water = 0  # @step:initialize
    water_per_index = [0] * array_length  # @step:initialize

    while left_pointer < right_pointer:
        if heights[left_pointer] <= heights[right_pointer]:  # @step:compare
            if heights[left_pointer] >= max_left:  # @step:compare
                max_left = heights[left_pointer]  # @step:visit
            else:
                water_per_index[left_pointer] = max_left - heights[left_pointer]  # @step:visit
                total_water += water_per_index[left_pointer]  # @step:visit
            left_pointer += 1  # @step:visit
        else:
            if heights[right_pointer] >= max_right:  # @step:compare
                max_right = heights[right_pointer]  # @step:visit
            else:
                water_per_index[right_pointer] = max_right - heights[right_pointer]  # @step:visit
                total_water += water_per_index[right_pointer]  # @step:visit
            right_pointer -= 1  # @step:visit

    return {"total_water": total_water, "water_per_index": water_per_index}  # @step:complete
