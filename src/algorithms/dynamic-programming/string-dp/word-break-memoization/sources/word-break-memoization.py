# Word Break memoization — determine if text can be segmented into dictionary words top-down

def word_break_memoization(text: str, dictionary: list, memo: dict = None) -> bool:
    if memo is None:
        memo = {}  # @step:initialize
    text_length = len(text)  # @step:initialize
    if text_length == 0:  # @step:initialize
        return True  # @step:initialize

    def can_break(start_index: int) -> bool:
        if start_index == text_length:  # @step:fill-table
            return True  # @step:fill-table
        if start_index in memo:  # @step:read-cache
            return memo[start_index]  # @step:read-cache
        # Recursively try each dictionary word starting at this position
        # @step:push-call
        for word in dictionary:  # @step:compute-cell
            end_index = start_index + len(word)  # @step:compute-cell
            if end_index <= text_length and text[start_index:end_index] == word:  # @step:compute-cell
                if can_break(end_index):  # @step:compute-cell
                    memo[start_index] = True  # @step:compute-cell
                    return True  # @step:pop-call
        memo[start_index] = False  # @step:compute-cell
        return False  # @step:pop-call

    return can_break(0)  # @step:complete
