# Sort Characters by Frequency — sort a string by character frequency using a frequency map + bucket sort
def sort_characters_by_frequency(text):
    freq_map = {}  # @step:initialize
    for char in text:
        freq_map[char] = freq_map.get(char, 0) + 1  # @step:increment-count
    # Bucket sort: index = frequency, value = list of chars with that frequency
    buckets = [[] for _ in range(len(text) + 1)]
    for char, freq in freq_map.items():
        buckets[freq].append(char)  # @step:key-found
    result = ""
    for bucket_idx in range(len(buckets) - 1, -1, -1):
        for char in buckets[bucket_idx]:
            result += char * bucket_idx  # @step:key-found
    return result  # @step:complete
