# Rabin-Karp Pattern Matching
# Returns the index of the first occurrence of pattern in text, or -1 if not found.
# Uses a rolling polynomial hash to skip comparisons when hashes differ.
# Time: O(n + m) average, O(n * m) worst case (hash collisions)
# Space: O(1)

HASH_BASE = 31
HASH_PRIME = 1_000_000_007


def rabin_karp_search(text: str, pattern: str) -> int:
    if len(pattern) == 0:  # @step:initialize
        return 0  # @step:initialize
    if len(pattern) > len(text):  # @step:initialize
        return -1  # @step:initialize

    pattern_len = len(pattern)  # @step:initialize
    text_len = len(text)  # @step:initialize

    # Compute base^(pattern_len - 1) % prime for rolling hash window removal
    high_pow = 1  # @step:initialize
    for _ in range(pattern_len - 1):
        high_pow = (high_pow * HASH_BASE) % HASH_PRIME  # @step:initialize

    # Compute hash of pattern and first window
    pattern_hash = 0  # @step:initialize
    window_hash = 0  # @step:initialize
    for char_idx in range(pattern_len):
        pattern_hash = (pattern_hash * HASH_BASE + ord(pattern[char_idx])) % HASH_PRIME  # @step:initialize
        window_hash = (window_hash * HASH_BASE + ord(text[char_idx])) % HASH_PRIME  # @step:initialize

    # Slide the window over the text
    for window_start in range(text_len - pattern_len + 1):  # @step:visit
        if window_hash == pattern_hash:  # @step:visit
            # Hashes match — verify character by character
            char_idx = 0  # @step:char-match
            while char_idx < pattern_len and text[window_start + char_idx] == pattern[char_idx]:
                char_idx += 1  # @step:char-match

            if char_idx == pattern_len:
                return window_start  # @step:char-match
            # Hash collision — hashes matched but characters did not

        # Roll hash: remove leading character, add next character
        if window_start < text_len - pattern_len:
            outgoing_char_code = ord(text[window_start])  # @step:pattern-shift
            incoming_char_code = ord(text[window_start + pattern_len])  # @step:pattern-shift
            window_hash = (
                (window_hash - outgoing_char_code * high_pow) * HASH_BASE + incoming_char_code
            ) % HASH_PRIME  # @step:pattern-shift
            if window_hash < 0:
                window_hash += HASH_PRIME  # @step:pattern-shift

    return -1  # @step:complete
