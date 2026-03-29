# Find Missing Number — XOR approach: XOR all elements with expected range 0..n, pair cancellations leave the missing number
def find_missing_number(input_array: list[int]) -> dict:
    array_length = len(input_array)  # @step:initialize
    current_xor = 0  # @step:initialize

    for expected_range in range(array_length + 1):
        current_xor ^= expected_range  # @step:compare

    for scan_index in range(array_length):
        current_xor ^= input_array[scan_index]  # @step:visit

    return {"missing_number": current_xor}  # @step:complete
