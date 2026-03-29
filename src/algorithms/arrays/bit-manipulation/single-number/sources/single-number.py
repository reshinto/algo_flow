# Single Number (XOR) — every element appears twice except one; XOR cancels all pairs, leaving the unique element
def single_number(input_array: list[int]) -> dict:
    running_xor = 0  # @step:initialize

    for scan_index in range(len(input_array)):
        running_xor ^= input_array[scan_index]  # @step:visit

    return {"unique_element": running_xor}  # @step:complete
