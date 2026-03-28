# Product of Array Except Self — O(n) two-pass prefix/suffix product (no division)
def product_except_self(input_array: list[int]) -> list[int]:
    array_length = len(input_array)  # @step:initialize
    if array_length == 0:  # @step:initialize
        return []  # @step:initialize

    result_array = [1] * array_length  # @step:initialize

    # Left pass: result_array[index] = product of all elements to the left
    prefix_product = 1  # @step:visit
    for scan_index in range(array_length):  # @step:visit
        result_array[scan_index] = prefix_product  # @step:visit
        prefix_product *= input_array[scan_index]  # @step:visit

    # Right pass: multiply each position by the product of all elements to the right
    suffix_product = 1  # @step:visit
    for scan_index in range(array_length - 1, -1, -1):  # @step:visit
        result_array[scan_index] *= suffix_product  # @step:visit
        suffix_product *= input_array[scan_index]  # @step:visit

    return result_array  # @step:complete
