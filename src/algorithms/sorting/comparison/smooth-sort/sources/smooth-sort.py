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
            left_child = current_root - 1 - leonardo_numbers[current_order - 2]  # @step:compare

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

            current_order = (current_order - 1) if largest_index == right_child else (current_order - 2)
            current_root = largest_index

    def trinkle(root_index: int, order: int, heap_roots: list[tuple[int, int]]) -> None:  # @step:build-heap
        current_root = root_index
        current_order = order

        while heap_roots:
            prev_root, prev_order = heap_roots[-1]

            if sorted_array[current_root] >= sorted_array[prev_root]:  # @step:compare
                break

            if current_order >= 2:
                right_child = current_root - 1
                left_child = current_root - 1 - leonardo_numbers[current_order - 2]
                if sorted_array[prev_root] <= sorted_array[right_child] or sorted_array[prev_root] <= sorted_array[left_child]:  # @step:compare
                    break

            sorted_array[current_root], sorted_array[prev_root] = (  # @step:swap
                sorted_array[prev_root],
                sorted_array[current_root],
            )

            heap_roots.pop()
            current_root = prev_root
            current_order = prev_order

        sift(current_root, current_order)

    # Build Leonardo heap forest
    heap_roots: list[tuple[int, int]] = []

    for build_index in range(array_length):  # @step:build-heap
        root_count = len(heap_roots)
        if (
            root_count >= 2
            and heap_roots[-2][1] == heap_roots[-1][1] + 1
        ):
            prev_order = heap_roots[-2][1]
            heap_roots = heap_roots[:-2]
            heap_roots.append((build_index, prev_order + 1))
        elif root_count >= 1 and heap_roots[-1][1] == 1:
            heap_roots.append((build_index, 0))
        else:
            heap_roots.append((build_index, 1))

        trinkle(build_index, heap_roots[-1][1], heap_roots[:-1])

    # Extract phase
    for extract_index in range(array_length - 1, -1, -1):  # @step:extract
        current_order = heap_roots[-1][1]
        heap_roots.pop()

        if current_order >= 2:
            right_root = extract_index - 1
            left_root = extract_index - 1 - leonardo_numbers[current_order - 2]
            heap_roots.append((left_root, current_order - 2))
            heap_roots.append((right_root, current_order - 1))

            trinkle(left_root, current_order - 2, heap_roots[:-2])
            trinkle(right_root, current_order - 1, heap_roots[:-1])

        # @step:mark-sorted

    return sorted_array  # @step:complete
