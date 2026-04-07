import importlib

task_scheduler_heap = importlib.import_module("task-scheduler-heap").task_scheduler_heap


def test_aaabbb_cooldown2():
    assert task_scheduler_heap(["A", "A", "A", "B", "B", "B"], 2) == 8


def test_aaabbb_cooldown0():
    assert task_scheduler_heap(["A", "A", "A", "B", "B", "B"], 0) == 6


def test_aaabbb_cooldown1():
    assert task_scheduler_heap(["A", "A", "A", "B", "B", "B"], 1) == 6


def test_single_type_with_cooldown():
    assert task_scheduler_heap(["A", "A", "A"], 2) == 7


def test_single_task():
    assert task_scheduler_heap(["A"], 0) == 1


def test_single_task_large_cooldown():
    assert task_scheduler_heap(["A"], 10) == 1


def test_acab_db_cooldown1():
    assert task_scheduler_heap(["A", "C", "A", "B", "D", "B"], 1) == 6


def test_result_at_least_task_count():
    tasks = ["A", "A", "A", "B", "B", "B"]
    result = task_scheduler_heap(tasks, 2)
    assert result >= len(tasks)


def test_many_types_cooldown0():
    tasks = ["A", "B", "C", "D", "E"]
    assert task_scheduler_heap(tasks, 0) == len(tasks)


if __name__ == "__main__":
    test_aaabbb_cooldown2()
    test_aaabbb_cooldown0()
    test_aaabbb_cooldown1()
    test_single_type_with_cooldown()
    test_single_task()
    test_single_task_large_cooldown()
    test_acab_db_cooldown1()
    test_result_at_least_task_count()
    test_many_types_cooldown0()
    print("All tests passed!")
