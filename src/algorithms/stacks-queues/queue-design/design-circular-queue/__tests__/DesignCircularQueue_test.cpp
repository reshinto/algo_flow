// g++ -o DesignCircularQueue_test DesignCircularQueue_test.cpp && ./DesignCircularQueue_test
#define TESTING
#include "../sources/DesignCircularQueue.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>

int main() {
    assert((designCircularQueue({"enqueue 1", "enqueue 2", "enqueue 3"}, 3) == std::vector<std::string>{"true", "true", "true"}));
    assert((designCircularQueue({"enqueue 1", "enqueue 2", "enqueue 3", "enqueue 4"}, 3) == std::vector<std::string>{"true", "true", "true", "full"}));
    assert((designCircularQueue({"dequeue"}, 3) == std::vector<std::string>{"empty"}));
    assert((designCircularQueue({"enqueue 1", "enqueue 2", "enqueue 3", "dequeue", "dequeue", "dequeue"}, 3) == std::vector<std::string>{"true", "true", "true", "1", "2", "3"}));
    assert((designCircularQueue({"enqueue 10", "enqueue 20", "front"}, 3) == std::vector<std::string>{"true", "true", "10"}));
    assert((designCircularQueue({"enqueue 10", "enqueue 20", "rear"}, 3) == std::vector<std::string>{"true", "true", "20"}));
    assert((designCircularQueue({"front", "rear"}, 3) == std::vector<std::string>{"empty", "empty"}));
    assert((designCircularQueue({"enqueue 42", "dequeue", "enqueue 99", "dequeue"}, 1) == std::vector<std::string>{"true", "42", "true", "99"}));
    assert((designCircularQueue({"enqueue 1", "dequeue", "dequeue"}, 2) == std::vector<std::string>{"true", "1", "empty"}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
