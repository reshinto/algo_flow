# Minimum Window Substring
# Finds the smallest contiguous window in `text` that contains all characters of `pattern`.
# Returns an empty string if no such window exists.
# Time: O(n + m) where n = len(text), m = len(pattern)
# Space: O(σ) — frequency maps bounded by alphabet size


def minimum_window_substring(text: str, pattern: str) -> str:
    if len(pattern) == 0 or len(text) < len(pattern):  # @step:initialize
        return ""

    target_frequency: dict[str, int] = {}  # @step:initialize
    for char in pattern:  # @step:initialize
        target_frequency[char] = target_frequency.get(char, 0) + 1  # @step:initialize

    window_frequency: dict[str, int] = {}  # @step:initialize
    required = len(target_frequency)  # @step:initialize
    satisfied = 0  # @step:initialize
    left_index = 0  # @step:initialize
    best_start = -1  # @step:initialize
    best_length = float("inf")  # @step:initialize

    for right_index in range(len(text)):  # @step:expand-window
        right_char = text[right_index]  # @step:expand-window
        window_frequency[right_char] = window_frequency.get(right_char, 0) + 1  # @step:update-frequency

        if right_char in target_frequency and window_frequency[right_char] == target_frequency[right_char]:  # @step:window-match
            satisfied += 1  # @step:window-match

        while satisfied == required:  # @step:shrink-window
            window_length = right_index - left_index + 1  # @step:add-to-result
            if window_length < best_length:  # @step:add-to-result
                best_length = window_length  # @step:add-to-result
                best_start = left_index  # @step:add-to-result

            left_char = text[left_index]  # @step:shrink-window
            window_frequency[left_char] -= 1  # @step:update-frequency

            if left_char in target_frequency and window_frequency[left_char] < target_frequency[left_char]:  # @step:shrink-window
                satisfied -= 1  # @step:shrink-window

            left_index += 1  # @step:shrink-window

    if best_start == -1:  # @step:complete
        return ""
    return text[best_start : best_start + int(best_length)]  # @step:complete
