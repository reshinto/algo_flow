/** Correctness tests for the reverseWords function. */
#include "sources/ReverseWords.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(reverseWords("the sky is blue") == "blue is sky the");
    assert(reverseWords("  hello world  ") == "world hello");
    assert(reverseWords("a   good   example") == "example good a");
    assert(reverseWords("hello") == "hello");
    assert(reverseWords("   spaces   ") == "spaces");
    assert(reverseWords("foo bar") == "bar foo");
    assert(reverseWords("one two three") == "three two one");
    assert(reverseWords("let us practice") == "practice us let");
    assert(reverseWords("   word") == "word");
    assert(reverseWords("word   ") == "word");
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
