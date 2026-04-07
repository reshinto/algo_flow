// g++ -o DesignCircularDeque_test DesignCircularDeque_test.cpp && ./DesignCircularDeque_test
#include "DesignCircularDeque.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>

int main() {
    assert((designCircularDeque({"pushBack 1", "pushBack 2", "pushBack 3"}, 3) == std::vector<std::string>{"true", "true", "true"}));
    assert((designCircularDeque({"pushBack 1", "pushBack 2", "pushBack 3", "pushBack 4"}, 3) == std::vector<std::string>{"true", "true", "true", "full"}));
    assert((designCircularDeque({"popFront"}, 3) == std::vector<std::string>{"empty"}));
    assert((designCircularDeque({"popBack"}, 3) == std::vector<std::string>{"empty"}));
    assert((designCircularDeque({"pushBack 1", "pushBack 2", "pushBack 3", "popFront", "popFront", "popFront"}, 3) == std::vector<std::string>{"true", "true", "true", "1", "2", "3"}));
    assert((designCircularDeque({"pushFront 1", "pushFront 2", "pushFront 3", "popFront", "popFront", "popFront"}, 3) == std::vector<std::string>{"true", "true", "true", "3", "2", "1"}));
    assert((designCircularDeque({"pushBack 10", "pushBack 20", "peekFront"}, 3) == std::vector<std::string>{"true", "true", "10"}));
    assert((designCircularDeque({"pushBack 10", "pushBack 20", "peekRear"}, 3) == std::vector<std::string>{"true", "true", "20"}));
    assert((designCircularDeque({"peekFront", "peekRear"}, 3) == std::vector<std::string>{"empty", "empty"}));
    assert((designCircularDeque({"pushBack 1", "pushFront 2", "peekFront", "peekRear"}, 3) == std::vector<std::string>{"true", "true", "2", "1"}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
