import math

INSERTION_SORT_THRESHOLD = 16


def insertion_sort_slice(sorted_array: list[int], slice_start: int, slice_end: int) -> None:  # @step:insertion-pass
    for outer_index in range(slice_start + 1, slice_end + 1):  # @step:insertion-pass
        current_value = sorted_array[outer_index]  # @step:insertion-pass
        inner_index = outer_index - 1  # @step:insertion-pass

        while inner_index >= slice_start and sorted_array[inner_index] > current_value:  # @step:compare
            sorted_array[inner_index + 1] = sorted_array[inner_index]  # @step:swap
            inner_index -= 1  # @step:swap
        sorted_array[inner_index + 1] = current_value  # @step:swap


def heapify(sorted_array: list[int], heap_size: int, root_index: int) -> None:  # @step:heapify
    largest_index = root_index  # @step:heapify
    left_child = 2 * root_index + 1  # @step:heapify
    right_child = 2 * root_index + 2  # @step:heapify

    if left_child < heap_size and sorted_array[left_child] > sorted_array[largest_index]:  # @step:compare
        largest_index = left_child  # @step:heapify
    if right_child < heap_size and sorted_array[right_child] > sorted_array[largest_index]:  # @step:compare
        largest_index = right_child  # @step:heapify

    if largest_index != root_index:  # @step:swap
        sorted_array[root_index], sorted_array[largest_index] = (  # @step:swap
            sorted_array[largest_index],
            sorted_array[root_index],
        )
        heapify(sorted_array, heap_size, largest_index)  # @step:heapify


def heap_sort(sorted_array: list[int], slice_start: int, slice_end: int) -> None:  # @step:heapify
    slice_length = slice_end - slice_start + 1  # @step:heapify

    for build_index in range(slice_length // 2 - 1, -1, -1):  # @step:heapify
        heapify(sorted_array, slice_length, build_index)  # @step:heapify

    for extract_index in range(slice_length - 1, 0, -1):  # @step:swap
        sorted_array[slice_start], sorted_array[slice_start + extract_index] = (  # @step:swap
            sorted_array[slice_start + extract_index],
            sorted_array[slice_start],
        )
        heapify(sorted_array, extract_index, 0)  # @step:heapify


def lomuto_partition(sorted_array: list[int], partition_start: int, partition_end: int) -> int:  # @step:partition
    pivot_value = sorted_array[partition_end]  # @step:partition
    partition_index = partition_start - 1  # @step:partition

    for scan_index in range(partition_start, partition_end):  # @step:compare
        if sorted_array[scan_index] <= pivot_value:  # @step:compare
            partition_index += 1  # @step:swap
            sorted_array[partition_index], sorted_array[scan_index] = (  # @step:swap
                sorted_array[scan_index],
                sorted_array[partition_index],
            )

    sorted_array[partition_index + 1], sorted_array[partition_end] = (  # @step:swap
        sorted_array[partition_end],
        sorted_array[partition_index + 1],
    )
    return partition_index + 1  # @step:partition


def intro_sort_recurse(
    sorted_array: list[int], range_start: int, range_end: int, depth_limit: int
) -> None:
    range_size = range_end - range_start + 1

    if range_size <= INSERTION_SORT_THRESHOLD:  # @step:insertion-pass
        insertion_sort_slice(sorted_array, range_start, range_end)  # @step:insertion-pass
        return

    if depth_limit == 0:  # @step:heapify
        heap_sort(sorted_array, range_start, range_end)  # @step:heapify
        return

    pivot_index = lomuto_partition(sorted_array, range_start, range_end)  # @step:partition
    intro_sort_recurse(sorted_array, range_start, pivot_index - 1, depth_limit - 1)  # @step:partition
    intro_sort_recurse(sorted_array, pivot_index + 1, range_end, depth_limit - 1)  # @step:partition


def intro_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    if array_length <= 1:
        return sorted_array  # @step:complete

    depth_limit = 2 * int(math.log2(array_length))  # @step:initialize
    intro_sort_recurse(sorted_array, 0, array_length - 1, depth_limit)  # @step:partition

    # @step:mark-sorted
    return sorted_array  # @step:complete
