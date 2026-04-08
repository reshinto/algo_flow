import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

set_cover_module = importlib.import_module("set-cover")
set_cover = set_cover_module.set_cover


def test_covers_default_universe():
    result = set_cover(
        [1, 2, 3, 4, 5, 6, 7, 8],
        [[1, 2, 3], [2, 4], [3, 4, 5], [5, 6, 7], [6, 7, 8]],
    )
    covered = set(elem for selected_set in result["selected_sets"] for elem in selected_set)
    assert 1 in covered and 8 in covered
    assert 0 < len(result["selected_sets"]) <= 5


def test_single_set_covers_universe():
    result = set_cover([1, 2, 3], [[1, 2, 3], [1], [2]])
    assert len(result["selected_sets"]) == 1
    assert result["selected_indices"][0] == 0


def test_disjoint_singletons():
    result = set_cover([1, 2, 3], [[1], [2], [3]])
    covered = set(elem for selected_set in result["selected_sets"] for elem in selected_set)
    assert covered == {1, 2, 3}
    assert len(result["selected_sets"]) == 3


def test_selects_greediest_first():
    result = set_cover([1, 2, 3, 4], [[1, 2, 3], [4]])
    assert result["selected_indices"][0] == 0


def test_empty_universe_returns_empty_selection():
    result = set_cover([], [[1, 2], [3, 4]])
    assert len(result["selected_indices"]) == 0
    assert len(result["selected_sets"]) == 0


def test_single_element_universe():
    result = set_cover([7], [[1, 2], [7, 8], [3]])
    assert len(result["selected_sets"]) == 1
    covered = set(elem for selected_set in result["selected_sets"] for elem in selected_set)
    assert 7 in covered


def test_selected_indices_match_selected_sets():
    all_sets = [[1, 2, 3], [2, 4], [3, 4, 5], [5, 6, 7], [6, 7, 8]]
    result = set_cover([1, 2, 3, 4, 5, 6, 7, 8], all_sets)
    for pos, idx in enumerate(result["selected_indices"]):
        assert result["selected_sets"][pos] == all_sets[idx]


if __name__ == "__main__":
    test_covers_default_universe()
    test_single_set_covers_universe()
    test_disjoint_singletons()
    test_selects_greediest_first()
    test_empty_universe_returns_empty_selection()
    test_single_element_universe()
    test_selected_indices_match_selected_sets()
    print("All tests passed!")
