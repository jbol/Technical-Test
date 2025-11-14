import { test, expect } from "@playwright/test";

test.describe("Pagatelia Registration", () => {
  test("Page loads", async ({ page }) => {
    await page.goto("https://development.pagatelia.com/alta/");
  });
});
