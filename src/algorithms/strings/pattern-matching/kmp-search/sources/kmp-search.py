# KMP (Knuth-Morris-Pratt) Pattern Matching
# Returns the index of the first occurrence of pattern in text, or -1 if not found.
# Time: O(n + m) where n = text length, m = pattern length
# Space: O(m) for the failure table


def kmp_search(text: str, pattern: str) -> int:
    if len(pattern) == 0:  # @step:initialize
        return 0
    failure = build_failure_table(pattern)  # @step:initialize

    text_idx = 0  # @step:initialize
    pattern_idx = 0  # @step:initialize

    while text_idx < len(text):  # @step:visit
        if text[text_idx] == pattern[pattern_idx]:
            # Characters match — advance both pointers
            text_idx += 1  # @step:char-match
            pattern_idx += 1  # @step:char-match

            if pattern_idx == len(pattern):
                # Full pattern matched
                return text_idx - pattern_idx  # @step:char-match
        elif pattern_idx > 0:
            # Mismatch after some matches — use failure table
            pattern_idx = failure[pattern_idx - 1]  # @step:char-mismatch
        else:
            # Mismatch at pattern start
            text_idx += 1  # @step:char-mismatch

    return -1  # @step:complete


def build_failure_table(pattern: str) -> list[int]:
    failure = [0] * len(pattern)  # @step:build-failure
    prefix_len = 0  # @step:build-failure
    table_idx = 1  # @step:build-failure

    while table_idx < len(pattern):  # @step:build-failure
        if pattern[table_idx] == pattern[prefix_len]:
            prefix_len += 1  # @step:build-failure
            failure[table_idx] = prefix_len  # @step:build-failure
            table_idx += 1  # @step:build-failure
        elif prefix_len > 0:
            prefix_len = failure[prefix_len - 1]  # @step:build-failure
        else:
            failure[table_idx] = 0  # @step:build-failure
            table_idx += 1  # @step:build-failure

    return failure  # @step:build-failure
