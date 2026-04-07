// Decode Ways tabulation — count decoding possibilities for a digit string bottom-up

fn decode_ways_tabulation(digits: &str) -> i64 {
    // @step:initialize
    let digit_count = digits.len(); // @step:initialize
    if digit_count == 0 {
        return 0; // @step:initialize
    }
    let bytes = digits.as_bytes();
    let mut dp_table = vec![0i64; digit_count + 1]; // @step:initialize
    dp_table[0] = 1; // @step:fill-table
    // A string of one digit can be decoded iff it is not '0'
    dp_table[1] = if bytes[0] != b'0' { 1 } else { 0 }; // @step:fill-table
    for position in 2..=digit_count {
        // @step:read-cache
        let single_digit = (bytes[position - 1] - b'0') as i64; // @step:read-cache
        if single_digit >= 1 && single_digit <= 9 {
            // @step:read-cache
            dp_table[position] += dp_table[position - 1]; // @step:read-cache
        }
        let two_digit_value =
            (bytes[position - 2] - b'0') as i64 * 10 + (bytes[position - 1] - b'0') as i64; // @step:read-cache
        if two_digit_value >= 10 && two_digit_value <= 26 {
            // @step:read-cache
            dp_table[position] += dp_table[position - 2]; // @step:read-cache
        }
        // @step:compute-cell
    }
    dp_table[digit_count] // @step:complete
}

fn main() {
    let digits = "226";
    let result = decode_ways_tabulation(digits);
    println!("Decode ways for \"{}\": {}", digits, result);
}
