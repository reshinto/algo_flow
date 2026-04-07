/** Correctness tests for the runLengthDecoding function. */
#include "RunLengthDecoding.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(runLengthDecoding("3a2b4c") == "aaabbcccc");
    assert(runLengthDecoding("1a1b1c") == "abc");
    assert(runLengthDecoding("") == "");
    assert(runLengthDecoding("1z") == "z");
    assert(runLengthDecoding("5x") == "xxxxx");
    assert(runLengthDecoding("2a3b1c") == "aabbbc");
    assert(runLengthDecoding("10a") == "aaaaaaaaaa");
    assert(runLengthDecoding("2a2a") == "aaaa");
    assert(runLengthDecoding("3A2B") == "AAABB");
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
