# Run-Length Decoding — expands a compressed string like "3a2b4c" into "aaabbcccc".
# Parses leading digit sequences as repeat counts, then repeats the following character.
# Time: O(output length)  Space: O(output length)


def run_length_decoding(text: str) -> str:
    output = []  # @step:initialize

    read_index = 0  # @step:initialize

    while read_index < len(text):
        digit_string = ""  # @step:read-char

        while read_index < len(text) and text[read_index].isdigit():
            digit_string += text[read_index]  # @step:read-char
            read_index += 1

        repeat_count = int(digit_string)  # @step:visit

        letter = text[read_index] if read_index < len(text) else ""  # @step:read-char

        repeated = letter * repeat_count  # @step:write-char

        for char in repeated:
            output.append(char)  # @step:write-char

        read_index += 1  # @step:visit

    return "".join(output)  # @step:complete
