import importlib

module = importlib.import_module("find-node-by-value")
find_node_by_value = module.find_node_by_value
ListNode = module.ListNode


def build_list(values):
    head = None
    for val in reversed(values):
        head = ListNode(val, head)
    return head


def test_found_at_head():
    result = find_node_by_value(build_list([5, 2, 3, 4]), 5)
    assert result is not None
    assert result.value == 5


def test_found_in_middle():
    result = find_node_by_value(build_list([1, 2, 7, 4, 5]), 7)
    assert result is not None
    assert result.value == 7


def test_found_at_end():
    result = find_node_by_value(build_list([1, 2, 3, 9]), 9)
    assert result is not None
    assert result.value == 9


def test_not_found():
    result = find_node_by_value(build_list([1, 2, 3, 4]), 42)
    assert result is None


def test_empty_list():
    result = find_node_by_value(None, 5)
    assert result is None


def test_single_node_match():
    result = find_node_by_value(build_list([42]), 42)
    assert result is not None
    assert result.value == 42


def test_single_node_no_match():
    result = find_node_by_value(build_list([42]), 7)
    assert result is None


if __name__ == "__main__":
    test_found_at_head()
    test_found_in_middle()
    test_found_at_end()
    test_not_found()
    test_empty_list()
    test_single_node_match()
    test_single_node_no_match()
    print("All tests passed.")
