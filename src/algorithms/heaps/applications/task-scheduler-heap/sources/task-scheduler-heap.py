# Task Scheduler Heap — minimum intervals to complete all tasks with cooldown (LeetCode 621)
def task_scheduler_heap(tasks, cooldown):
    # Count task frequencies
    frequency_map = {}  # @step:initialize
    for task_name in tasks:  # @step:initialize
        frequency_map[task_name] = frequency_map.get(task_name, 0) + 1

    # Build max-heap of frequencies (negate for max-heap using min-heap behavior)
    heap = []  # @step:initialize
    for frequency in frequency_map.values():
        heap.append(-frequency)  # @step:heap-insert

    def sift_up(arr, current_idx):
        while current_idx > 0:
            parent_idx = (current_idx - 1) // 2  # @step:sift-up
            if arr[parent_idx] <= arr[current_idx]:  # @step:compare
                break
            arr[parent_idx], arr[current_idx] = arr[current_idx], arr[parent_idx]  # @step:heap-swap
            current_idx = parent_idx  # @step:sift-up

    def sift_down(arr, parent_idx):
        while True:
            largest_idx = parent_idx  # @step:sift-down
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            if left_idx < len(arr) and arr[left_idx] < arr[largest_idx]:  # @step:compare
                largest_idx = left_idx  # @step:sift-down
            if right_idx < len(arr) and arr[right_idx] < arr[largest_idx]:  # @step:compare
                largest_idx = right_idx  # @step:sift-down
            if largest_idx == parent_idx:  # @step:sift-down
                break
            arr[parent_idx], arr[largest_idx] = arr[largest_idx], arr[parent_idx]  # @step:heap-swap
            parent_idx = largest_idx  # @step:sift-down

    # Heapify
    for start_idx in range(len(heap) // 2 - 1, -1, -1):  # @step:sift-down
        sift_down(heap, start_idx)

    total_intervals = 0  # @step:initialize

    while heap:
        cycle_size = cooldown + 1  # @step:initialize
        round_tasks = []  # @step:initialize

        for slot_index in range(cycle_size):  # @step:heap-extract
            if not heap:
                break
            max_frequency = heap[0]  # @step:heap-extract
            heap[0] = heap[-1]  # @step:heap-swap
            heap.pop()  # @step:heap-extract
            if heap:  # @step:sift-down
                sift_down(heap, 0)
            round_tasks.append(max_frequency + 1)  # @step:compare (increment negated count toward 0)

        for remaining_frequency in round_tasks:  # @step:heap-insert
            if remaining_frequency < 0:
                heap.append(remaining_frequency)  # @step:heap-insert
                sift_up(heap, len(heap) - 1)

        if heap:
            total_intervals += cycle_size  # @step:compare
        else:
            total_intervals += len(round_tasks)  # @step:compare

    return total_intervals  # @step:complete
