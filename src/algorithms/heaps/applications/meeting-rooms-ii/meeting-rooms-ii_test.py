import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

meeting_rooms_ii = importlib.import_module("meeting-rooms-ii").meeting_rooms_ii


def test_classic_example():
    assert meeting_rooms_ii([[0, 30], [5, 10], [15, 20]]) == 2


def test_default_with_4_meetings():
    assert meeting_rooms_ii([[0, 30], [5, 10], [15, 20], [2, 7]]) == 3


def test_sequential_non_overlapping():
    assert meeting_rooms_ii([[0, 5], [5, 10], [10, 15]]) == 1


def test_all_overlap():
    assert meeting_rooms_ii([[0, 100], [1, 99], [2, 98]]) == 3


def test_empty():
    assert meeting_rooms_ii([]) == 0


def test_single_meeting():
    assert meeting_rooms_ii([[0, 30]]) == 1


def test_reverse_order():
    assert meeting_rooms_ii([[15, 20], [5, 10], [0, 30]]) == 2


def test_end_equals_start():
    assert meeting_rooms_ii([[0, 10], [10, 20], [10, 30]]) == 2


def test_two_identical_meetings():
    assert meeting_rooms_ii([[0, 5], [0, 5]]) == 2


if __name__ == "__main__":
    test_classic_example()
    test_default_with_4_meetings()
    test_sequential_non_overlapping()
    test_all_overlap()
    test_empty()
    test_single_meeting()
    test_reverse_order()
    test_end_equals_start()
    test_two_identical_meetings()
    print("All tests passed!")
