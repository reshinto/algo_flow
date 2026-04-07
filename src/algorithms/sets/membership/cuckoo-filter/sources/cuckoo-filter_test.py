import importlib

cuckoo_filter_module = importlib.import_module("cuckoo-filter")
cuckoo_filter = cuckoo_filter_module.cuckoo_filter


def test_finds_all_inserted_elements():
    output = cuckoo_filter([3, 7, 11, 15], [3, 7, 11, 15], 32)
    for entry in output["results"]:
        assert entry["found"] is True


def test_returns_result_entry_for_every_query():
    queries = [1, 2, 3, 4, 5]
    output = cuckoo_filter([1, 3], queries, 8)
    assert len(output["results"]) == len(queries)
    for query_idx, query in enumerate(queries):
        assert output["results"][query_idx]["value"] == query


def test_empty_elements_all_queries_not_found():
    output = cuckoo_filter([], [5, 10, 15], 8)
    for entry in output["results"]:
        assert entry["found"] is False


def test_empty_queries_returns_empty_results():
    output = cuckoo_filter([1, 2, 3], [], 8)
    assert output["results"] == []


def test_single_element_and_single_matching_query():
    output = cuckoo_filter([42], [42], 16)
    assert output["results"][0]["found"] is True


def test_correct_structure_shape():
    output = cuckoo_filter([5], [5, 99], 8)
    assert len(output["results"]) == 2
    for entry in output["results"]:
        assert "value" in entry
        assert "found" in entry
        assert isinstance(entry["value"], int)
        assert isinstance(entry["found"], bool)


def test_large_bucket_count():
    elements = [100, 200, 300]
    output = cuckoo_filter(elements, elements, 1024)
    for entry in output["results"]:
        assert entry["found"] is True


if __name__ == "__main__":
    test_finds_all_inserted_elements()
    test_returns_result_entry_for_every_query()
    test_empty_elements_all_queries_not_found()
    test_empty_queries_returns_empty_results()
    test_single_element_and_single_matching_query()
    test_correct_structure_shape()
    test_large_bucket_count()
    print("All tests passed!")
