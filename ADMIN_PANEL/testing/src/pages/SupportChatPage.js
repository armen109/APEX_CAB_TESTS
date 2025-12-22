import { BasePage } from '../../src/pages/BasePage';
import { driverListLocators } from '../../src/utils/driver-list-data';
import { BaseComplicatedPage } from './BaseComplicatedPage';
import { supportChatLocators } from '../../src/utils/support-chat-data';
import { generalConstants, generalLocators } from '../utils/general-data';
import { rideRequestsLocators } from '../utils/ride_requests-data';
import { Filtration } from './DashboardPage';

export class SupportChatPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
    this.filtration = new Filtration(page);
    this.complicatedBase =  new BaseComplicatedPage(page);
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

 async doSupportChatFiltration(isRider=true){
    await this.base.shouldBeVisibleFirst('.sorting_disabled');
    if(await this.base.shouldNotBeVisible(generalLocators.empty_data_tables_text)){
        throw new Error('No data in table');
    }else {
        let fields;
        if(isRider){
          fields = ['rider', 'phone number', 'status', 'room reason'];
        }else {
          fields = ['driver', 'phone number', 'status', 'room reason'];
        }
        console.log(fields);
        const data = await this.complicatedBase.getDataFromTable(fields);
        
        console.log('Retrieved data:', data);
        let applied = false;
        
        if (fields.includes('rider') && data.rider) {
            await this.filtration.selectFiltrationBySearching_tb(
                supportChatLocators.rider_filtration,
                'Rider',
                rideRequestsLocators.filter_search,
                data.rider
            );
            applied = true;
        }

                
        if (fields.includes('driver') && data.driver) {
            await this.filtration.selectFiltrationBySearching(
                supportChatLocators.driver_filtration,
                'Driver',
                rideRequestsLocators.filter_search,
                data.driver
            );
            applied = true;
        }

        if (fields.includes('phone number') && data['phone number']) {
            await this.base.typeData(
              supportChatLocators.phone_number_search,
              data['phone number']
            );
            applied = true;
        }

        if (fields.includes('status') && data.status) {
            await this.filtration.selectFiltrationBySearching(
                supportChatLocators.status_filtration,
                rideRequestsLocators.filter_search,
                data.status
            );
            applied = true;
        }

        if(fields.includes('room reason') && data['room reason']) {
            await this.filtration.selectFiltrationBySearching(
                supportChatLocators.room_reason_filtration,
                rideRequestsLocators.filter_search,
                data['room reason']
            );
            applied = true;
        }

        if (applied) {
            await this.base.clickButton(driverListLocators.apply_button);
            const assertionValue = data['phone number'];
            await this.filtration.assertFiltration(assertionValue);
        } else {
            throw new Error(
                'No valid fields found to apply filters in Support Chat section'
            );
        }
    }
}

   
}
