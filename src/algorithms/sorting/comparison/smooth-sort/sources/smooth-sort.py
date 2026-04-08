def smooth_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    if array_length <= 1:  # @step:initialize
        return sorted_array  # @step:initialize

    # Precompute Leonardo numbers up to array_length
    leonardo_numbers: list[int] = [1, 1]  # @step:initialize
    while leonardo_numbers[-1] < array_length:
        leonardo_numbers.append(leonardo_numbers[-1] + leonardo_numbers[-2] + 1)

    def sift(root_index: int, order: int) -> None:  # @step:build-heap
        current_root = root_index
        current_order = order

        while current_order >= 2:
            right_child = current_root - 1  # @step:compare
            left_child = current_root - 1 - leonardo_numbers[current_order - 1]  # @step:compare

            largest_index = current_root
            if right_child >= 0 and sorted_array[right_child] > sorted_array[largest_index]:
                largest_index = right_child  # @step:compare
            if left_child >= 0 and sorted_array[left_child] > sorted_array[largest_index]:
                largest_index = left_child  # @step:compare

            if largest_index == current_root:  # @step:compare
                break

            sorted_array[current_root], sorted_array[largest_index] = (  # @step:swap
                sorted_array[largest_index],
                sorted_array[current_root],
            )

            if largest_index == right_child:
                current_order = current_order - 1
            else:
                current_order = current_order - 2
            current_root = largest_index

    def trinkle(root_index: int, order: int, prev_positions: list[int], prev_orders: list[int]) -> None:  # @step:build-heap
        current_root = root_index
        current_order = order
        positions = list(prev_positions)
        orders = list(prev_orders)

        while positions:
            prev_root_index = positions[-1]

            if sorted_array[current_root] >= sorted_array[prev_root_index]:  # @step:compare
                break

            if current_order >= 2:
                right_child = current_root - 1
                left_child = current_root - 1 - leonardo_numbers[current_order - 1]
                if sorted_array[prev_root_index] < sorted_array[right_child] or sorted_array[prev_root_index] < sorted_array[left_child]:  # @step:compare
                    break

            sorted_array[current_root], sorted_array[prev_root_index] = (  # @step:swap
                sorted_array[prev_root_index],
                sorted_array[current_root],
            )

            prev_root_order = orders[-1]
            positions.pop()
            orders.pop()
            current_root = prev_root_index
            current_order = prev_root_order

        sift(current_root, current_order)

    # Build Leonardo heap forest
    heap_positions: list[int] = []
    heap_orders: list[int] = []

    for build_index in range(array_length):  # @step:build-heap
        root_count = len(heap_orders)
        if root_count >= 2 and heap_orders[root_count - 1] == heap_orders[root_count - 2] + 1:
            new_order = heap_orders[root_count - 1] + 1
            heap_positions = heap_positions[:root_count - 2]
            heap_orders = heap_orders[:root_count - 2]
            heap_positions.append(build_index)
            heap_orders.append(new_order)
        elif root_count >= 1 and heap_orders[root_count - 1] == 1:
            heap_positions.append(build_index)
            heap_orders.append(0)
        else:
            heap_positions.append(build_index)
            heap_orders.append(1)

        last_index = len(heap_positions) - 1
        trinkle(
            heap_positions[last_index],
            heap_orders[last_index],
            heap_positions[:last_index],
            heap_orders[:last_index],
        )

    # Extract phase
    for extract_index in range(array_length - 1, -1, -1):  # @step:extract
        current_order = heap_orders[-1]
        heap_positions.pop()
        heap_orders.pop()

        if current_order >= 2:
            right_root = extract_index - 1
            left_root = extract_index - 1 - leonardo_numbers[current_order - 1]
            heap_positions.append(left_root)
            heap_orders.append(current_order - 2)
            heap_positions.append(right_root)
            heap_orders.append(current_order - 1)

            last_index = len(heap_positions) - 1
            trinkle(left_root, current_order - 2, heap_positions[:last_index - 1], heap_orders[:last_index - 1])
            trinkle(right_root, current_order - 1, heap_positions[:last_index], heap_orders[:last_index])

        # @step:mark-sorted

    return sorted_array  # @step:complete
