def dual_pivot_quick_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize

    def partition(low: int, high: int) -> None:
        if low >= high:  # @step:partition
            return  # @step:partition

        # Ensure pivot1 <= pivot2
        if sorted_array[low] > sorted_array[high]:  # @step:partition
            sorted_array[low], sorted_array[high] = sorted_array[high], sorted_array[low]  # @step:partition

        pivot1 = sorted_array[low]  # @step:partition
        pivot2 = sorted_array[high]  # @step:partition

        less_than_pointer = low + 1  # @step:partition
        greater_than_pointer = high - 1  # @step:partition
        current_pointer = low + 1  # @step:partition

        while current_pointer <= greater_than_pointer:  # @step:compare
            if sorted_array[current_pointer] < pivot1:  # @step:compare
                sorted_array[less_than_pointer], sorted_array[current_pointer] = (  # @step:swap
                    sorted_array[current_pointer],
                    sorted_array[less_than_pointer],
                )
                less_than_pointer += 1  # @step:swap
                current_pointer += 1  # @step:swap
            elif sorted_array[current_pointer] > pivot2:  # @step:compare
                while greater_than_pointer > current_pointer and sorted_array[greater_than_pointer] > pivot2:  # @step:compare
                    greater_than_pointer -= 1  # @step:compare
                sorted_array[greater_than_pointer], sorted_array[current_pointer] = (  # @step:swap
                    sorted_array[current_pointer],
                    sorted_array[greater_than_pointer],
                )
                greater_than_pointer -= 1  # @step:swap
            else:
                current_pointer += 1  # @step:compare

        # Place pivot1 and pivot2 in their final positions
        less_than_pointer -= 1  # @step:pivot-placed
        greater_than_pointer += 1  # @step:pivot-placed
        sorted_array[low], sorted_array[less_than_pointer] = (  # @step:pivot-placed
            sorted_array[less_than_pointer],
            sorted_array[low],
        )
        sorted_array[high], sorted_array[greater_than_pointer] = (  # @step:pivot-placed
            sorted_array[greater_than_pointer],
            sorted_array[high],
        )

        # Both pivots are now at their final sorted positions
        # @step:mark-sorted

        # Recursively sort three partitions
        partition(low, less_than_pointer - 1)  # @step:mark-sorted
        partition(less_than_pointer + 1, greater_than_pointer - 1)  # @step:mark-sorted
        partition(greater_than_pointer + 1, high)  # @step:mark-sorted

    if len(sorted_array) > 1:
        partition(0, len(sorted_array) - 1)

    return sorted_array  # @step:complete
