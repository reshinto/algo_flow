# Sort Nearly Sorted — sort an array where each element is at most k positions from its sorted position
def sort_nearly_sorted(array, k_value):
    result = []  # @step:initialize
    heap = []  # @step:initialize

    def sift_up(arr, current_idx):
        while current_idx > 0:
            parent_idx = (current_idx - 1) // 2  # @step:sift-up
            if arr[parent_idx] <= arr[current_idx]:  # @step:compare
                break
            arr[parent_idx], arr[current_idx] = arr[current_idx], arr[parent_idx]  # @step:heap-swap
            current_idx = parent_idx  # @step:sift-up

    def sift_down(arr, parent_idx):
        while True:
            smallest_idx = parent_idx  # @step:sift-down
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            if left_idx < len(arr) and arr[left_idx] < arr[smallest_idx]:  # @step:compare
                smallest_idx = left_idx  # @step:sift-down
            if right_idx < len(arr) and arr[right_idx] < arr[smallest_idx]:  # @step:compare
                smallest_idx = right_idx  # @step:sift-down
            if smallest_idx == parent_idx:  # @step:sift-down
                break
            arr[parent_idx], arr[smallest_idx] = arr[smallest_idx], arr[parent_idx]  # @step:heap-swap
            parent_idx = smallest_idx  # @step:sift-down

    def heap_insert(arr, value):
        arr.append(value)  # @step:heap-insert
        sift_up(arr, len(arr) - 1)

    def heap_extract(arr):
        min_value = arr[0]  # @step:heap-extract
        arr[0] = arr[-1]  # @step:heap-swap
        arr.pop()  # @step:heap-extract
        if arr:  # @step:sift-down
            sift_down(arr, 0)
        return min_value

    # Insert first k+1 elements into the min-heap
    for insert_idx in range(min(k_value + 1, len(array))):  # @step:heap-insert
        heap_insert(heap, array[insert_idx])

    # For each remaining element, extract-min to result and insert next element
    for next_idx in range(k_value + 1, len(array)):
        result.append(heap_extract(heap))  # @step:heap-extract
        heap_insert(heap, array[next_idx])  # @step:heap-insert

    # Drain the remaining elements from the heap
    while heap:
        result.append(heap_extract(heap))  # @step:heap-extract

    return result  # @step:complete
