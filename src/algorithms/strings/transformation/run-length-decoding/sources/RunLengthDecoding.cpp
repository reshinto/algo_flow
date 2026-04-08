// Run-Length Decoding — expands a compressed string like "3a2b4c" into "aaabbcccc".
// Parses leading digit sequences as repeat counts, then repeats the following character.
// Time: O(output length)  Space: O(output length)

#include <string>

std::string runLengthDecoding(const std::string& text) {
    std::string output; // @step:initialize

    int readIndex = 0; // @step:initialize

    while (readIndex < static_cast<int>(text.length())) {
        std::string digitString; // @step:read-char

        while (readIndex < static_cast<int>(text.length())
            && text[readIndex] >= '0' && text[readIndex] <= '9') {
            digitString += text[readIndex]; // @step:read-char
            readIndex++;
        }

        int repeatCount = std::stoi(digitString); // @step:visit

        char letter = (readIndex < static_cast<int>(text.length())) ? text[readIndex] : '\0'; // @step:read-char

        std::string repeated(repeatCount, letter); // @step:write-char

        for (char ch : repeated) {
            output += ch; // @step:write-char
        }

        readIndex++; // @step:visit
    }

    return output; // @step:complete
}
