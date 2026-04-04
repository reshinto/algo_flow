export function getStepCounter(page) {
  return page
    .locator("span")
    .filter({ hasText: /^\d+ \/ \d+$/ })
    .first();
}

export async function getStepIndex(page) {
  const text = await getStepCounter(page).textContent();
  const match = text.match(/^(\d+) \/ (\d+)$/);
  return match ? { current: Number(match[1]), total: Number(match[2]) } : null;
}

export async function waitForStepChange(page, previousCurrent) {
  await page.waitForFunction(
    (prev) => {
      const spans = [...document.querySelectorAll("span")];
      const counter = spans.find((s) => /^\d+ \/ \d+$/.test(s.textContent ?? ""));
      if (!counter) return false;
      const match = counter.textContent.match(/^(\d+) \/ (\d+)$/);
      return match && Number(match[1]) !== prev;
    },
    previousCurrent,
    { timeout: 3000 },
  );
}

export async function waitForStepReset(page) {
  await page.waitForFunction(
    () => {
      const spans = [...document.querySelectorAll("span")];
      const counter = spans.find((s) => /^\d+ \/ \d+$/.test(s.textContent ?? ""));
      if (!counter) return false;
      const match = counter.textContent.match(/^(\d+) \/ (\d+)$/);
      return match && Number(match[1]) === 1;
    },
    undefined,
    { timeout: 3000 },
  );
}

export async function fillTextInput(page, value) {
  const textInput = page.locator("input[type='text']").first();
  await textInput.waitFor({ state: "visible", timeout: 10000 });
  await textInput.click({ clickCount: 3 });
  await textInput.fill(value);
  await textInput.press("Tab");
}

export async function fillNumberInput(page, value) {
  const numInput = page.locator("input[type='number']").first();
  await numInput.waitFor({ state: "visible", timeout: 10000 });
  await numInput.click({ clickCount: 3 });
  await numInput.fill(String(value));
  await numInput.press("Tab");
}

export async function fillNthTextInput(page, nthIndex, value) {
  const inputs = page.locator("input[type='text']");
  await inputs.nth(nthIndex).waitFor({ state: "visible", timeout: 10000 });
  await inputs.nth(nthIndex).click({ clickCount: 3 });
  await inputs.nth(nthIndex).fill(value);
  await inputs.nth(nthIndex).press("Tab");
}

export async function ensureModalClosed(page) {
  const dialog = page.locator("[role='dialog']");
  const isOpen = await dialog.isVisible().catch(() => false);
  if (isOpen) {
    const closeBtn = page.locator("button[aria-label='Close command palette']");
    await closeBtn.click();
    await page
      .waitForSelector("[role='dialog']", { state: "detached", timeout: 3000 })
      .catch(() => {});
  }
}

export async function selectAlgorithm(page, name) {
  await ensureModalClosed(page);
  const selectorBtn = page.locator("button[aria-label='Search algorithms']");
  await selectorBtn.click();
  await page.waitForSelector("[role='dialog']", { timeout: 3000 });
  const searchInput = page.locator("#algo-search-input");
  await searchInput.fill(name.slice(0, 6));
  const optionBtn = page
    .locator("[role='dialog']")
    .getByRole("button", { name, exact: true })
    .first();
  await optionBtn.waitFor({ timeout: 3000 });
  await optionBtn.click();
  await page.waitForSelector("[role='dialog']", { state: "detached", timeout: 4000 });
  await getStepCounter(page).waitFor({ timeout: 5000 });
}
