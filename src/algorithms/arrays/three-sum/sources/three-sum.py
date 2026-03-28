# Three Sum — O(n^2) find all unique triplets that sum to zero using sort + two-pointer
def three_sum(input_array: list[int]) -> list[list[int]]:
    sorted_array = sorted(input_array)  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    triplets: list[list[int]] = []  # @step:initialize

    for anchor_index in range(array_length - 2):  # @step:visit
        # Skip duplicate anchor values to avoid duplicate triplets
        if anchor_index > 0 and sorted_array[anchor_index] == sorted_array[anchor_index - 1]:  # @step:compare
            continue  # @step:compare

        left_pointer = anchor_index + 1  # @step:visit
        right_pointer = array_length - 1  # @step:visit

        while left_pointer < right_pointer:  # @step:compare
            current_sum = sorted_array[anchor_index] + sorted_array[left_pointer] + sorted_array[right_pointer]  # @step:compare

            if current_sum == 0:  # @step:compare
                triplets.append([sorted_array[anchor_index], sorted_array[left_pointer], sorted_array[right_pointer]])  # @step:visit

                # Advance both pointers and skip duplicates
                while left_pointer < right_pointer and sorted_array[left_pointer] == sorted_array[left_pointer + 1]:
                    left_pointer += 1  # @step:compare
                while left_pointer < right_pointer and sorted_array[right_pointer] == sorted_array[right_pointer - 1]:
                    right_pointer -= 1  # @step:compare
                left_pointer += 1  # @step:visit
                right_pointer -= 1  # @step:visit
            elif current_sum < 0:
                left_pointer += 1  # @step:visit
            else:
                right_pointer -= 1  # @step:visit

    return triplets  # @step:complete
