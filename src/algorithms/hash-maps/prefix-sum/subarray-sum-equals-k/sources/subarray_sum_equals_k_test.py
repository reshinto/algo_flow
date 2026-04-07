import importlib

subarray_sum_equals_k = importlib.import_module("subarray-sum-equals-k").subarray_sum_equals_k


def test_counts_two_subarrays_for_default():
    assert subarray_sum_equals_k([1, 1, 1], 2) == 2


def test_returns_2_for_1_2_3_target_3():
    assert subarray_sum_equals_k([1, 2, 3], 3) == 2


def test_returns_0_when_no_subarray_sums_to_target():
    assert subarray_sum_equals_k([1, 2, 3], 10) == 0


def test_handles_single_element_matching_target():
    assert subarray_sum_equals_k([5], 5) == 1


def test_handles_single_element_not_matching():
    assert subarray_sum_equals_k([5], 3) == 0


def test_handles_negative_numbers():
    assert subarray_sum_equals_k([1, -1, 1], 1) == 3


def test_handles_entire_array_summing_to_target():
    assert subarray_sum_equals_k([1, 2, 3, 4], 10) == 1


def test_counts_multiple_overlapping_subarrays():
    assert subarray_sum_equals_k([0, 0, 0], 0) == 6


def test_handles_all_same_elements():
    assert subarray_sum_equals_k([2, 2, 2, 2], 4) == 3


def test_handles_target_zero_with_mixed_values():
    assert subarray_sum_equals_k([1, -1, 2, -2], 0) == 3


if __name__ == "__main__":
    test_counts_two_subarrays_for_default()
    test_returns_2_for_1_2_3_target_3()
    test_returns_0_when_no_subarray_sums_to_target()
    test_handles_single_element_matching_target()
    test_handles_single_element_not_matching()
    test_handles_negative_numbers()
    test_handles_entire_array_summing_to_target()
    test_counts_multiple_overlapping_subarrays()
    test_handles_all_same_elements()
    test_handles_target_zero_with_mixed_values()
    print("All tests passed!")
