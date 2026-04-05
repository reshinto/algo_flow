# Reverse Words in a String — split, reverse word order, rejoin with single spaces.
# Trims leading/trailing whitespace and collapses multiple spaces between words.
# Time: O(n)  Space: O(n)


def reverse_words(text: str) -> str:
    words = text.split()  # @step:initialize

    left_index = 0  # @step:initialize
    right_index = len(words) - 1  # @step:initialize

    while left_index < right_index:
        left_word = words[left_index]  # @step:read-char
        right_word = words[right_index]  # @step:read-char

        words[left_index] = right_word  # @step:swap-pointers
        words[right_index] = left_word  # @step:swap-pointers

        left_index += 1  # @step:visit
        right_index -= 1  # @step:visit

    return " ".join(words)  # @step:complete
