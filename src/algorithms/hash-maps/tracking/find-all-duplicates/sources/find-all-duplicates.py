# Find All Duplicates — find all elements that appear twice using a hash set
def find_all_duplicates(numbers):
    seen_set = set()  # @step:initialize
    duplicates = []
    for element_index in range(len(numbers)):
        current_num = numbers[element_index]
        if current_num in seen_set:  # @step:check-duplicate
            duplicates.append(current_num)  # @step:key-found
        else:
            seen_set.add(current_num)  # @step:insert-key
    return duplicates  # @step:complete
