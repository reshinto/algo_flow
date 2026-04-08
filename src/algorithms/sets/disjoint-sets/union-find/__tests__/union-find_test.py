import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
import sys

union_find_module = importlib.import_module("union-find")
union_find = union_find_module.union_find


def test_merges_all_into_one_component():
    output = union_find(8, [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [4, 6], [0, 4]])
    assert output["components"] is not None
    assert len(output["components"]) == 1
    assert len(output["components"][0]) == 8


def test_no_operations_each_element_own_component():
    output = union_find(4, [])
    assert len(output["components"]) == 4
    for component in output["components"]:
        assert len(component) == 1


def test_single_union_merges_exactly_two():
    output = union_find(4, [[0, 1]])
    assert len(output["components"]) == 3
    merged = next(c for c in output["components"] if len(c) == 2)
    assert sorted(merged) == [0, 1]


def test_duplicate_union_leaves_count_unchanged():
    output = union_find(4, [[0, 1], [0, 1]])
    assert len(output["components"]) == 3


def test_all_elements_accounted_for():
    output = union_find(6, [[0, 1], [2, 3]])
    all_elements = sorted(elem for component in output["components"] for elem in component)
    assert all_elements == [0, 1, 2, 3, 4, 5]


def test_single_element():
    output = union_find(1, [])
    assert len(output["components"]) == 1
    assert output["components"][0] == [0]


def test_two_elements_with_union():
    output = union_find(2, [[0, 1]])
    assert len(output["components"]) == 1
    assert sorted(output["components"][0]) == [0, 1]


def test_chain_of_unions():
    output = union_find(4, [[0, 1], [1, 2], [2, 3]])
    assert len(output["components"]) == 1
    assert len(output["components"][0]) == 4


def test_union_commutative():
    output_ab = union_find(4, [[0, 1]])
    output_ba = union_find(4, [[1, 0]])
    assert len(output_ab["components"]) == len(output_ba["components"])


if __name__ == "__main__":
    test_merges_all_into_one_component()
    test_no_operations_each_element_own_component()
    test_single_union_merges_exactly_two()
    test_duplicate_union_leaves_count_unchanged()
    test_all_elements_accounted_for()
    test_single_element()
    test_two_elements_with_union()
    test_chain_of_unions()
    test_union_commutative()
    print("All tests passed!")
