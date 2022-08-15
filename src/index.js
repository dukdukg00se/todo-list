import {
  addMenuToggListener,
  addThemeToggListener,
  addPageBtnListeners,
  docListener,
} from './modules/listener-fns';
import {
  contentCntrlr,
  settingsCntrlr,
  manageBtnResponse,
  manageKeyResponse,
} from './modules/display-fns';

// Display page content and set up listeners
contentCntrlr.setMainPanel();
contentCntrlr.setNavPanel();

docListener(manageKeyResponse, 'add', 'keydown');
addMenuToggListener(settingsCntrlr.toggleMenu, 'click');
addThemeToggListener(settingsCntrlr.toggleTheme, 'click');
addPageBtnListeners(manageBtnResponse, 'click');
