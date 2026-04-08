include!("sources/task-scheduler-heap.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_aaabbb_cooldown2() {
        assert_eq!(task_scheduler_heap(&['A','A','A','B','B','B'], 2), 8);
    }

    #[test]
    fn test_aaabbb_cooldown0() {
        assert_eq!(task_scheduler_heap(&['A','A','A','B','B','B'], 0), 6);
    }

    #[test]
    fn test_aaabbb_cooldown1() {
        assert_eq!(task_scheduler_heap(&['A','A','A','B','B','B'], 1), 6);
    }

    #[test]
    fn test_single_type_with_cooldown() {
        assert_eq!(task_scheduler_heap(&['A','A','A'], 2), 7);
    }

    #[test]
    fn test_single_task() {
        assert_eq!(task_scheduler_heap(&['A'], 0), 1);
    }

    #[test]
    fn test_single_task_large_cooldown() {
        assert_eq!(task_scheduler_heap(&['A'], 10), 1);
    }

    #[test]
    fn test_acab_db_cooldown1() {
        assert_eq!(task_scheduler_heap(&['A','C','A','B','D','B'], 1), 6);
    }

    #[test]
    fn test_many_types_cooldown0() {
        assert_eq!(task_scheduler_heap(&['A','B','C','D','E'], 0), 5);
    }
}
