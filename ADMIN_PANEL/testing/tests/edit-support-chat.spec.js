import { test} from '@playwright/test';
import { BasePage } from '../src/pages/BasePage';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { loginConstants } from '../src/utils/login-data';
import { generalConstants } from '../src/utils/general-data';
import { dashboardConstants, dashboardLocators } from '../src/utils/dashboard-data';
import { SupportChatPage } from '../src/pages/SupportChatPage';
import { supportChatConstants } from '../src/utils/support-chat-data';

test('testing support chat', async ({ page }) => {
     const basePage = new BasePage(page);
     const loginPage = new LoginPage(page);
     const dashboardPage = new DashboardPage(page);
     const supportChatPage = new SupportChatPage(page);

     await basePage.visitURL(generalConstants.admin_panel_url)
     await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
     await basePage.assertURL(dashboardConstants.dashboard_url);
     await basePage.shouldBeVisible(dashboardLocators.dashboard_title); 
     await dashboardPage.goToSupportChatSection(dashboardLocators.room_list_page);
     await supportChatPage.selectChatByName(supportChatConstants.complaining_user);
     await supportChatPage.sendMessage(supportChatConstants.message);
     await supportChatPage.editMessage(supportChatConstants.message, supportChatConstants.new_message);
     await supportChatPage.deleteMessage(supportChatConstants.new_message);
});

test('change support chat status', async ({ page }) => {
     const basePage = new BasePage(page);
     const loginPage = new LoginPage(page);
     const dashboardPage = new DashboardPage(page);
     const supportChatPage = new SupportChatPage(page);

     await basePage.visitURL(generalConstants.admin_panel_url)
     await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
     await basePage.assertURL(dashboardConstants.dashboard_url);
     await basePage.shouldBeVisible(dashboardLocators.dashboard_title); 
     await dashboardPage.goToSupportChatSection(dashboardLocators.room_list_page);
     await supportChatPage.selectChatEditByName(supportChatConstants.complaining_user);
     await supportChatPage.changeStatus(supportChatConstants.resolved_status);
     await supportChatPage.assertStatus(supportChatConstants.resolved_status);
     await supportChatPage.changeStatus(supportChatConstants.pending_status);

});