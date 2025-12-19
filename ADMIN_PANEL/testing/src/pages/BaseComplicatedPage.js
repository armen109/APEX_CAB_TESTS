import { expect } from '@playwright/test';
import { BasePage } from '../../src/pages/BasePage';
import { dashboardLocators } from '../utils/dashboard-data';

export class BaseComplicatedPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
  }

  async selectFiltration(locator, select_option) {
    await this.base.clickButton(locator);
    await this.base.clickButton(select_option);
  }

  async selectFiltrationLink(locator, select_option) {
    await this.base.clickButton(locator);
    await this.base.clickContainingButtonOnly('li', select_option);
  }

  async selectFiltrationBySearching(
    locator,
    search_locator,
    searched_word,
    select_option = null
  ) {
    if (select_option === null) {
      select_option = searched_word;
    }
    await this.base.clickButton(locator);
    await this.base.typeData(search_locator, searched_word);
    await this.base.clickContainingButtonOnly('li', select_option);
  }

  async assertFiltration(data) {
    await this.base.containgingShouldBeVisibleOnly('td', data);
  }

  async getDataFromTable(fields) {
    const requiredFields = fields.map(f => f.toLowerCase());
  
    const result = await this.page.evaluate(({ requiredFields }) => {
      const table = document.querySelector('table');
      if (!table) throw new Error('Table not found');
  
      const headers = Array.from(
        table.querySelectorAll('thead th')
      ).map(th => th.innerText.trim().toLowerCase());
  
      const columnIndexes = requiredFields.map(field => {
        const index = headers.findIndex(h => h.includes(field));
        if (index === -1) {
          throw new Error(`Column "${field}" not found in table headers`);
        }
        return index;
      });
  
      const rows = Array.from(table.querySelectorAll('tbody tr'));
  
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll('td')).map(td =>
          td.innerText.trim()
        );
  
        const rowData = columnIndexes.map(i => cells[i]);
  
        if (rowData.every(value => value)) {
          return rowData;
        }
      }
  
      throw new Error('No row contains all required fields');
    }, { requiredFields });
  
    return result;
  }
  
}
