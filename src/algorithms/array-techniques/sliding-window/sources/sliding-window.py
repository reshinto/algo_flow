def max_sum_subarray(input_array: list[int], window_size: int) -> dict:
    if len(input_array) == 0 or window_size <= 0 or window_size > len(input_array):
        return {"max_sum": 0, "window_start_index": 0}

    current_sum = 0
    for init_index in range(window_size):
        current_sum += input_array[init_index]

    max_sum = current_sum
    window_start_index = 0

    for right_index in range(window_size, len(input_array)):
        current_sum -= input_array[right_index - window_size]
        current_sum += input_array[right_index]

        if current_sum > max_sum:
            max_sum = current_sum
            window_start_index = right_index - window_size + 1

    return {"max_sum": max_sum, "window_start_index": window_start_index}
