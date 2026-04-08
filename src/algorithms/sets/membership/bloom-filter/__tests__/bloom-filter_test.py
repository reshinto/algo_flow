import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

bloom_filter_module = importlib.import_module("bloom-filter")
bloom_filter = bloom_filter_module.bloom_filter


def test_returns_results_for_default_input():
    output = bloom_filter([3, 7, 11, 15], [3, 5, 7, 9, 11], 16, 3)
    assert output["results"] is not None
    assert len(output["results"]) == 5


def test_no_false_negatives_for_inserted_elements():
    inserted = [3, 7, 11, 15]
    output = bloom_filter(inserted, inserted, 16, 3)
    for entry in output["results"]:
        assert entry["found"] is True


def test_no_insertions_all_queries_not_found():
    output = bloom_filter([], [1, 2, 3, 4, 5], 16, 3)
    for entry in output["results"]:
        assert entry["found"] is False


def test_inserted_elements_are_found():
    output = bloom_filter([3, 7, 11, 15], [3, 5, 7, 9, 11], 16, 3)
    result_map = {entry["value"]: entry["found"] for entry in output["results"]}
    assert result_map[3] is True
    assert result_map[7] is True
    assert result_map[11] is True


def test_preserves_query_order():
    queries = [3, 5, 7, 9, 11]
    output = bloom_filter([3, 7, 11, 15], queries, 16, 3)
    for query_idx, query in enumerate(queries):
        assert output["results"][query_idx]["value"] == query


def test_single_inserted_element_found():
    output = bloom_filter([42], [42], 16, 3)
    assert output["results"][0]["found"] is True


def test_empty_queries_returns_empty_results():
    output = bloom_filter([3, 7, 11], [], 16, 3)
    assert len(output["results"]) == 0


def test_hash_count_of_1():
    output = bloom_filter([5, 10], [5, 10, 15], 16, 1)
    assert output["results"][0]["found"] is True
    assert output["results"][1]["found"] is True


def test_larger_bit_array_no_false_negatives():
    elements = [100, 200, 300]
    output = bloom_filter(elements, elements, 512, 5)
    for entry in output["results"]:
        assert entry["found"] is True


if __name__ == "__main__":
    test_returns_results_for_default_input()
    test_no_false_negatives_for_inserted_elements()
    test_no_insertions_all_queries_not_found()
    test_inserted_elements_are_found()
    test_preserves_query_order()
    test_single_inserted_element_found()
    test_empty_queries_returns_empty_results()
    test_hash_count_of_1()
    test_larger_bit_array_no_false_negatives()
    print("All tests passed!")
