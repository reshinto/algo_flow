#include "sources/TaskSchedulerHeap.cpp"
#include <cassert>
#include <string>
#include <iostream>

int main() {
    assert(taskSchedulerHeap("AAABBB", 2) == 8);
    assert(taskSchedulerHeap("AAABBB", 0) == 6);
    assert(taskSchedulerHeap("AAABBB", 1) == 6);
    assert(taskSchedulerHeap("AAA", 2) == 7);
    assert(taskSchedulerHeap("A", 0) == 1);
    assert(taskSchedulerHeap("A", 10) == 1);
    assert(taskSchedulerHeap("ACABDB", 1) == 6);
    assert(taskSchedulerHeap("ABCDE", 0) == 5);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
