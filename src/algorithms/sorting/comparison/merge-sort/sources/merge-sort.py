def merge_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    def merge_sort_recursive(arr: list[int], left_start: int, right_end: int) -> None:  # @step:divide
        if right_end - left_start <= 1:  # @step:divide
            return  # @step:divide

        mid_point = (left_start + right_end) // 2  # @step:divide

        merge_sort_recursive(arr, left_start, mid_point)  # @step:divide
        merge_sort_recursive(arr, mid_point, right_end)  # @step:divide

        # Merge the two sorted halves
        left_half = arr[left_start:mid_point]  # @step:merge
        right_half = arr[mid_point:right_end]  # @step:merge

        left_index = 0  # @step:merge
        right_index = 0  # @step:merge
        merge_position = left_start  # @step:merge

        while left_index < len(left_half) and right_index < len(right_half):  # @step:compare
            if left_half[left_index] <= right_half[right_index]:  # @step:compare
                arr[merge_position] = left_half[left_index]  # @step:swap
                left_index += 1  # @step:swap
            else:
                arr[merge_position] = right_half[right_index]  # @step:swap
                right_index += 1  # @step:swap
            merge_position += 1  # @step:swap

        while left_index < len(left_half):  # @step:merge
            arr[merge_position] = left_half[left_index]  # @step:merge
            left_index += 1  # @step:merge
            merge_position += 1  # @step:merge

        while right_index < len(right_half):  # @step:merge
            arr[merge_position] = right_half[right_index]  # @step:merge
            right_index += 1  # @step:merge
            merge_position += 1  # @step:merge

    merge_sort_recursive(sorted_array, 0, array_length)  # @step:divide

    return sorted_array  # @step:complete
