#define TESTING
#include "../sources/SetEquality.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(setEquality({3, 1, 2}, {2, 3, 1}) == true);
    assert(setEquality({1, 2, 3}, {1, 2, 3}) == true);
    assert(setEquality({1, 2, 3}, {1, 2, 9}) == false);
    assert(setEquality({1, 2, 3, 4}, {1, 2, 3}) == false);
    assert(setEquality({1, 2, 3}, {1, 2, 3, 4}) == false);
    assert(setEquality({}, {}) == true);
    assert(setEquality({}, {1}) == false);
    assert(setEquality({1}, {}) == false);
    assert(setEquality({1, 1, 2, 3}, {1, 2, 2, 3}) == true);
    assert(setEquality({7}, {7}) == true);
    assert(setEquality({7}, {8}) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
