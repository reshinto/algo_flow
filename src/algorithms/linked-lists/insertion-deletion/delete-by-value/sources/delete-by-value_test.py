import importlib

module = importlib.import_module("delete-by-value")
delete_by_value = module.delete_by_value
ListNode = module.ListNode


def build_list(values):
    head = None
    for val in reversed(values):
        head = ListNode(val, head)
    return head


def list_to_array(head):
    result = []
    current = head
    while current is not None:
        result.append(current.value)
        current = current.next
    return result


def test_delete_middle():
    result = delete_by_value(build_list([1, 2, 3, 4, 5]), 3)
    assert list_to_array(result) == [1, 2, 4, 5]


def test_delete_head():
    result = delete_by_value(build_list([1, 2, 3]), 1)
    assert list_to_array(result) == [2, 3]


def test_delete_last():
    result = delete_by_value(build_list([1, 2, 3, 4]), 4)
    assert list_to_array(result) == [1, 2, 3]


def test_empty_list():
    result = delete_by_value(None, 5)
    assert result is None


def test_target_not_found():
    result = delete_by_value(build_list([1, 2, 3]), 99)
    assert list_to_array(result) == [1, 2, 3]


def test_single_node_match():
    result = delete_by_value(build_list([7]), 7)
    assert list_to_array(result) == []


def test_single_node_no_match():
    result = delete_by_value(build_list([7]), 5)
    assert list_to_array(result) == [7]


def test_only_first_occurrence_deleted():
    result = delete_by_value(build_list([1, 2, 2, 3]), 2)
    assert list_to_array(result) == [1, 2, 3]


if __name__ == "__main__":
    test_delete_middle()
    test_delete_head()
    test_delete_last()
    test_empty_list()
    test_target_not_found()
    test_single_node_match()
    test_single_node_no_match()
    test_only_first_occurrence_deleted()
    print("All tests passed.")
