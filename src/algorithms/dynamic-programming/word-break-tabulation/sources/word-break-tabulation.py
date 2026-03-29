# Word Break tabulation — determine if a string can be segmented into dictionary words bottom-up
from typing import List


def word_break_tabulation(text: str, dictionary: List[str]) -> bool:  # @step:initialize
    text_length = len(text)  # @step:initialize
    dp_table = [0] * (text_length + 1)  # @step:initialize
    dp_table[0] = 1  # @step:fill-table
    for end_index in range(1, text_length + 1):  # @step:read-cache
        for word in dictionary:  # @step:read-cache
            word_length = len(word)  # @step:read-cache
            if end_index >= word_length:  # @step:read-cache
                segment = text[end_index - word_length : end_index]  # @step:read-cache
                if segment == word and dp_table[end_index - word_length] == 1:  # @step:read-cache
                    dp_table[end_index] = 1  # @step:read-cache
            # @step:compute-cell
    return dp_table[text_length] == 1  # @step:complete
