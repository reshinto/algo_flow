#include "../sources/UglyNumberIi.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    const std::vector<long long> uglySequence = {1,2,3,4,5,6,8,9,10,12,15,16,18,20,24};

    assert(uglyNumberIi(10) == 12);
    assert(uglyNumberIi(1) == 1);
    assert(uglyNumberIi(2) == 2);
    assert(uglyNumberIi(6) == 6);
    assert(uglyNumberIi(15) == 24);

    for (int position = 1; position <= (int)uglySequence.size(); position++) {
        assert(uglyNumberIi(position) == uglySequence[position - 1]);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
