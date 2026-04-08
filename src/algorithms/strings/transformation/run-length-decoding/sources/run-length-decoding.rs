// Run-Length Decoding — expands a compressed string like "3a2b4c" into "aaabbcccc".
// Parses leading digit sequences as repeat counts, then repeats the following character.
// Time: O(output length)  Space: O(output length)

fn run_length_decoding(text: &str) -> String {
    let mut output: Vec<char> = Vec::new(); // @step:initialize

    let chars: Vec<char> = text.chars().collect();
    let mut read_index = 0usize; // @step:initialize

    while read_index < chars.len() {
        let mut digit_string = String::new(); // @step:read-char

        while read_index < chars.len() && chars[read_index] >= '0' && chars[read_index] <= '9' {
            digit_string.push(chars[read_index]); // @step:read-char
            read_index += 1;
        }

        let repeat_count: usize = digit_string.parse().unwrap_or(0); // @step:visit

        let letter = if read_index < chars.len() { chars[read_index] } else { '\0' }; // @step:read-char

        let repeated: Vec<char> = std::iter::repeat(letter).take(repeat_count).collect(); // @step:write-char

        for ch in repeated {
            output.push(ch); // @step:write-char
        }

        read_index += 1; // @step:visit
    }

    output.iter().collect() // @step:complete
}
