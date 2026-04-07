import importlib

power_set_module = importlib.import_module("power-set")
power_set = power_set_module.power_set


def test_generates_2_to_n_subsets():
    result = power_set([1, 2, 3, 4])
    assert len(result) == 16


def test_includes_empty_set():
    result = power_set([1, 2, 3])
    assert any(len(subset) == 0 for subset in result)


def test_includes_full_set():
    result = power_set([1, 2, 3])
    assert any(sorted(subset) == [1, 2, 3] for subset in result)


def test_empty_input_returns_one_empty_subset():
    result = power_set([])
    assert len(result) == 1
    assert result[0] == []


def test_single_element_returns_two_subsets():
    result = power_set([7])
    assert len(result) == 2


def test_two_elements_returns_four_subsets():
    result = power_set([1, 2])
    assert len(result) == 4


def test_three_elements_returns_eight_subsets():
    result = power_set([1, 2, 3])
    assert len(result) == 8


def test_contains_all_expected_subsets():
    result = power_set([1, 2, 3])
    normalized = sorted(tuple(sorted(subset)) for subset in result)
    expected = sorted([(), (1,), (2,), (3,), (1, 2), (1, 3), (2, 3), (1, 2, 3)])
    assert normalized == expected


def test_no_duplicate_subsets():
    result = power_set([1, 2, 3, 4])
    serialized = [",".join(str(v) for v in sorted(subset)) for subset in result]
    assert len(set(serialized)) == len(result)


def test_each_subset_contains_only_input_elements():
    input_elements = [5, 10, 15]
    result = power_set(input_elements)
    for subset in result:
        for value in subset:
            assert value in input_elements


if __name__ == "__main__":
    test_generates_2_to_n_subsets()
    test_includes_empty_set()
    test_includes_full_set()
    test_empty_input_returns_one_empty_subset()
    test_single_element_returns_two_subsets()
    test_two_elements_returns_four_subsets()
    test_three_elements_returns_eight_subsets()
    test_contains_all_expected_subsets()
    test_no_duplicate_subsets()
    test_each_subset_contains_only_input_elements()
    print("All tests passed!")
