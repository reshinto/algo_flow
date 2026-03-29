# Boyer-Moore Voting Algorithm — O(n) majority element via candidate cancellation
def boyer_moore_voting(input_array: list[int]) -> dict:
    if len(input_array) == 0:  # @step:initialize
        return {"majority_element": -1, "count": 0}  # @step:initialize

    candidate = input_array[0]  # @step:initialize
    vote_count = 0  # @step:initialize

    # Phase 1: Find candidate using cancellation
    for element_index in range(len(input_array)):
        current_element = input_array[element_index]  # @step:visit

        if vote_count == 0:  # @step:compare
            candidate = current_element  # @step:compare
            vote_count = 1  # @step:compare
        elif current_element == candidate:
            vote_count += 1  # @step:visit
        else:
            vote_count -= 1  # @step:visit

    return {"majority_element": candidate, "count": vote_count}  # @step:complete
