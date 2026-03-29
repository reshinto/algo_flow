# Count Anagram Windows — O(n) sliding window with frequency map comparison
def count_anagram_windows(text: list[int], pattern: list[int]) -> dict:
    pattern_length = len(pattern)
    text_length = len(text)

    if pattern_length == 0 or pattern_length > text_length:  # @step:initialize
        return {"count": 0, "positions": []}  # @step:initialize

    pattern_frequency: dict[int, int] = {}  # @step:initialize
    window_frequency: dict[int, int] = {}  # @step:initialize
    positions: list[int] = []

    # Build pattern frequency map
    for pattern_element in pattern:  # @step:initialize
        pattern_frequency[pattern_element] = pattern_frequency.get(pattern_element, 0) + 1  # @step:initialize

    # Build initial window frequency map
    for init_index in range(pattern_length):  # @step:move-window
        current_element = text[init_index]  # @step:move-window
        window_frequency[current_element] = window_frequency.get(current_element, 0) + 1  # @step:move-window

    # Check first window
    if pattern_frequency == window_frequency:  # @step:compare
        positions.append(0)  # @step:compare

    # Slide window across remaining positions
    for right_index in range(pattern_length, text_length):
        left_index = right_index - pattern_length
        outgoing_element = text[left_index]  # @step:shrink-window
        incoming_element = text[right_index]  # @step:expand-window

        # Remove outgoing element from window
        if window_frequency[outgoing_element] == 1:  # @step:shrink-window
            del window_frequency[outgoing_element]  # @step:shrink-window
        else:
            window_frequency[outgoing_element] -= 1  # @step:shrink-window

        # Add incoming element to window
        window_frequency[incoming_element] = window_frequency.get(incoming_element, 0) + 1  # @step:expand-window

        if pattern_frequency == window_frequency:  # @step:compare
            positions.append(left_index + 1)  # @step:compare

    return {"count": len(positions), "positions": positions}  # @step:complete
