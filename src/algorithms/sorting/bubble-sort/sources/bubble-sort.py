def bubble_sort(input_array: list[int]) -> list[int]:
    sorted_array = input_array.copy()
    array_length = len(sorted_array)

    for outer_index in range(array_length - 1):
        swapped_this_pass = False

        for inner_index in range(array_length - 1 - outer_index):
            if sorted_array[inner_index] > sorted_array[inner_index + 1]:
                temporary_value = sorted_array[inner_index]
                sorted_array[inner_index] = sorted_array[inner_index + 1]
                sorted_array[inner_index + 1] = temporary_value
                swapped_this_pass = True

        if not swapped_this_pass:
            break

    return sorted_array
