# Rotate Array (Cyclic Replacement) — O(n) time, O(1) space via cycle-following
def rotate_array_cyclic(input_array: list[int], rotate_count: int) -> list[int]:
    result = input_array[:]
    array_length = len(result)

    if array_length == 0:
        return result  # @step:initialize

    effective_rotation = rotate_count % array_length  # @step:initialize

    if effective_rotation == 0:
        return result  # @step:initialize

    cycles_completed = 0  # @step:initialize
    start_index = 0  # @step:initialize

    # Follow each cycle: place every element at its rotated destination
    while cycles_completed < array_length:
        current_index = start_index  # @step:visit
        carry_value = result[current_index]  # @step:visit

        # Traverse the cycle until returning to the start index
        while True:
            destination_index = (current_index + effective_rotation) % array_length  # @step:compare
            next_carry = result[destination_index]  # @step:compare
            result[destination_index] = carry_value  # @step:swap
            carry_value = next_carry  # @step:swap
            cycles_completed += 1  # @step:swap
            current_index = destination_index  # @step:swap
            if current_index == start_index:  # @step:compare
                break

        start_index += 1  # @step:visit

    return result  # @step:complete
