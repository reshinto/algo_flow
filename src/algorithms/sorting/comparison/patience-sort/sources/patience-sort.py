import bisect


def find_pile_index(pile_tops: list[int], card_value: int) -> int:  # @step:compare
    # Binary search for the leftmost pile whose top is >= card_value
    return bisect.bisect_left(pile_tops, card_value)  # @step:compare


def patience_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    array_length = len(input_array)  # @step:initialize

    if array_length == 0:
        return []  # @step:complete

    piles: list[list[int]] = []  # @step:initialize
    pile_tops: list[int] = []  # @step:initialize

    # Place each card into the leftmost valid pile
    for card_index in range(array_length):  # @step:place-card
        card_value = input_array[card_index]  # @step:place-card
        target_pile_index = find_pile_index(pile_tops, card_value)  # @step:compare

        if target_pile_index == len(piles):  # @step:place-card
            piles.append([card_value])  # @step:place-card
            pile_tops.append(card_value)  # @step:place-card
        else:
            piles[target_pile_index].append(card_value)  # @step:place-card
            pile_tops[target_pile_index] = card_value  # @step:place-card

    # Merge all piles into sorted output using k-way merge
    sorted_array: list[int] = []  # @step:merge-piles
    # Piles are descending (bottom = max, top = min); pop() yields the minimum
    active_piles = [list(pile) for pile in piles]  # @step:merge-piles

    while any(pile for pile in active_piles):  # @step:merge-piles
        minimum_value = float("inf")  # @step:compare
        minimum_pile_index = 0  # @step:compare

        for pile_index in range(len(active_piles)):  # @step:compare
            if active_piles[pile_index]:  # @step:compare
                pile_top = active_piles[pile_index][-1]  # @step:compare
                if pile_top < minimum_value:  # @step:compare
                    minimum_value = pile_top  # @step:compare
                    minimum_pile_index = pile_index  # @step:compare

        sorted_array.append(active_piles[minimum_pile_index].pop())  # @step:swap
        active_piles = [pile for pile in active_piles if pile]  # @step:merge-piles

    # @step:mark-sorted
    return sorted_array  # @step:complete
