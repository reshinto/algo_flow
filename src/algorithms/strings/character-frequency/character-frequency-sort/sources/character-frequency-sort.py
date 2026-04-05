# Character Frequency Sort
# Sorts a string by character frequency (descending) using bucket sort.
# Time: O(n) where n = length of text (bucket sort avoids O(n log n) comparison sort)
# Space: O(n) — frequency map and output string both scale with input size


def character_frequency_sort(text: str) -> str:
    if not text:  # @step:initialize
        return ""

    frequency_map: dict[str, int] = {}  # @step:initialize

    for char in text:  # @step:update-frequency
        frequency_map[char] = frequency_map.get(char, 0) + 1  # @step:update-frequency

    # Bucket sort: index = frequency, value = list of chars with that frequency
    max_frequency = len(text)  # @step:sort-by-frequency
    buckets: list[list[str]] = [[] for _ in range(max_frequency + 1)]  # @step:sort-by-frequency

    for char, freq in frequency_map.items():  # @step:sort-by-frequency
        buckets[freq].append(char)  # @step:sort-by-frequency

    result = ""  # @step:build-output
    for freq_idx in range(max_frequency, 0, -1):  # @step:build-output
        for char in buckets[freq_idx]:  # @step:add-to-result
            result += char * freq_idx  # @step:add-to-result

    return result  # @step:complete
