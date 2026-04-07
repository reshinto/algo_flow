import importlib

set_permutations_module = importlib.import_module("set-permutations")
set_permutations = set_permutations_module.set_permutations


def test_generates_6_permutations_for_3_elements():
    result = set_permutations([1, 2, 3])
    assert len(result) == 6


def test_contains_all_expected_permutations():
    result = set_permutations([1, 2, 3])
    serialized = sorted(",".join(str(v) for v in perm) for perm in result)
    expected = sorted(["1,2,3", "1,3,2", "2,1,3", "2,3,1", "3,1,2", "3,2,1"])
    assert serialized == expected


def test_two_elements_generates_two_permutations():
    result = set_permutations([1, 2])
    assert len(result) == 2
    serialized = sorted(",".join(str(v) for v in perm) for perm in result)
    assert serialized == ["1,2", "2,1"]


def test_single_element_generates_one_permutation():
    result = set_permutations([42])
    assert len(result) == 1
    assert result[0] == [42]


def test_empty_array_generates_one_permutation():
    result = set_permutations([])
    assert len(result) == 1
    assert result[0] == []


def test_each_permutation_has_same_length():
    result = set_permutations([1, 2, 3])
    for perm in result:
        assert len(perm) == 3


def test_generates_24_permutations_for_4_elements():
    result = set_permutations([1, 2, 3, 4])
    assert len(result) == 24


def test_all_permutations_are_distinct():
    result = set_permutations([1, 2, 3])
    serialized = [",".join(str(v) for v in perm) for perm in result]
    assert len(set(serialized)) == len(result)


if __name__ == "__main__":
    test_generates_6_permutations_for_3_elements()
    test_contains_all_expected_permutations()
    test_two_elements_generates_two_permutations()
    test_single_element_generates_one_permutation()
    test_empty_array_generates_one_permutation()
    test_each_permutation_has_same_length()
    test_generates_24_permutations_for_4_elements()
    test_all_permutations_are_distinct()
    print("All tests passed!")
