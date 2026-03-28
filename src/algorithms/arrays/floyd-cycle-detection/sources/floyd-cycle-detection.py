# Floyd's Cycle Detection — tortoise and hare: treat array as linked structure, detect cycle and find entrance
def floyd_cycle_detection(input_array: list[int]) -> dict:
    if not input_array:  # @step:initialize
        return {"has_cycle": False, "cycle_start": -1}  # @step:initialize

    tortoise = 0  # @step:initialize
    hare = 0  # @step:initialize

    # Phase 1: detect meeting point inside the cycle
    while True:  # @step:visit
        tortoise = input_array[tortoise]  # @step:visit
        hare = input_array[input_array[hare]]  # @step:visit
        if tortoise == hare:  # @step:compare
            break

    # Phase 2: find cycle entrance — reset tortoise to start, hare stays at meeting point
    tortoise = 0  # @step:visit
    while tortoise != hare:  # @step:compare
        tortoise = input_array[tortoise]  # @step:visit
        hare = input_array[hare]  # @step:visit

    return {"has_cycle": True, "cycle_start": tortoise}  # @step:complete
