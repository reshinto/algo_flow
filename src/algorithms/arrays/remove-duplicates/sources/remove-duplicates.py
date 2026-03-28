# Remove Duplicates from Sorted Array — O(n) two-pointer: write pointer tracks unique boundary
def remove_duplicates(sorted_array: list[int]) -> dict:
    if len(sorted_array) == 0:  # @step:initialize
        return {"unique_count": 0, "result": []}  # @step:initialize

    result = sorted_array[:]
    write_pointer = 0  # @step:initialize

    for read_pointer in range(1, len(result)):
        if result[read_pointer] != result[write_pointer]:  # @step:compare
            write_pointer += 1  # @step:swap
            result[write_pointer] = result[read_pointer]  # @step:swap

    return {"unique_count": write_pointer + 1, "result": result[: write_pointer + 1]}  # @step:complete
