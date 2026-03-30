# Contains Duplicate II — find if the same value appears within maxDistance index gap
def contains_duplicate_ii(numbers, max_distance):
    index_map = {}  # @step:initialize
    for current_index, current in enumerate(numbers):
        if current in index_map:  # @step:check-duplicate
            stored_index = index_map[current]
            if abs(current_index - stored_index) <= max_distance:  # @step:key-found
                return True  # @step:key-found
            # Too far apart — update stored index to keep closest occurrence
            index_map[current] = current_index  # @step:update-value
        else:
            # First time seeing this value — store its index
            index_map[current] = current_index  # @step:insert-key
    return False  # @step:complete
