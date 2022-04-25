import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pages from './en-US/pages';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';

export default {
  'navBar.lang': 'Sprachen',
  'layout.user.link.help': 'Hilfe',
  'layout.user.link.privacy': 'Privatsphäre',
  'layout.user.link.terms': 'Terms',
  'app.copyright.produced': 'Entwickelt von fluxlabs ag',
  'app.preview.down.block': 'Download',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
