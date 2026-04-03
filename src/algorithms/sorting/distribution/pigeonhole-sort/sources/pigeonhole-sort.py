def pigeonhole_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    if len(input_array) == 0:  # @step:initialize
        return []  # @step:initialize
    working_array = input_array.copy()  # @step:initialize
    array_length = len(working_array)  # @step:initialize

    min_value = min(working_array)  # @step:initialize
    max_value = max(working_array)  # @step:initialize
    hole_count = max_value - min_value + 1  # @step:initialize

    # Create one pigeonhole per distinct value in range
    holes = [0] * hole_count  # @step:initialize

    # Place each element into its corresponding pigeonhole
    for place_index in range(array_length):  # @step:place
        hole_position = working_array[place_index] - min_value  # @step:place
        holes[hole_position] += 1  # @step:place

    # Collect elements back from pigeonholes in ascending order
    write_index = 0  # @step:collect
    for hole_index in range(hole_count):  # @step:collect
        while holes[hole_index] > 0:  # @step:collect
            working_array[write_index] = hole_index + min_value  # @step:collect
            write_index += 1  # @step:collect
            holes[hole_index] -= 1  # @step:collect

    # @step:mark-sorted
    return working_array  # @step:complete
