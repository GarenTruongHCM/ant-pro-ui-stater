import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import type { RunTimeLayoutConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
const loginPath = '/user/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API_USER.CurrentUser | undefined | any;
  loading?: boolean;
}> {
  const token: any = localStorage.getItem('token');
  const localUserData: any = localStorage.getItem('userData');
  const { query } = history.location;
  const { redirect } = query as { redirect: string };
  if (!token) {
    const stringRedirect: string = redirect ? `?redirect=${redirect}` : '';
    history.push(`user/login${stringRedirect}`);
  }
  return {
    currentUser: JSON.parse(localUserData),
    settings: defaultSettings,
    loading: false,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,

    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },

    menuHeaderRender: undefined,
    childrenRender: (children, props) => {
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              hideHintAlert={true}
              hideCopyButton={true}
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
