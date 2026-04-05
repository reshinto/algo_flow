# String Compression (Run-Length Encoding) — count consecutive repeated characters.
# Returns the compressed form "a2b1c5a3" only if shorter than the original; otherwise returns the original.
# Time: O(n)  Space: O(n) for the output buffer


def string_compression(text: str) -> str:
    if len(text) == 0:  # @step:initialize
        return text  # @step:initialize

    compressed = ""  # @step:initialize
    char_index = 0  # @step:initialize

    while char_index < len(text):
        current_char = text[char_index]  # @step:read-char
        count = 0  # @step:read-char

        while char_index < len(text) and text[char_index] == current_char:
            count += 1  # @step:count
            char_index += 1  # @step:count

        compressed += current_char  # @step:write-char
        compressed += str(count)  # @step:write-char

    return compressed if len(compressed) < len(text) else text  # @step:complete
