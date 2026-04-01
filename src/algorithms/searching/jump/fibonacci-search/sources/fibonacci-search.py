def fibonacci_search(sorted_array: list[int], target_value: int) -> int:  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    if array_length == 0:  # @step:initialize
        return -1  # @step:initialize

    fib_m2 = 0  # @step:initialize  — Fibonacci(k-2)
    fib_m1 = 1  # @step:initialize  — Fibonacci(k-1)
    fib_m = fib_m1 + fib_m2  # @step:initialize  — Fibonacci(k)

    # Find the smallest Fibonacci number >= array_length
    while fib_m < array_length:  # @step:initialize
        fib_m2 = fib_m1  # @step:initialize
        fib_m1 = fib_m  # @step:initialize
        fib_m = fib_m1 + fib_m2  # @step:initialize

    offset = -1  # @step:initialize

    while fib_m > 1:
        compare_index = min(offset + fib_m2, array_length - 1)  # @step:compare
        compare_value = sorted_array[compare_index]  # @step:compare

        if compare_value < target_value:  # @step:eliminate
            # Target is in the right portion
            fib_m = fib_m1  # @step:eliminate
            fib_m1 = fib_m2  # @step:eliminate
            fib_m2 = fib_m - fib_m1  # @step:eliminate
            offset = compare_index  # @step:eliminate
        elif compare_value > target_value:  # @step:eliminate
            # Target is in the left portion
            fib_m = fib_m2  # @step:eliminate
            fib_m1 = fib_m1 - fib_m2  # @step:eliminate
            fib_m2 = fib_m - fib_m1  # @step:eliminate
        else:  # @step:found
            return compare_index  # @step:found

    # Check the remaining element
    if fib_m1 == 1 and offset + 1 < array_length and sorted_array[offset + 1] == target_value:  # @step:compare,found
        return offset + 1  # @step:found

    return -1  # @step:complete
