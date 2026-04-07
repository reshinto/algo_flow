// Count Bits tabulation — dp[i] = number of 1-bits in binary representation of i

fn count_bits(target_number: usize) -> Vec<usize> {
    // @step:initialize
    let mut dp_table = vec![0usize; target_number + 1]; // @step:initialize,fill-table
    // dp[0] = 0: zero has no set bits
    for bit_index in 1..=target_number {
        // @step:compute-cell
        // Half the number shares all bits except possibly the LSB
        dp_table[bit_index] = dp_table[bit_index >> 1] + (bit_index & 1); // @step:compute-cell,read-cache
    }
    dp_table // @step:complete
}

fn main() {
    let target_number = 5;
    let result = count_bits(target_number);
    println!("Count bits up to {}: {:?}", target_number, result);
}
