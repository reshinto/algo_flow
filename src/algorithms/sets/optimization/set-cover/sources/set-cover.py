# Greedy Set Cover approximation
# Finds the minimum number of subsets that cover all elements of the universe.
# Time: O(n × m) where n = |universe|, m = |sets|
# Space: O(n + m) for the uncovered set and selected sets tracking


def set_cover(
    universe: list[int], sets: list[list[int]]
) -> dict[str, list[int] | list[list[int]]]:
    uncovered = set(universe)  # @step:initialize
    selected_indices: list[int] = []
    selected_sets: list[list[int]] = []

    while len(uncovered) > 0:  # @step:evaluate-set
        best_set_idx = -1
        best_coverage = 0

        for set_idx, candidate_set in enumerate(sets):
            coverage = sum(1 for elem in candidate_set if elem in uncovered)  # @step:evaluate-set
            if coverage > best_coverage:
                best_coverage = coverage
                best_set_idx = set_idx

        if best_set_idx == -1:
            break

        chosen_set = sets[best_set_idx]
        selected_indices.append(best_set_idx)  # @step:select-set
        selected_sets.append(chosen_set)

        for element in chosen_set:
            uncovered.discard(element)  # @step:cover-elements

    return {"selected_indices": selected_indices, "selected_sets": selected_sets}  # @step:complete
