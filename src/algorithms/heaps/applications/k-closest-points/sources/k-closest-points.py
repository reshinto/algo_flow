# K Closest Points to Origin — use a max-heap of size k (by distance²) to find the k nearest points
import heapq

def k_closest_points(points, k_value):
    heap = []  # @step:initialize

    def distance_squared(point):
        return point[0] * point[0] + point[1] * point[1]  # @step:initialize

    def sift_up(heap_arr, idx):
        current_idx = idx  # @step:sift-up
        while current_idx > 0:
            parent_idx = (current_idx - 1) // 2  # @step:sift-up
            if heap_arr[current_idx][0] > heap_arr[parent_idx][0]:  # @step:compare
                heap_arr[current_idx], heap_arr[parent_idx] = heap_arr[parent_idx], heap_arr[current_idx]  # @step:heap-swap
                current_idx = parent_idx  # @step:sift-up
            else:
                break  # @step:compare

    def sift_down(heap_arr, heap_size, start_idx):
        parent_idx = start_idx  # @step:sift-down
        while True:
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            largest_idx = parent_idx  # @step:sift-down
            if left_idx < heap_size and heap_arr[left_idx][0] > heap_arr[largest_idx][0]:  # @step:compare
                largest_idx = left_idx  # @step:sift-down
            if right_idx < heap_size and heap_arr[right_idx][0] > heap_arr[largest_idx][0]:  # @step:compare
                largest_idx = right_idx  # @step:sift-down
            if largest_idx == parent_idx:  # @step:sift-down
                break
            heap_arr[parent_idx], heap_arr[largest_idx] = heap_arr[largest_idx], heap_arr[parent_idx]  # @step:heap-swap
            parent_idx = largest_idx  # @step:sift-down

    for point in points:
        dist = distance_squared(point)  # @step:heap-insert
        if len(heap) < k_value:
            heap.append((dist, point))  # @step:heap-insert
            sift_up(heap, len(heap) - 1)  # @step:sift-up
        elif heap and dist < heap[0][0]:  # @step:heap-extract
            heap[0] = (dist, point)  # @step:heap-extract
            sift_down(heap, len(heap), 0)  # @step:sift-down

    return [entry[1] for entry in heap]  # @step:complete
