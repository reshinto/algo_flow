#include "HappyNumber.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(happyNumber(19) == true);
    assert(happyNumber(1) == true);
    assert(happyNumber(7) == true);
    assert(happyNumber(4) == false);
    assert(happyNumber(2) == false);
    assert(happyNumber(100) == true);
    assert(happyNumber(116) == false);
    assert(happyNumber(89) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
