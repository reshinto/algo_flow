# Reorganize String — rearrange string so no two adjacent characters are the same (LeetCode 767)
def reorganize_string(text):
    # Count character frequencies
    frequency_map = {}  # @step:initialize
    for character in text:  # @step:initialize
        frequency_map[character] = frequency_map.get(character, 0) + 1

    # Build max-heap entries: [frequency, character] (negate for max-heap behavior)
    heap = []  # @step:initialize
    for character, frequency in frequency_map.items():
        heap.append([-frequency, character])  # @step:heap-insert

    def sift_up(arr, current_idx):
        while current_idx > 0:
            parent_idx = (current_idx - 1) // 2  # @step:sift-up
            if arr[parent_idx][0] <= arr[current_idx][0]:  # @step:compare
                break
            arr[parent_idx], arr[current_idx] = arr[current_idx], arr[parent_idx]  # @step:heap-swap
            current_idx = parent_idx  # @step:sift-up

    def sift_down(arr, parent_idx):
        while True:
            largest_idx = parent_idx  # @step:sift-down
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            if left_idx < len(arr) and arr[left_idx][0] < arr[largest_idx][0]:  # @step:compare
                largest_idx = left_idx  # @step:sift-down
            if right_idx < len(arr) and arr[right_idx][0] < arr[largest_idx][0]:  # @step:compare
                largest_idx = right_idx  # @step:sift-down
            if largest_idx == parent_idx:  # @step:sift-down
                break
            arr[parent_idx], arr[largest_idx] = arr[largest_idx], arr[parent_idx]  # @step:heap-swap
            parent_idx = largest_idx  # @step:sift-down

    # Heapify
    for start_idx in range(len(heap) // 2 - 1, -1, -1):  # @step:sift-down
        sift_down(heap, start_idx)

    result = ""  # @step:initialize
    prev_entry = None  # @step:initialize

    while heap:
        top_entry = heap[0]  # @step:heap-extract
        heap[0] = heap[-1]  # @step:heap-swap
        heap.pop()  # @step:heap-extract
        if heap:  # @step:sift-down
            sift_down(heap, 0)

        result += top_entry[1]  # @step:heap-extract
        top_entry[0] += 1  # @step:heap-extract (increment negated count toward 0)

        if prev_entry is not None and prev_entry[0] < 0:  # @step:compare
            heap.append(prev_entry)  # @step:heap-insert
            sift_up(heap, len(heap) - 1)  # @step:sift-up

        prev_entry = top_entry if top_entry[0] < 0 else None  # @step:compare

        if not heap and prev_entry is not None:
            return ""  # @step:complete

    return result  # @step:complete
