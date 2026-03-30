# First Unique Character — find the index of the first non-repeating character in a string
def first_unique_character(text):
    char_counts = {}  # @step:initialize
    for current_char in text:
        char_counts[current_char] = char_counts.get(current_char, 0) + 1  # @step:increment-count
    for char_index, current_char in enumerate(text):
        if char_counts[current_char] == 1:  # @step:lookup-key
            return char_index  # @step:key-found
    return -1  # @step:complete
