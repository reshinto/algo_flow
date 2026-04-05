# Suffix Array Construction (naive approach)
# Generates all suffixes of a string, sorts them lexicographically,
# and returns the array of starting indices in sorted suffix order.
# Time: O(n log²n), Space: O(n)

from typing import List


def suffix_array_construction(text: str) -> List[int]:
    text_length = len(text)  # @step:initialize

    if text_length == 0:
        return []  # @step:complete

    # Build array of suffix starting indices [0, 1, ..., n-1]
    suffix_indices = list(range(text_length))  # @step:initialize

    # Sort indices by their corresponding suffix lexicographically
    def compare_suffixes(first_idx: int) -> str:  # @step:compare
        return text[first_idx:]  # @step:compare

    suffix_indices.sort(key=compare_suffixes)  # @step:compare

    return suffix_indices  # @step:complete
