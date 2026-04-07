import importlib

module = importlib.import_module("xor-range-query")
xor_range_query = module.xor_range_query


def test_single_query():
    result = xor_range_query([3, 5, 2, 7, 1, 4], [[0, 2]])
    assert result["query_results"][0] == 4  # 3^5^2=4


def test_multiple_queries():
    result = xor_range_query([3, 5, 2, 7, 1, 4], [[0, 2], [1, 4], [2, 5]])
    assert result["query_results"] == [4, 1, 0]


def test_prefix_xor_array():
    result = xor_range_query([3, 5, 2, 7, 1, 4], [[0, 5]])
    assert result["prefix_xor"] == [3, 6, 4, 3, 2, 6]


def test_full_range():
    result = xor_range_query([1, 2, 3, 4], [[0, 3]])
    assert result["query_results"][0] == 4  # 1^2^3^4=4


def test_single_element_query():
    result = xor_range_query([10, 20, 30, 40], [[2, 2]])
    assert result["query_results"][0] == 30


def test_empty_input():
    result = xor_range_query([], [])
    assert result["prefix_xor"] == []
    assert result["query_results"] == []


def test_query_from_index_zero():
    result = xor_range_query([5, 3, 2, 8], [[0, 2]])
    assert result["query_results"][0] == 4  # 5^3^2=4


def test_all_zeros():
    result = xor_range_query([0, 0, 0, 0], [[0, 3]])
    assert result["query_results"][0] == 0
    assert result["prefix_xor"] == [0, 0, 0, 0]


if __name__ == "__main__":
    test_single_query()
    test_multiple_queries()
    test_prefix_xor_array()
    test_full_range()
    test_single_element_query()
    test_empty_input()
    test_query_from_index_zero()
    test_all_zeros()
    print("All tests passed!")
