export const PASS = "✅";
export const FAIL = "❌";
export const results = [];

export function log(icon, msg) {
  const line = `${icon} ${msg}`;
  console.log(line);
  results.push({ pass: icon === PASS, text: line });
}

export async function check(label, fn) {
  try {
    await fn();
    log(PASS, label);
    return true;
  } catch (err) {
    log(FAIL, `${label} — ${err.message.split("\n")[0].slice(0, 100)}`);
    return false;
  }
}
