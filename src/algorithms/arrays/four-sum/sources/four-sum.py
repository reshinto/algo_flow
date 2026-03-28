# Four Sum — finds all unique quadruplets summing to target via sorting and two-pointer reduction
def four_sum(input_array: list[int], target: int) -> list[list[int]]:
    sorted_array = sorted(input_array)  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    quadruplets: list[list[int]] = []  # @step:initialize

    for first_index in range(array_length - 3):  # @step:visit

        if first_index > 0 and sorted_array[first_index] == sorted_array[first_index - 1]:  # @step:compare
            continue  # @step:compare

        for second_index in range(first_index + 1, array_length - 2):  # @step:visit

            if second_index > first_index + 1 and sorted_array[second_index] == sorted_array[second_index - 1]:  # @step:compare
                continue  # @step:compare

            left_pointer = second_index + 1  # @step:visit
            right_pointer = array_length - 1  # @step:visit

            while left_pointer < right_pointer:  # @step:compare
                current_sum = (
                    sorted_array[first_index]
                    + sorted_array[second_index]
                    + sorted_array[left_pointer]
                    + sorted_array[right_pointer]
                )  # @step:compare

                if current_sum == target:  # @step:compare
                    quadruplets.append([
                        sorted_array[first_index],
                        sorted_array[second_index],
                        sorted_array[left_pointer],
                        sorted_array[right_pointer],
                    ])  # @step:visit


                    while left_pointer < right_pointer and sorted_array[left_pointer] == sorted_array[left_pointer + 1]:
                        left_pointer += 1  # @step:compare
                    while left_pointer < right_pointer and sorted_array[right_pointer] == sorted_array[right_pointer - 1]:
                        right_pointer -= 1  # @step:compare
                    left_pointer += 1  # @step:visit
                    right_pointer -= 1  # @step:visit
                elif current_sum < target:
                    left_pointer += 1  # @step:visit
                else:
                    right_pointer -= 1  # @step:visit

    return quadruplets  # @step:complete
