import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  layout: 'top',
  menuRender: undefined,
  splitMenus: false,
  primaryColor: '#9D5EA1',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  title: 'flux-capacitor',
  pwa: false,
  logo: '/logo.svg',
  iconfontUrl: ''
};

export default Settings;
