# Implement Queue Using Stacks — use two stacks to emulate FIFO queue behaviour (LeetCode 232)
def implement_queue_using_stacks(values):
    input_stack = []  # @step:initialize
    output_stack = []  # @step:initialize
    dequeue_results = []  # @step:initialize

    # Push phase — enqueue all values into the input stack
    for element_idx in range(len(values)):
        current_value = values[element_idx]  # @step:visit
        input_stack.append(current_value)  # @step:push

    # Dequeue phase — transfer when output stack is empty, then pop
    while input_stack or output_stack:
        if not output_stack:
            # Transfer all elements from input stack to output stack
            while input_stack:
                transferred_value = input_stack.pop()  # @step:transfer
                output_stack.append(transferred_value)  # @step:transfer
        dequeued_value = output_stack.pop()  # @step:pop
        dequeue_results.append(dequeued_value)  # @step:pop

    return dequeue_results  # @step:complete
