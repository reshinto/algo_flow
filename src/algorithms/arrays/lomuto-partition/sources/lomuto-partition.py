# Lomuto Partition — O(n) partition scheme using last element as pivot and a boundary pointer
def lomuto_partition(input_array: list[int]) -> dict:
    if len(input_array) == 0:  # @step:initialize
        return {"pivot_index": -1, "result": []}  # @step:initialize

    result = input_array[:]  # @step:initialize
    pivot_original_index = len(result) - 1
    pivot_value = result[pivot_original_index]  # @step:initialize
    boundary_index = 0  # @step:initialize

    for scan_index in range(pivot_original_index):  # @step:visit
        if result[scan_index] <= pivot_value:  # @step:compare
            result[boundary_index], result[scan_index] = result[scan_index], result[boundary_index]  # @step:swap
            boundary_index += 1  # @step:visit

    # Place pivot into its final sorted position
    result[boundary_index], result[pivot_original_index] = result[pivot_original_index], result[boundary_index]  # @step:swap

    return {"pivot_index": boundary_index, "result": result}  # @step:complete
