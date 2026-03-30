# Top K Frequent Elements — find the k most frequent elements using frequency map + bucket sort
def top_k_frequent_elements(numbers, top_k):
    freq_map = {}  # @step:initialize
    for num in numbers:
        freq_map[num] = freq_map.get(num, 0) + 1  # @step:increment-count
    # Bucket sort: index = frequency, value = list of elements with that frequency
    buckets = [[] for _ in range(len(numbers) + 1)]
    for num, freq in freq_map.items():
        buckets[freq].append(num)  # @step:key-found
    result = []
    for bucket_idx in range(len(buckets) - 1, -1, -1):
        for num in buckets[bucket_idx]:
            result.append(num)  # @step:key-found
            if len(result) == top_k:
                return result
    return result  # @step:complete
