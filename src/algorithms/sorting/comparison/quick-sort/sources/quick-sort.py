def quick_sort_lomuto(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    def partition(arr: list[int], low_index: int, high_index: int) -> int:  # @step:partition
        pivot_value = arr[high_index]  # @step:partition
        partition_index = low_index - 1  # @step:partition

        for scan_index in range(low_index, high_index):  # @step:compare
            if arr[scan_index] <= pivot_value:  # @step:compare
                partition_index += 1  # @step:swap
                temporary_value = arr[partition_index]  # @step:swap
                arr[partition_index] = arr[scan_index]  # @step:swap
                arr[scan_index] = temporary_value  # @step:swap

        # Place pivot in its final sorted position
        temporary_value = arr[partition_index + 1]  # @step:pivot-placed
        arr[partition_index + 1] = arr[high_index]  # @step:pivot-placed
        arr[high_index] = temporary_value  # @step:pivot-placed

        return partition_index + 1  # @step:pivot-placed

    def quick_sort_recursive(arr: list[int], low_index: int, high_index: int) -> None:  # @step:partition
        if low_index >= high_index:  # @step:partition
            return  # @step:partition

        pivot_final_index = partition(arr, low_index, high_index)  # @step:pivot-placed

        quick_sort_recursive(arr, low_index, pivot_final_index - 1)  # @step:partition
        quick_sort_recursive(arr, pivot_final_index + 1, high_index)  # @step:partition

    quick_sort_recursive(sorted_array, 0, array_length - 1)  # @step:partition

    return sorted_array  # @step:complete
