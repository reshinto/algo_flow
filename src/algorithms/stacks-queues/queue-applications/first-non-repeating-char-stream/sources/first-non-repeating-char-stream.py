# First Non-Repeating Char Stream — use a queue as candidate buffer and a frequency map to find the first non-repeating character at each step
from collections import deque

def first_non_repeating_char_stream(input_string):
    freq_map = {}  # @step:initialize
    queue = deque()  # @step:initialize
    results = []  # @step:initialize
    for char in input_string:  # @step:visit
        freq_map[char] = freq_map.get(char, 0) + 1  # @step:visit
        queue.append(char)  # @step:enqueue
        # Remove repeated characters from the front of the queue
        while queue and freq_map[queue[0]] > 1:  # @step:dequeue
            queue.popleft()  # @step:dequeue
        answer = queue[0] if queue else "#"  # @step:peek
        results.append(answer)  # @step:peek
    return results  # @step:complete
