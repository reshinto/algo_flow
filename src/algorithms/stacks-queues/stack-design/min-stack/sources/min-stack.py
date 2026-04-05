# Min Stack — maintain a main stack paired with an auxiliary min-tracking stack for O(1) getMin
def min_stack(values):
    main_stack = []  # @step:initialize
    min_tracker = []  # @step:initialize

    for current_value in values:  # @step:visit
        main_stack.append(current_value)  # @step:push

        # Maintain auxiliary min stack: duplicate current min if new value is not smaller
        if not min_tracker or current_value <= min_tracker[-1]:  # @step:compare
            min_tracker.append(current_value)  # @step:push-auxiliary
        else:
            min_tracker.append(min_tracker[-1])  # @step:push-auxiliary

    # The top of min_tracker always holds the current minimum
    return min_tracker[-1]  # @step:peek,complete
