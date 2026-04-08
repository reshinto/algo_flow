// Decode Ways memoization — count decoding possibilities for a digit string top-down

use std::collections::HashMap;

fn decode(digits: &[u8], position: usize, memo: &mut HashMap<usize, i64>) -> i64 {
    if position == 0 {
        return 1; // @step:fill-table
    }
    if let Some(&cached) = memo.get(&position) {
        return cached; // @step:read-cache
    }
    // @step:push-call
    let mut ways: i64 = 0; // @step:compute-cell
    let single_digit = (digits[position - 1] - b'0') as i64; // @step:compute-cell
    if single_digit >= 1 && single_digit <= 9 {
        // @step:compute-cell
        ways += decode(digits, position - 1, memo); // @step:compute-cell
    }
    if position >= 2 {
        let two_digit_value = (digits[position - 2] - b'0') as i64 * 10
            + (digits[position - 1] - b'0') as i64; // @step:compute-cell
        if two_digit_value >= 10 && two_digit_value <= 26 {
            // @step:compute-cell
            ways += decode(digits, position - 2, memo); // @step:compute-cell
        }
    }
    memo.insert(position, ways); // @step:compute-cell
    ways // @step:pop-call
}

fn decode_ways_memoization(digits: &str) -> i64 {
    // @step:initialize
    let digit_count = digits.len(); // @step:initialize
    if digit_count == 0 {
        return 0; // @step:initialize
    }
    let mut memo = HashMap::new();
    decode(digits.as_bytes(), digit_count, &mut memo) // @step:complete
}

fn main() {
    let digits = "226";
    let result = decode_ways_memoization(digits);
    println!("Decode ways for \"{}\": {}", digits, result);
}
