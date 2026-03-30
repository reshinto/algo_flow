# Find All Anagrams — slide a window over text and record start indices where window is an anagram of pattern
def find_all_anagrams(text, pattern):
    pattern_freq = {}  # @step:initialize
    for pattern_char in pattern:
        pattern_freq[pattern_char] = pattern_freq.get(pattern_char, 0) + 1  # @step:increment-count
    window_freq = {}
    window_size = len(pattern)
    result = []
    for right_idx in range(len(text)):
        # Expand window: add incoming character
        incoming_char = text[right_idx]
        window_freq[incoming_char] = window_freq.get(incoming_char, 0) + 1  # @step:expand-window
        # Shrink window: remove outgoing character once full window is established
        if right_idx >= window_size:
            outgoing_char = text[right_idx - window_size]
            outgoing_count = window_freq[outgoing_char] - 1  # @step:shrink-window
            if outgoing_count == 0:
                del window_freq[outgoing_char]  # @step:decrement-count
            else:
                window_freq[outgoing_char] = outgoing_count  # @step:decrement-count
        # Check if current window matches pattern frequency map
        if right_idx >= window_size - 1:
            if window_freq == pattern_freq:
                result.append(right_idx - window_size + 1)  # @step:key-found
    return result  # @step:complete
