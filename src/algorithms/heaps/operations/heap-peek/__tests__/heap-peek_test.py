import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

heap_peek = importlib.import_module("heap-peek").heap_peek


def test_returns_minimum():
    assert heap_peek([1, 3, 5, 7, 9, 8, 6]) == 1


def test_single_element():
    assert heap_peek([42]) == 42


def test_two_element():
    assert heap_peek([2, 7]) == 2


def test_idempotent():
    heap = [1, 3, 5, 7]
    first = heap_peek(heap)
    second = heap_peek(heap)
    assert first == second == 1


def test_larger_heap():
    assert heap_peek([1, 3, 2, 7, 5, 8, 4, 9, 6]) == 1


if __name__ == "__main__":
    test_returns_minimum()
    test_single_element()
    test_two_element()
    test_idempotent()
    test_larger_heap()
    print("All tests passed!")
