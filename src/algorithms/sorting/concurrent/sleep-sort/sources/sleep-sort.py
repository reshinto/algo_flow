import threading

def sleep_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    original_array = input_array.copy()  # @step:initialize
    array_length = len(original_array)  # @step:initialize

    # Simulate scheduling: sort elements by value (ascending delay order)
    # In real sleep sort, each element uses time.sleep(value) in its own thread
    # and appends to output when it wakes; smaller values wake first
    scheduled_elements = sorted(original_array)  # @step:schedule

    output_array: list[int] = []  # @step:schedule

    # Elements "wake up" in order of their value (their simulated delay)
    for wake_index in range(array_length):  # @step:wake-up
        waking_value = scheduled_elements[wake_index]  # @step:wake-up

        # Compare with next sleeping element to show scheduling relationship
        if wake_index + 1 < array_length:  # @step:compare
            _ = scheduled_elements[wake_index + 1]  # @step:compare — next element still sleeping

        output_array.append(waking_value)  # @step:swap
        # @step:mark-sorted

    return output_array  # @step:complete
