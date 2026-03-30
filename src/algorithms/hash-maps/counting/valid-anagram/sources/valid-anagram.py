# Valid Anagram — determine if two strings are anagrams using character frequency counts
def valid_anagram(text_a, text_b):
    if len(text_a) != len(text_b):  # @step:initialize
        return False
    char_counts = {}  # @step:initialize
    for current_char in text_a:
        char_counts[current_char] = char_counts.get(current_char, 0) + 1  # @step:increment-count
    for current_char in text_b:
        updated_count = char_counts.get(current_char, 0) - 1  # @step:decrement-count
        if updated_count < 0:  # @step:complete
            return False
        char_counts[current_char] = updated_count  # @step:decrement-count
    return True  # @step:complete
