# Ransom Note — check if a ransom note can be constructed from magazine characters
def ransom_note(ransom_note_text, magazine):
    char_counts = {}  # @step:initialize
    for current_char in magazine:
        char_counts[current_char] = char_counts.get(current_char, 0) + 1  # @step:increment-count
    for current_char in ransom_note_text:
        updated_count = char_counts.get(current_char, 0) - 1  # @step:decrement-count
        if updated_count < 0:  # @step:complete
            return False
        char_counts[current_char] = updated_count  # @step:decrement-count
    return True  # @step:complete
