# Quickselect — O(n) average via Lomuto partition, recurse only on relevant half
def quickselect(input_array: list[int], target_k: int) -> dict:
    if len(input_array) == 0 or target_k < 1 or target_k > len(input_array):  # @step:initialize
        return {"kth_element": -1, "pivot_index": -1}  # @step:initialize

    work_array = input_array[:]  # @step:initialize
    target_index = target_k - 1  # @step:initialize  (0-based index for kth smallest)

    def lomuto_partition(array: list[int], range_start: int, range_end: int) -> int:
        pivot_value = array[range_end]  # @step:compare
        boundary_index = range_start

        for scan_index in range(range_start, range_end):
            if array[scan_index] <= pivot_value:  # @step:compare
                array[boundary_index], array[scan_index] = array[scan_index], array[boundary_index]  # @step:swap
                boundary_index += 1

        array[boundary_index], array[range_end] = array[range_end], array[boundary_index]  # @step:swap
        return boundary_index

    def select_kth(array: list[int], range_start: int, range_end: int, target_position: int) -> int:
        if range_start == range_end:  # @step:compare
            return array[range_start]  # @step:compare

        pivot_final_index = lomuto_partition(array, range_start, range_end)  # @step:compare

        if pivot_final_index == target_position:  # @step:compare
            return array[pivot_final_index]  # @step:compare
        elif target_position < pivot_final_index:
            return select_kth(array, range_start, pivot_final_index - 1, target_position)  # @step:compare
        else:
            return select_kth(array, pivot_final_index + 1, range_end, target_position)  # @step:compare

    kth_element = select_kth(work_array, 0, len(work_array) - 1, target_index)
    pivot_index = work_array.index(kth_element)

    return {"kth_element": kth_element, "pivot_index": pivot_index}  # @step:complete
