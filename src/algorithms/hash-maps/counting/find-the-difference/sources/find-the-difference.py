# Find the Difference — find the extra character added to the modified string
def find_the_difference(original, modified):
    char_counts = {}  # @step:initialize
    for char_index in range(len(original)):
        current_char = original[char_index]
        char_counts[current_char] = char_counts.get(current_char, 0) + 1  # @step:increment-count
    for char_index in range(len(modified)):
        current_char = modified[char_index]
        count = char_counts.get(current_char, 0) - 1  # @step:decrement-count
        char_counts[current_char] = count
        if count < 0:
            return current_char  # @step:key-found
    return ""  # @step:complete
