# Two Sum — find two indices whose values add up to the target using a hash map
def two_sum(numbers, target):
    map = {}  # @step:initialize
    for idx, num in enumerate(numbers):
        complement = target - num  # @step:lookup-key
        if complement in map:  # @step:key-found
            return [map[complement], idx]  # @step:key-found
        # Complement not found — store current number for future lookups
        map[num] = idx  # @step:insert-key
    return [-1, -1]  # @step:complete
