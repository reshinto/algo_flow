# Intersection of Two Arrays — find common elements using a hash set
def intersection_of_two_arrays(numbers_a, numbers_b):
    set_a = set()  # @step:initialize
    for element_index in range(len(numbers_a)):
        set_a.add(numbers_a[element_index])  # @step:insert-key
    result = []
    for element_index in range(len(numbers_b)):
        current_num = numbers_b[element_index]
        if current_num in set_a:  # @step:lookup-key
            result.append(current_num)  # @step:key-found
            set_a.discard(current_num)
    return result  # @step:complete
