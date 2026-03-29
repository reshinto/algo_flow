# First Missing Positive — O(n) time, O(1) space via index-as-value placement
def first_missing_positive(input_array: list[int]) -> dict:
    result = input_array[:]
    array_length = len(result)  # @step:initialize

    # Phase 1: Place each value v in range [1..n] at index v-1 by swapping
    for placement_index in range(array_length):
        # Keep swapping until the current slot holds its correct value or an out-of-range value
        while (
            1 <= result[placement_index] <= array_length
            and result[result[placement_index] - 1] != result[placement_index]
        ):
            correct_index = result[placement_index] - 1  # @step:compare
            result[correct_index], result[placement_index] = (  # @step:swap
                result[placement_index],
                result[correct_index],
            )

    # Phase 2: Scan for the first index where arr[index] != index + 1
    for scan_index in range(array_length):
        if result[scan_index] != scan_index + 1:
            return {"missing_positive": scan_index + 1}  # @step:compare

    return {"missing_positive": array_length + 1}  # @step:complete
