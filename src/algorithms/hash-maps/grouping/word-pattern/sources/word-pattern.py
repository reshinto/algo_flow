# Word Pattern — check if a string follows a pattern using bidirectional hash map mapping
def word_pattern(pattern, sentence):
    words = sentence.split(" ")  # @step:initialize
    char_to_word = {}  # @step:initialize
    word_to_char = {}  # @step:initialize
    if len(pattern) != len(words):  # @step:initialize
        return False
    for char_index in range(len(pattern)):
        pattern_char = pattern[char_index]
        current_word = words[char_index]
        mapped_word = char_to_word.get(pattern_char)  # @step:lookup-key
        mapped_char = word_to_char.get(current_word)  # @step:lookup-key
        if mapped_word is None and mapped_char is None:
            char_to_word[pattern_char] = current_word  # @step:insert-key
            word_to_char[current_word] = pattern_char  # @step:insert-key
        elif mapped_word == current_word and mapped_char == pattern_char:
            continue  # @step:key-found
        else:
            return False  # @step:key-not-found
    return True  # @step:complete
