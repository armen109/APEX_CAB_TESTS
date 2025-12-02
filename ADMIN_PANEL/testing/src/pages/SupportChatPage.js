import { BasePage } from '../../src/pages/BasePage';
import { driverListLocators } from '../../src/utils/driver-list-data';
import { supportChatLocators } from '../../src/utils/support-chat-data';

export class SupportChatPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
  }

  async selectChatByName(userName){
    await this.base.typeData(driverListLocators.search_field, userName);
    await this.base.waitingFixedTime(2500); 
    await this.base.clickButtonForced(supportChatLocators.view_chat);
  }

  async selectChatEditByName(userName){
    await this.base.typeData(driverListLocators.search_field, userName);
    await this.base.waitingFixedTime(2500); 
    await this.base.clickButtonForced(supportChatLocators.edit_chat);
  }

  async sendMessage(message){
    await this.base.typeData(supportChatLocators.message_field, message);
    await this.base.clickButton(supportChatLocators.send_button);
    await this.base.containingShouldBeVisible(supportChatLocators.message_text, message);
  }

  async editMessage(oldMessage, newMessage){
    await this.base.clickButton(`button[data-message-body*="${oldMessage}"]`);
    await this.base.clearThenType(supportChatLocators.edit_message_field, newMessage);
    await this.base.clickContainingButtonForced('button', supportChatLocators.save_changes_button);
    await this.base.containingShouldBeVisible(supportChatLocators.message_text, newMessage);
  }

  async deleteMessage(message){
    const dialogPromise = this.page.waitForEvent('dialog', { timeout: 1500 })
      .then(d => d.accept())
      .catch(() => null);

    await this.base.clickButton(`button[data-message-body*="${message}"] + button`);

    const okLabels = ['OK', 'Ok', 'Ok', 'ОК', 'Ок', 'Да', 'Yes', 'Confirm', 'Accept', 'Delete', 'Подтвердить'];
    let clicked = false;

    for (const label of okLabels) {
      try {
        const btn = this.page.getByRole('button', { name: label }).first();
        await btn.waitFor({ state: 'visible', timeout: 500 });
        await btn.click();
        clicked = true;
        break;
      } catch (e) {
      }
    }

    if (!clicked) {
      try {
        const dialog = this.page.locator('[role="dialog"]');
        if ((await dialog.count()) > 0) {
          for (const label of okLabels) {
            try {
              const btn = dialog.locator('button', { hasText: label }).first();
              await btn.waitFor({ state: 'visible', timeout: 400 });
              await btn.click();
              clicked = true;
              break;
            } catch (e) {
            }
          }

          if (!clicked) {
            try {
              const anyBtn = dialog.locator('button:visible').first();
              await anyBtn.waitFor({ state: 'visible', timeout: 400 });
              await anyBtn.click();
              clicked = true;
            } catch (e) {
            }
          }
        }
      } catch (e) {
      }
    }

    await dialogPromise;

    await this.base.containingShouldNotBeVisible(supportChatLocators.message_text, message);
  }

  async changeStatus(status){
    await this.base.clickButton(supportChatLocators.status_field);
    await this.base.clickContainingButtonFirst(supportChatLocators.status_option, status);
    await this.base.clickButton(supportChatLocators.save_button);
  }

  async assertStatus(status){
    await this.base.containingShouldBeVisible(supportChatLocators.status_field, status)
  }


   
}
