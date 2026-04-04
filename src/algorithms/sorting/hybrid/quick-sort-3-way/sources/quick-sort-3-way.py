def quick_sort_3_way(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize

    def partition_3_way(low: int, high: int) -> None:
        if low >= high:  # @step:partition
            return  # @step:partition

        pivot_value = sorted_array[low]  # @step:partition
        less_than_pointer = low  # @step:partition
        greater_than_pointer = high  # @step:partition
        current_pointer = low  # @step:partition

        # Dutch National Flag partitioning
        while current_pointer <= greater_than_pointer:  # @step:compare
            if sorted_array[current_pointer] < pivot_value:  # @step:compare
                sorted_array[less_than_pointer], sorted_array[current_pointer] = (  # @step:swap
                    sorted_array[current_pointer],
                    sorted_array[less_than_pointer],
                )
                less_than_pointer += 1  # @step:swap
                current_pointer += 1  # @step:swap
            elif sorted_array[current_pointer] > pivot_value:  # @step:compare
                sorted_array[greater_than_pointer], sorted_array[current_pointer] = (  # @step:swap
                    sorted_array[current_pointer],
                    sorted_array[greater_than_pointer],
                )
                greater_than_pointer -= 1  # @step:swap
                # Do not advance current_pointer — recheck the swapped element
            else:
                current_pointer += 1  # @step:compare

        # Elements at [less_than_pointer..greater_than_pointer] are equal to pivot
        # @step:pivot-placed

        # Recursively sort the less-than and greater-than partitions
        partition_3_way(low, less_than_pointer - 1)  # @step:mark-sorted
        partition_3_way(greater_than_pointer + 1, high)  # @step:mark-sorted

    if len(sorted_array) > 1:
        partition_3_way(0, len(sorted_array) - 1)

    return sorted_array  # @step:complete
