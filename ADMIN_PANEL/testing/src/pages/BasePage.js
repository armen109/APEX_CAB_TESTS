import { Page, expect, Locator, Request } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async visitURL(url) {
    await this.page.goto(url);
  }

  async typeData(locator, data) {
    await this.page.locator(locator).fill(data);
  }

  async waitingFixedTime(timeInMs) {
    await this.page.waitForTimeout(timeInMs);
  }


  async realisticTypeData(locator, data) {
    await this.page.locator(locator).type(data, { delay: 50 });
    await this.page.locator(locator).blur();
  }

  async clearThenType(locator, data) {
    await this.page.locator(locator).fill('');
    await this.page.locator(locator).type(data);
  }

  async realisticClearThenType(locator, data) {
    await this.page.locator(locator).fill('');
    await this.page.locator(locator).type(data, { delay: 50 });
    await this.page.locator(locator).blur();
  }

  async clearField(locator) {
    await this.page.locator(locator).fill('');
  }

  async clickButton(locator) {
    await this.page.locator(locator).click();
  }

  async clickFirstButton(locator){
    await this.page.locator(locator).first().click();
  }

  async clickButtonForced(locator) {
    await this.page.locator(locator).click({ force: true });
  }


  async clickContainingButton(locator, text) {
    await this.page.locator(locator).filter({ hasText: text }).click();
  }

  async clickContainingButtonForced(locator, text) {
    await this.page.locator(locator).filter({ hasText: text }).click({ force: true });
  }

  async clickContainingButtonFirst(locator, text){
    await this.page.locator(locator).filter({ hasText: text }).first().click();
  }

  async closestElementClick(parentElement, childElement, text){
      const card = this.page.locator(parentElement).filter({ has: this.page.locator(childElement, { hasText: text }) });
      await card.click();
  }

  async check(locator) {
    await this.page.locator(locator).check();
  }

  async checkForce(locator) {
    await this.page.locator(locator).check({ force: true });
  }

  async shouldInclude(locator, text) {
    await expect(this.page.locator(locator)).toContainText(text);
  }

  async assertURL(text) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  async shouldBeVisible(locator) {
    await expect(this.page.locator(locator)).toBeVisible();
  }

  async containingShouldBeVisible(locator, text) {
    await expect(this.page.locator(locator).filter({ hasText: text })).toBeVisible();
  }

  async shouldNotBeVisible(locator) {
    await expect(this.page.locator(locator)).not.toBeVisible();
  }

  async containingShouldNotBeVisible(locator, text) {
    await expect(this.page.locator(locator).filter({ hasText: text })).not.toBeVisible();
  }

  async selectDropdownMenu(locator, option) {
    await this.page.locator(locator).selectOption(option);
  }

  async uploadFile(filePath){
    await this.page.setInputFiles('input[type="file"]', filePath);
  }

  async selectOptionByText(locator, text) {
    await this.page.selectOption(locator, {
      value: text
    });
  }

  async assertOptionHasSelectedAttribute(selectLocator, expectedValue) {
    const option = this.page.locator(
      `${selectLocator} option[value="${expectedValue}"]`
    );

    const isSelected = await option.getAttribute('selected');
    expect(isSelected).toBe('selected');
  }

  async containsClick(text) {
    await this.page.getByText(text).click();
  }

  async containsInput(text, input) {
    await this.page.getByText(text).click();
    await this.page.keyboard.type(input);
  }

  async assertContaining(text) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async refresh() {
    await this.page.reload();
  }

  async assertValue(locator, text) {
    await expect(this.page.locator(locator)).toHaveValue(text);
  }

  async assertDisabled(locator) {
    await expect(this.page.locator(locator)).toBeDisabled();
  }

  async selectTodaysDate() {
    await this.page.getByText('Сегодня').click()
  }

  async assertTitle(locator, text){
    await expect(this.page.locator(locator)).toHaveAttribute('title', text);
  }
  
}
