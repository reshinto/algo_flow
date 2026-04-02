import { getStepIndex, waitForStepChange, waitForStepReset } from "../utils/dom-helpers.mjs";
import { check } from "../utils/logger.mjs";

export async function testPlayback(page, algoName) {
  const stepFwd = page.locator("button[aria-label='Step forward']");
  const stepBwd = page.locator("button[aria-label='Step backward']");
  const reset = page.locator("button[aria-label='Reset']");
  const rerun = page.locator("button[aria-label='Rerun']");
  const play = page.locator("button[aria-label='Play']");
  const pause = page.locator("button[aria-label='Pause']");

  await check(`${algoName}: step forward ×3`, async () => {
    for (let clickIndex = 0; clickIndex < 3; clickIndex++) {
      const before = await getStepIndex(page);
      await stepFwd.click();
      await waitForStepChange(page, before.current);
    }
  });

  await check(`${algoName}: step backward`, async () => {
    const before = await getStepIndex(page);
    await stepBwd.click();
    await waitForStepChange(page, before.current);
  });

  await check(`${algoName}: reset`, async () => {
    await reset.click();
    await waitForStepReset(page);
  });

  await check(`${algoName}: play → pause`, async () => {
    await play.click();
    await pause.waitFor({ timeout: 3000 });
    await pause.click();
    await play.waitFor({ timeout: 3000 });
  });

  await check(`${algoName}: rerun`, async () => {
    await rerun.click();
    await pause.waitFor({ timeout: 3000 });
    await pause.click().catch(() => {});
    await play.waitFor({ timeout: 3000 });
  });
}

export async function testLanguageTabs(page, algoName) {
  for (const lang of ["Python", "Java", "TypeScript"]) {
    await check(`${algoName}: ${lang} tab`, async () => {
      const tab = page.locator(`button:has-text("${lang}")`).first();
      await tab.waitFor({ timeout: 3000 });
      await tab.click();
      await page
        .locator("button[role='tab'][aria-selected='true']")
        .filter({ hasText: lang })
        .waitFor({ timeout: 3000 });
    });
  }
}

export async function testEducationalDrawer(page, algoName) {
  await check(`${algoName}: educational drawer opens (L key)`, async () => {
    await page.locator("body").click({ position: { x: 700, y: 400 } });
    await page.keyboard.press("l");
    const overview = page.locator("text=Overview").first();
    await overview.waitFor({ timeout: 3000 });
  });
  await check(`${algoName}: educational drawer closes (Escape)`, async () => {
    await page.locator("body").click({ position: { x: 700, y: 400 } });
    await page.keyboard.press("Escape");
    const overview = page.locator("text=Overview").first();
    await overview.waitFor({ state: "hidden", timeout: 3000 });
    const visible = await overview.isVisible().catch(() => false);
    if (visible) {
      await page.keyboard.press("Escape");
      await overview.waitFor({ state: "hidden", timeout: 3000 });
    }
  });
}

export async function testKeyboard(page, algoName) {
  await check(`${algoName}: Space play/pause`, async () => {
    await page.keyboard.press("Space");
    await page.locator("button[aria-label='Pause']").waitFor({ timeout: 3000 });
    await page.keyboard.press("Space");
    await page.locator("button[aria-label='Play']").waitFor({ timeout: 3000 });
  });
  await check(`${algoName}: ArrowRight → ArrowLeft`, async () => {
    const before = await getStepIndex(page);
    await page.keyboard.press("ArrowRight");
    await waitForStepChange(page, before.current);
    const after = await getStepIndex(page);
    await page.keyboard.press("ArrowLeft");
    await waitForStepChange(page, after.current);
  });
  await check(`${algoName}: R resets to step 0`, async () => {
    const before = await getStepIndex(page);
    if (before && before.current === 1) {
      await page.keyboard.press("ArrowRight");
      await waitForStepChange(page, before.current);
    }
    await page.keyboard.press("r");
    await waitForStepReset(page);
  });
}
