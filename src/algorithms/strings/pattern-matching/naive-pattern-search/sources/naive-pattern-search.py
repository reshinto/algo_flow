# Naive (brute-force) pattern search — checks every position in text.
# Returns the index of the first occurrence of pattern in text, or -1 if not found.
# Time: O(n * m) worst case where n = text length, m = pattern length
# Space: O(1) — no auxiliary data structures


def naive_pattern_search(text: str, pattern: str) -> int:
    if len(pattern) == 0:  # @step:initialize
        return 0
    for text_idx in range(len(text) - len(pattern) + 1):  # @step:visit
        pattern_idx = 0  # @step:visit
        while (  # @step:char-match
            pattern_idx < len(pattern)
            and text[text_idx + pattern_idx] == pattern[pattern_idx]
        ):
            pattern_idx += 1  # @step:char-match
        if pattern_idx == len(pattern):  # @step:complete
            return text_idx
        # Mismatch — slide pattern right by one  # @step:char-mismatch
    return -1  # @step:complete
