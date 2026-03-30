# Longest Substring Without Repeating Characters — sliding window with hash map
def longest_substring_without_repeating(text):
    char_index_map = {}  # @step:initialize
    window_start = 0
    max_length = 0
    for window_end in range(len(text)):
        current_char = text[window_end]
        previous_index = char_index_map.get(current_char)  # @step:check-duplicate
        if previous_index is not None and previous_index >= window_start:
            window_start = previous_index + 1  # @step:shrink-window
        char_index_map[current_char] = window_end  # @step:insert-key
        current_length = window_end - window_start + 1  # @step:expand-window
        max_length = max(max_length, current_length)
    return max_length  # @step:complete
