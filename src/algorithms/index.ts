/* Algorithm barrel — auto-discovers and triggers self-registration for all algorithms */
const _registry = import.meta.glob(["./*/*/index.ts", "./*/*/*/index.ts"], { eager: true });
void _registry;
