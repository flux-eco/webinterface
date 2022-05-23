import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';

const isDev = process.env.NODE_ENV === 'development';

/** loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
}> {
  return {
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    onPageChange: () => {
      //const { location } = history;
      // 如果没有登录，重定向到 login
      /*if (!initialState?.currentUser && location.pathname !== loginPath) {
        // history.push(loginPath);
      }*/
    },
    menuHeaderRender: undefined,
    /*menuDataRender: () => {return [
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            exact: true,
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            exact: true,
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            exact: true,
          },
        ],
      },
      // ....
    ];
    },*/
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    rightRender: () => {return ''}, //reset top right corner
    ...initialState?.settings,
  };
};
