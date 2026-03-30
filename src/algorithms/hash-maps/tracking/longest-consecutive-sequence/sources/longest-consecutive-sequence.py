# Longest Consecutive Sequence — find the length of the longest consecutive run using a hash set
def longest_consecutive_sequence(numbers):
    num_set = set()  # @step:initialize
    for build_idx in range(len(numbers)):
        num_set.add(numbers[build_idx])  # @step:insert-key
    max_length = 0
    for scan_idx in range(len(numbers)):
        current_number = numbers[scan_idx]
        if (current_number - 1) not in num_set:  # @step:lookup-key
            # This number is a sequence start — count forward
            sequence_length = 1
            next_number = current_number + 1
            while next_number in num_set:  # @step:key-found
                sequence_length += 1
                next_number += 1
            max_length = max(max_length, sequence_length)  # @step:key-not-found
    return max_length  # @step:complete
