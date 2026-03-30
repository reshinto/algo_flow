# Missing Number — find the missing number in range [0, n] using a hash set
def missing_number(numbers):
    number_set = set()  # @step:initialize
    for element_index in range(len(numbers)):
        number_set.add(numbers[element_index])  # @step:insert-key
    for check_value in range(len(numbers) + 1):
        if check_value not in number_set:  # @step:lookup-key
            return check_value  # @step:key-not-found
    return -1  # @step:complete
