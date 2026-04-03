def merge_insertion_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    if array_length <= 1:  # @step:initialize
        return sorted_array  # @step:initialize

    def binary_search_insertion_point(
        target_value: int, search_array: list[int], left_bound: int, right_bound: int
    ) -> int:  # @step:binary-insert
        low = left_bound
        high = right_bound

        while low < high:  # @step:binary-insert
            mid_point = (low + high) // 2  # @step:binary-insert
            if search_array[mid_point] < target_value:  # @step:binary-insert
                low = mid_point + 1
            else:
                high = mid_point

        return low  # @step:binary-insert

    # Step 1: Compare pairs and ensure larger element is first in each pair
    pair_count = array_length // 2
    has_unpaired = array_length % 2 == 1

    for pair_index in range(pair_count):  # @step:pair
        left_pos = pair_index * 2  # @step:compare
        right_pos = left_pos + 1  # @step:compare

        if sorted_array[left_pos] < sorted_array[right_pos]:  # @step:compare
            sorted_array[left_pos], sorted_array[right_pos] = (  # @step:swap
                sorted_array[right_pos],
                sorted_array[left_pos],
            )

    # Step 2: Extract larger and smaller elements from each pair
    larger_elements: list[int] = []
    smaller_elements: list[int] = []

    for pair_index in range(pair_count):  # @step:pair
        larger_elements.append(sorted_array[pair_index * 2])
        smaller_elements.append(sorted_array[pair_index * 2 + 1])

    if has_unpaired:  # @step:pair
        smaller_elements.append(sorted_array[array_length - 1])

    # Step 3: Sort the larger elements using insertion sort
    for insert_index in range(1, len(larger_elements)):  # @step:compare
        current_value = larger_elements[insert_index]  # @step:compare
        inner_index = insert_index - 1

        while inner_index >= 0 and larger_elements[inner_index] > current_value:  # @step:compare
            larger_elements[inner_index + 1] = larger_elements[inner_index]  # @step:swap
            inner_index -= 1

        larger_elements[inner_index + 1] = current_value  # @step:binary-insert

    # Step 4: Place larger elements into result, then binary-insert smaller elements
    for result_index, value in enumerate(larger_elements):
        sorted_array[result_index] = value  # @step:binary-insert

    inserted_count = len(larger_elements)

    for value_to_insert in smaller_elements:  # @step:binary-insert
        insertion_position = binary_search_insertion_point(
            value_to_insert, sorted_array, 0, inserted_count
        )  # @step:compare

        # Shift elements right and insert
        for shift_index in range(inserted_count, insertion_position, -1):  # @step:swap
            sorted_array[shift_index] = sorted_array[shift_index - 1]

        sorted_array[insertion_position] = value_to_insert  # @step:binary-insert
        inserted_count += 1

    # @step:mark-sorted

    return sorted_array  # @step:complete
