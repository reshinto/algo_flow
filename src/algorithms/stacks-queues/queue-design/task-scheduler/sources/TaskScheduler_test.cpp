// g++ -o TaskScheduler_test TaskScheduler_test.cpp && ./TaskScheduler_test
#include "TaskScheduler.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>

int main() {
    assert(taskSchedulerQueue({"A", "A", "A", "B", "B", "B"}, 2) == 8);
    assert(taskSchedulerQueue({"A", "A", "B", "B", "C", "C"}, 1) == 6);
    assert(taskSchedulerQueue({"A", "A", "A", "B", "B", "B"}, 0) == 6);
    assert(taskSchedulerQueue({"A", "A", "A"}, 100) == 203);
    assert(taskSchedulerQueue({"A"}, 5) == 1);
    assert(taskSchedulerQueue({"A", "A", "B", "B"}, 2) == 5);
    assert(taskSchedulerQueue({"A", "A", "A", "A"}, 0) == 4);
    assert(taskSchedulerQueue({"A", "B", "C", "D", "E", "F"}, 3) >= 6);

    std::vector<std::string> distinctTasks;
    for (char ch = 'A'; ch <= 'Z'; ch++) {
        distinctTasks.push_back(std::string(1, ch));
    }
    assert(taskSchedulerQueue(distinctTasks, 25) == 26);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
