import {
  toggleMenu,
  toggleTheme,
  manageBtnResponse,
  manageKeyResponse
} from './modules/event-fns';
import { 
  addMenuToggListener,
  addThemeToggListener,
  addPageBtnListeners,
  docListener
} from './modules/listener-fns';
import * as displayFns from './modules/display-fns';


(() => {
  displayFns.contentCntrlr.setMainPanel();
  displayFns.contentCntrlr.setNavPanel();

  docListener(manageKeyResponse, 'add', 'keydown');
  addMenuToggListener(toggleMenu, 'click');
  addThemeToggListener(toggleTheme, 'click');
  addPageBtnListeners(manageBtnResponse, 'click');
})();

