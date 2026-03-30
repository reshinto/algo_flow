# Contains Duplicate — determine if any value appears at least twice using a hash set
def contains_duplicate(numbers):
    seen = set()  # @step:initialize
    for element_index, current in enumerate(numbers):
        if current in seen:  # @step:key-found
            return True  # @step:key-found
        # Not seen yet — record it for future duplicate checks
        seen.add(current)  # @step:insert-key
    return False  # @step:complete
