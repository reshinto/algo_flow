# Heap Peek — return the minimum element (root) from a min-heap without removing it
def heap_peek(heap_array):
    array = heap_array[:]  # @step:initialize
    # The root at index 0 is always the minimum in a valid min-heap
    minimum_value = array[0]  # @step:visit
    return minimum_value  # @step:complete
