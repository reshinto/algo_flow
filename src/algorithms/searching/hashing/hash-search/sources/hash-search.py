def hash_search(array: list[int], target_value: int) -> int:  # @step:initialize
    hash_map: dict[int, int] = {}  # @step:initialize

    # Build phase: insert every element into the hash map
    for element_index, element_value in enumerate(array):  # @step:visit
        hash_map[element_value] = element_index  # @step:visit

    # Search phase: O(1) lookup
    if target_value in hash_map:  # @step:compare,found
        return hash_map[target_value]  # @step:found

    return -1  # @step:complete
