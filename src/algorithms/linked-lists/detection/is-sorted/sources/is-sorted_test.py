import importlib

module = importlib.import_module("is-sorted")
is_sorted = module.is_sorted
ListNode = module.ListNode


def build_list(values):
    head = None
    for val in reversed(values):
        head = ListNode(val, head)
    return head


def test_sorted_list():
    assert is_sorted(build_list([1, 3, 5, 7, 9])) is True


def test_empty_list():
    assert is_sorted(None) is True


def test_single_node():
    assert is_sorted(build_list([42])) is True


def test_unsorted_list():
    assert is_sorted(build_list([1, 5, 3, 7])) is False


def test_list_with_duplicates():
    assert is_sorted(build_list([2, 2, 3, 3, 5])) is True


def test_two_node_sorted():
    assert is_sorted(build_list([1, 2])) is True


def test_two_node_unsorted():
    assert is_sorted(build_list([5, 2])) is False


def test_first_pair_unsorted():
    assert is_sorted(build_list([5, 1, 2, 3])) is False


def test_long_sorted_list():
    assert is_sorted(build_list([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])) is True


def test_last_pair_unsorted():
    assert is_sorted(build_list([1, 2, 3, 2])) is False


if __name__ == "__main__":
    test_sorted_list()
    test_empty_list()
    test_single_node()
    test_unsorted_list()
    test_list_with_duplicates()
    test_two_node_sorted()
    test_two_node_unsorted()
    test_first_pair_unsorted()
    test_long_sorted_list()
    test_last_pair_unsorted()
    print("All tests passed.")
