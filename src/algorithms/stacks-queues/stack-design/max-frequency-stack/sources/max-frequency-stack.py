# Max Frequency Stack — pop the most frequent element using a frequency map and stack-of-stacks
def max_frequency_stack(values):
    freq_map = {}  # @step:initialize
    freq_stacks = {}  # @step:initialize
    max_frequency = 0  # @step:initialize
    pop_results = []  # @step:initialize

    # Push phase: update frequency map and push each value onto its frequency-level stack
    for current_value in values:  # @step:visit
        current_freq = freq_map.get(current_value, 0) + 1  # @step:compare
        freq_map[current_value] = current_freq  # @step:compare
        if current_freq > max_frequency:  # @step:compare
            max_frequency = current_freq  # @step:compare
        if current_freq not in freq_stacks:  # @step:push
            freq_stacks[current_freq] = []  # @step:push
        freq_stacks[current_freq].append(current_value)  # @step:push

    # Pop phase: always pop from the highest-frequency stack
    while max_frequency > 0:  # @step:pop
        top_stack = freq_stacks[max_frequency]  # @step:pop
        popped = top_stack.pop()  # @step:pop
        freq_map[popped] -= 1  # @step:pop
        if len(top_stack) == 0:  # @step:pop
            max_frequency -= 1  # @step:pop
        pop_results.append(popped)  # @step:pop

    return pop_results  # @step:complete
