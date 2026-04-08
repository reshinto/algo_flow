// Decode Ways tabulation — count decoding possibilities for a digit string bottom-up

#include <iostream>
#include <string>
#include <vector>

int decodeWaysTabulation(const std::string& digits) {
    // @step:initialize
    int digitCount = digits.size(); // @step:initialize
    if (digitCount == 0) return 0; // @step:initialize
    std::vector<int> dpTable(digitCount + 1, 0); // @step:initialize
    dpTable[0] = 1; // @step:fill-table
    // A string of one digit can be decoded iff it is not '0'
    dpTable[1] = digits[0] != '0' ? 1 : 0; // @step:fill-table
    for (int position = 2; position <= digitCount; position++) {
        // @step:read-cache
        int singleDigit = digits[position - 1] - '0'; // @step:read-cache
        if (singleDigit >= 1 && singleDigit <= 9) {
            // @step:read-cache
            dpTable[position] += dpTable[position - 1]; // @step:read-cache
        }
        int twoDigitValue = (digits[position - 2] - '0') * 10 + (digits[position - 1] - '0'); // @step:read-cache
        if (twoDigitValue >= 10 && twoDigitValue <= 26) {
            // @step:read-cache
            dpTable[position] += dpTable[position - 2]; // @step:read-cache
        }
        // @step:compute-cell
    }
    return dpTable[digitCount]; // @step:complete
}

#ifndef TESTING
int main() {
    std::string digits = "226";
    int result = decodeWaysTabulation(digits);
    std::cout << "Decode ways for \"" << digits << "\": " << result << std::endl;
    return 0;
}
#endif
