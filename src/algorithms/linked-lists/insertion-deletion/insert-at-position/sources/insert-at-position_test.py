import importlib

module = importlib.import_module("insert-at-position")
insert_at_position = module.insert_at_position
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


def test_insert_at_position_2():
    result = insert_at_position(build_list([1, 3, 5, 7]), 4, 2)
    assert list_to_array(result) == [1, 3, 4, 5, 7]


def test_insert_at_head():
    result = insert_at_position(build_list([2, 3, 4]), 1, 0)
    assert list_to_array(result) == [1, 2, 3, 4]


def test_insert_at_end():
    result = insert_at_position(build_list([1, 2, 3]), 4, 3)
    assert list_to_array(result) == [1, 2, 3, 4]


def test_insert_empty_list_at_zero():
    result = insert_at_position(None, 5, 0)
    assert list_to_array(result) == [5]


def test_insert_single_node_at_position_1():
    result = insert_at_position(build_list([10]), 20, 1)
    assert list_to_array(result) == [10, 20]


def test_position_beyond_length():
    result = insert_at_position(build_list([1, 2]), 3, 10)
    assert list_to_array(result) == [1, 2]


def test_insert_zero_value():
    result = insert_at_position(build_list([1, 2]), 0, 1)
    assert list_to_array(result) == [1, 0, 2]


if __name__ == "__main__":
    test_insert_at_position_2()
    test_insert_at_head()
    test_insert_at_end()
    test_insert_empty_list_at_zero()
    test_insert_single_node_at_position_1()
    test_position_beyond_length()
    test_insert_zero_value()
    print("All tests passed.")
