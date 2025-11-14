import { test, expect } from "@playwright/test";

test.describe("Pagatelia Registration", () => {
  test("Page loads and main elements exist", async ({ page }) => {
    await page.goto("https://development.pagatelia.com/alta/");

    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("img")).toBeVisible(); // placeholder
    await expect(page.getByText("Datos")).toBeVisible(); // temporary selector
  });
});
