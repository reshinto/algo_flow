# Meeting Rooms II — find minimum number of meeting rooms required using a min-heap of end times
def meeting_rooms_ii(intervals):
    if not intervals:  # @step:initialize
        return 0
    # Sort meetings by start time
    sorted_intervals = sorted(intervals, key=lambda meeting: meeting[0])  # @step:initialize
    # Min-heap tracking end times of active meetings
    end_time_heap = []  # @step:initialize

    for start_time, end_time in sorted_intervals:
        if end_time_heap and end_time_heap[0] <= start_time:
            # A room is free — extract its end time and reuse the room
            end_time_heap[0] = end_time_heap[-1]  # @step:heap-extract
            end_time_heap.pop()  # @step:heap-extract
            # Sift down to restore min-heap property
            parent_idx = 0  # @step:sift-down
            while True:
                smallest_idx = parent_idx  # @step:sift-down
                left_idx = 2 * parent_idx + 1  # @step:sift-down
                right_idx = 2 * parent_idx + 2  # @step:sift-down
                if left_idx < len(end_time_heap) and end_time_heap[left_idx] < end_time_heap[smallest_idx]:  # @step:compare
                    smallest_idx = left_idx
                if right_idx < len(end_time_heap) and end_time_heap[right_idx] < end_time_heap[smallest_idx]:  # @step:compare
                    smallest_idx = right_idx
                if smallest_idx == parent_idx:  # @step:sift-down
                    break
                end_time_heap[parent_idx], end_time_heap[smallest_idx] = end_time_heap[smallest_idx], end_time_heap[parent_idx]  # @step:heap-swap
                parent_idx = smallest_idx  # @step:sift-down

        # Insert current meeting's end time into the heap (allocate room)
        end_time_heap.append(end_time)  # @step:heap-insert
        current_idx = len(end_time_heap) - 1  # @step:heap-insert
        # Sift up to restore min-heap property
        while current_idx > 0:  # @step:sift-up
            parent_idx = (current_idx - 1) // 2  # @step:sift-up
            if end_time_heap[current_idx] >= end_time_heap[parent_idx]:  # @step:compare
                break
            end_time_heap[current_idx], end_time_heap[parent_idx] = end_time_heap[parent_idx], end_time_heap[current_idx]  # @step:heap-swap
            current_idx = parent_idx  # @step:sift-up

    return len(end_time_heap)  # @step:complete
