import importlib

count_min_sketch_module = importlib.import_module("count-min-sketch")
count_min_sketch = count_min_sketch_module.count_min_sketch


def test_returns_results_for_inserted_elements():
    output = count_min_sketch([3, 3, 7, 7, 7, 11], [3, 7, 11, 5], 8, 3)
    found_values = [entry["value"] for entry in output["results"]]
    assert 3 in found_values
    assert 7 in found_values
    assert 11 in found_values


def test_does_not_return_result_for_non_inserted_element():
    output = count_min_sketch([3, 3, 7, 7, 7, 11], [3, 7, 11, 5], 8, 3)
    found_values = [entry["value"] for entry in output["results"]]
    assert 5 not in found_values


def test_estimated_count_for_element_7_at_least_3():
    output = count_min_sketch([3, 3, 7, 7, 7, 11], [7], 8, 3)
    entry = next(e for e in output["results"] if e["value"] == 7)
    assert entry["estimatedCount"] >= 3


def test_estimated_count_for_element_3_at_least_2():
    output = count_min_sketch([3, 3, 7, 7, 7, 11], [3], 8, 3)
    entry = next(e for e in output["results"] if e["value"] == 3)
    assert entry["estimatedCount"] >= 2


def test_empty_elements_returns_empty_results():
    output = count_min_sketch([], [3, 7], 8, 3)
    assert len(output["results"]) == 0


def test_empty_queries_returns_empty_results():
    output = count_min_sketch([3, 3, 7], [], 8, 3)
    assert len(output["results"]) == 0


def test_depth_of_1():
    output = count_min_sketch([5, 5, 5], [5], 16, 1)
    entry = next(e for e in output["results"] if e["value"] == 5)
    assert entry["estimatedCount"] >= 3


def test_never_undercounts():
    output = count_min_sketch([1, 1, 1, 2, 2, 3], [1, 2, 3], 16, 4)
    result_map = {entry["value"]: entry["estimatedCount"] for entry in output["results"]}
    assert result_map[1] >= 3
    assert result_map[2] >= 2
    assert result_map[3] >= 1


def test_single_element_inserted_once():
    output = count_min_sketch([42], [42], 8, 3)
    assert len(output["results"]) == 1
    assert output["results"][0]["estimatedCount"] >= 1


if __name__ == "__main__":
    test_returns_results_for_inserted_elements()
    test_does_not_return_result_for_non_inserted_element()
    test_estimated_count_for_element_7_at_least_3()
    test_estimated_count_for_element_3_at_least_2()
    test_empty_elements_returns_empty_results()
    test_empty_queries_returns_empty_results()
    test_depth_of_1()
    test_never_undercounts()
    test_single_element_inserted_once()
    print("All tests passed!")
