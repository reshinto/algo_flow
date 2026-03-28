# Daily Temperatures — monotonic stack: for each day, find how many days until a warmer temperature (0 if none)
def daily_temperatures(temperatures: list[int]) -> list[int]:
    array_length = len(temperatures)
    wait_days = [0] * array_length  # @step:initialize
    pending_stack: list[int] = []  # @step:initialize

    for day_index in range(array_length):  # @step:visit
        today_temp = temperatures[day_index]  # @step:visit

        while pending_stack and temperatures[pending_stack[-1]] < today_temp:  # @step:compare
            popped_index = pending_stack.pop()  # @step:compare
            wait_days[popped_index] = day_index - popped_index  # @step:compare

        pending_stack.append(day_index)  # @step:visit

    return wait_days  # @step:complete
