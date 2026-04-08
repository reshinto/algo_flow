#include "sources/NRepeatedElement.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(nRepeatedElement({1, 2, 3, 3}) == 3);
    assert(nRepeatedElement({2, 1, 2, 5, 3, 2}) == 2);
    assert(nRepeatedElement({5, 1, 5, 2, 5, 3, 5, 4}) == 5);
    assert(nRepeatedElement({1, 1}) == 1);
    assert(nRepeatedElement({9, 9, 1, 2}) == 9);
    assert(nRepeatedElement({1, 2, 3, 4, 5, 3, 3, 3}) == 3);
    assert(nRepeatedElement({7, 7, 7, 7}) == 7);
    assert(nRepeatedElement({-1, -1, 2, 3}) == -1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
