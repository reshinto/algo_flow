// Longest Palindromic Substring — Expand Around Center approach
// Returns the longest substring of `text` that is a palindrome.
// Time: O(n²), Space: O(1)

fn longest_palindromic_substring(text: &str) -> String {
    let chars: Vec<char> = text.chars().collect();
    if chars.is_empty() { return String::new(); } // @step:initialize

    let mut longest_start = 0usize; // @step:initialize
    let mut longest_length = 1usize; // @step:initialize

    for center_index in 0..chars.len() {
        // @step:expandCenter

        // Odd-length palindromes: single character as center
        let mut odd_radius = 0usize; // @step:expandCenter
        while center_index >= odd_radius + 1
            && center_index + odd_radius + 1 < chars.len()
            && chars[center_index - odd_radius - 1] == chars[center_index + odd_radius + 1]
        {
            // @step:compareChars
            odd_radius += 1; // @step:charsMatch
        }
        let odd_length = 2 * odd_radius + 1; // @step:updateLongest
        if odd_length > longest_length {
            // @step:updateLongest
            longest_start = center_index - odd_radius; // @step:updateLongest
            longest_length = odd_length; // @step:updateLongest
        }

        // Even-length palindromes: gap between centerIndex and centerIndex+1
        if center_index + 1 < chars.len() && chars[center_index] == chars[center_index + 1] {
            // @step:compareChars
            let mut even_radius = 1usize; // @step:charsMatch
            while center_index >= even_radius
                && center_index + even_radius + 1 < chars.len()
                && chars[center_index - even_radius] == chars[center_index + even_radius + 1]
            {
                // @step:compareChars
                even_radius += 1; // @step:charsMatch
            }
            let even_length = 2 * even_radius; // @step:updateLongest
            if even_length > longest_length {
                // @step:updateLongest
                longest_start = center_index - even_radius + 1; // @step:updateLongest
                longest_length = even_length; // @step:updateLongest
            }
        }
    }

    chars[longest_start..longest_start + longest_length].iter().collect() // @step:complete
}
