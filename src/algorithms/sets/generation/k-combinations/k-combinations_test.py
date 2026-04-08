import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

k_combinations_module = importlib.import_module("k-combinations")
k_combinations = k_combinations_module.k_combinations


def test_c_5_3_equals_10():
    result = k_combinations([1, 2, 3, 4, 5], 3)
    assert len(result) == 10


def test_every_subset_has_k_elements():
    result = k_combinations([1, 2, 3, 4, 5], 3)
    for subset in result:
        assert len(subset) == 3


def test_all_expected_combinations():
    result = k_combinations([1, 2, 3, 4, 5], 3)
    serialized = sorted(",".join(str(v) for v in sorted(subset)) for subset in result)
    expected = sorted(["1,2,3", "1,2,4", "1,2,5", "1,3,4", "1,3,5",
                       "1,4,5", "2,3,4", "2,3,5", "2,4,5", "3,4,5"])
    assert serialized == expected


def test_c_4_2_equals_6():
    result = k_combinations([1, 2, 3, 4], 2)
    assert len(result) == 6


def test_k_equals_n_full_set():
    result = k_combinations([1, 2, 3], 3)
    assert len(result) == 1
    assert sorted(result[0]) == [1, 2, 3]


def test_k_equals_1_each_element_alone():
    result = k_combinations([5, 10, 15], 1)
    assert len(result) == 3
    for subset in result:
        assert len(subset) == 1


def test_k_zero_returns_empty_subset():
    result = k_combinations([1, 2, 3], 0)
    assert len(result) == 1
    assert result[0] == []


def test_k_exceeds_n_returns_empty():
    result = k_combinations([1, 2], 5)
    assert len(result) == 0


def test_empty_input_with_positive_k():
    result = k_combinations([], 2)
    assert len(result) == 0


def test_no_duplicate_combinations():
    result = k_combinations([1, 2, 3, 4, 5], 3)
    serialized = [",".join(str(v) for v in sorted(subset)) for subset in result]
    assert len(set(serialized)) == len(result)


if __name__ == "__main__":
    test_c_5_3_equals_10()
    test_every_subset_has_k_elements()
    test_all_expected_combinations()
    test_c_4_2_equals_6()
    test_k_equals_n_full_set()
    test_k_equals_1_each_element_alone()
    test_k_zero_returns_empty_subset()
    test_k_exceeds_n_returns_empty()
    test_empty_input_with_positive_k()
    test_no_duplicate_combinations()
    print("All tests passed!")
