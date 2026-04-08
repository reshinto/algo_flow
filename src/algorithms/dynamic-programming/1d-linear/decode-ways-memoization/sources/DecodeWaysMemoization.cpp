// Decode Ways memoization — count decoding possibilities for a digit string top-down

#include <iostream>
#include <string>
#include <unordered_map>

int decode(const std::string& digits, int position, std::unordered_map<int, int>& memo) {
    if (position == 0) return 1; // @step:fill-table
    auto it = memo.find(position);
    if (it != memo.end()) return it->second; // @step:read-cache
    // @step:push-call
    int ways = 0; // @step:compute-cell
    int singleDigit = digits[position - 1] - '0'; // @step:compute-cell
    if (singleDigit >= 1 && singleDigit <= 9) {
        // @step:compute-cell
        ways += decode(digits, position - 1, memo); // @step:compute-cell
    }
    if (position >= 2) {
        int twoDigitValue = (digits[position - 2] - '0') * 10 + (digits[position - 1] - '0'); // @step:compute-cell
        if (twoDigitValue >= 10 && twoDigitValue <= 26) {
            // @step:compute-cell
            ways += decode(digits, position - 2, memo); // @step:compute-cell
        }
    }
    memo[position] = ways; // @step:compute-cell
    return ways; // @step:pop-call
}

int decodeWaysMemoization(const std::string& digits) {
    // @step:initialize
    int digitCount = digits.size(); // @step:initialize
    if (digitCount == 0) return 0; // @step:initialize
    std::unordered_map<int, int> memo;
    return decode(digits, digitCount, memo); // @step:complete
}

#ifndef TESTING
int main() {
    std::string digits = "226";
    int result = decodeWaysMemoization(digits);
    std::cout << "Decode ways for \"" << digits << "\": " << result << std::endl;
    return 0;
}
#endif
