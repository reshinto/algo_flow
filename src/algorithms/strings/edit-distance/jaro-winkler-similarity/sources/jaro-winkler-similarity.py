# Jaro-Winkler Similarity
# Computes similarity between two strings using the Jaro formula,
# then boosts the score if the strings share a common prefix (up to 4 chars).
# Returns a value between 0.0 (completely dissimilar) and 1.0 (identical).
# Time: O(nm), Space: O(n)


def jaro_winkler_similarity(source: str, target: str) -> float:
    source_length = len(source)  # @step:initialize
    target_length = len(target)  # @step:initialize

    # Identical strings have similarity 1.0
    if source == target:  # @step:initialize
        return 1.0

    # Either empty string has similarity 0.0
    if source_length == 0 or target_length == 0:  # @step:initialize
        return 0.0

    # Match window: characters within this distance can be considered matching
    match_window = max(source_length, target_length) // 2 - 1  # @step:initialize

    source_matched = [False] * source_length  # @step:initialize
    target_matched = [False] * target_length  # @step:initialize
    match_count = 0  # @step:initialize

    # Find matching characters within the match window
    for source_idx in range(source_length):  # @step:compare
        window_start = max(0, source_idx - match_window)  # @step:compare
        window_end = min(target_length - 1, source_idx + match_window)  # @step:compare

        for target_idx in range(window_start, window_end + 1):  # @step:compare
            if not target_matched[target_idx] and source[source_idx] == target[target_idx]:  # @step:compare
                source_matched[source_idx] = True  # @step:compute-distance
                target_matched[target_idx] = True  # @step:compute-distance
                match_count += 1  # @step:compute-distance
                break

    # No matches means similarity is 0
    if match_count == 0:  # @step:compute-distance
        return 0.0

    # Count transpositions: matched chars in different order
    transposition_count = 0  # @step:compute-distance
    target_scan_idx = 0  # @step:compute-distance

    for source_idx in range(source_length):  # @step:compute-distance
        if not source_matched[source_idx]:  # @step:compute-distance
            continue

        while not target_matched[target_scan_idx]:  # @step:compute-distance
            target_scan_idx += 1  # @step:compute-distance

        if source[source_idx] != target[target_scan_idx]:  # @step:compute-distance
            transposition_count += 1  # @step:compute-distance

        target_scan_idx += 1  # @step:compute-distance

    # Jaro similarity formula
    half_transpositions = transposition_count / 2  # @step:compute-distance
    jaro_score = (  # @step:compute-distance
        match_count / source_length
        + match_count / target_length
        + (match_count - half_transpositions) / match_count
    ) / 3

    # Count common prefix length (up to 4 characters)
    max_prefix_length = 4  # @step:compute-distance
    prefix_length = 0  # @step:compute-distance

    for prefix_idx in range(min(max_prefix_length, source_length, target_length)):  # @step:compute-distance
        if source[prefix_idx] == target[prefix_idx]:  # @step:compute-distance
            prefix_length += 1  # @step:compute-distance
        else:
            break  # @step:compute-distance

    # Winkler bonus: reward common prefix
    winkler_bonus = prefix_length * 0.1 * (1 - jaro_score)  # @step:compute-distance
    jaro_winkler_score = jaro_score + winkler_bonus  # @step:compute-distance

    return round(jaro_winkler_score, 4)  # @step:complete
