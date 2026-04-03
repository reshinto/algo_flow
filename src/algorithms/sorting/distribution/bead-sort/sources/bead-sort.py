def bead_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    source_array = input_array.copy()  # @step:initialize
    array_length = len(source_array)  # @step:initialize

    if array_length <= 1:
        return source_array  # @step:complete

    min_value = min(source_array)  # @step:initialize
    offset = -min_value if min_value < 0 else 0  # @step:initialize
    shifted_array = [value + offset for value in source_array]  # @step:initialize
    max_value = max(shifted_array)  # @step:initialize

    if max_value == 0:
        return source_array  # @step:complete

    # Represent each number as a row of beads on an abacus
    grid = [[1 if col < shifted_array[row] else 0
             for col in range(max_value)]
            for row in range(array_length)]  # @step:initialize

    # Gravity drop — for each column, count beads and stack them at the bottom
    for col_index in range(max_value):  # @step:drop-beads
        bead_count = 0  # @step:drop-beads
        for row_index in range(array_length):  # @step:drop-beads
            bead_count += grid[row_index][col_index]  # @step:drop-beads
            grid[row_index][col_index] = 0  # @step:drop-beads
        # Stack beads at the bottom of this column (gravity effect)
        for row_index in range(array_length - bead_count, array_length):  # @step:drop-beads
            grid[row_index][col_index] = 1  # @step:drop-beads

    # Read bead counts from each row — each row's bead count is the sorted value
    for row_index in range(array_length):  # @step:mark-sorted
        row_bead_count = sum(grid[row_index])  # @step:mark-sorted
        source_array[row_index] = row_bead_count - offset  # @step:mark-sorted

    return source_array  # @step:complete
