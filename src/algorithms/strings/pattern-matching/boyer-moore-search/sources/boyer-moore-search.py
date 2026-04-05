# Boyer-Moore Search (Bad Character Rule)
# Returns the index of the first occurrence of pattern in text, or -1 if not found.
# Compares pattern right-to-left; on mismatch, shifts using the bad character table.
# Time: best O(n/m), average O(n), worst O(nm)
# Space: O(sigma) where sigma = alphabet size (number of distinct characters in pattern)


def boyer_moore_search(text: str, pattern: str) -> int:
    if len(pattern) == 0:  # @step:initialize
        return 0
    bad_char_table = build_bad_char_table(pattern)  # @step:initialize

    pattern_len = len(pattern)  # @step:initialize
    text_len = len(text)  # @step:initialize

    alignment_offset = 0  # @step:initialize

    while alignment_offset <= text_len - pattern_len:  # @step:visit
        pattern_idx = pattern_len - 1  # @step:visit

        while pattern_idx >= 0 and pattern[pattern_idx] == text[alignment_offset + pattern_idx]:
            pattern_idx -= 1  # @step:char-match

        if pattern_idx < 0:
            # Full pattern matched
            return alignment_offset  # @step:char-match

        # Mismatch — compute shift using bad character table
        mismatch_char = text[alignment_offset + pattern_idx]  # @step:char-mismatch
        bad_char_shift = bad_char_table.get(mismatch_char, -1)  # @step:char-mismatch
        shift_amount = max(1, pattern_idx - bad_char_shift)  # @step:char-mismatch
        alignment_offset += shift_amount  # @step:shift-pattern

    return -1  # @step:complete


def build_bad_char_table(pattern: str) -> dict[str, int]:
    table: dict[str, int] = {}  # @step:build-bad-char

    for char_idx in range(len(pattern)):
        table[pattern[char_idx]] = char_idx  # @step:build-bad-char

    return table  # @step:build-bad-char
