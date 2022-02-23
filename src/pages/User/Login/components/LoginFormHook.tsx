import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, useModel } from 'umi';

import { login } from '../api';
import { userProfile } from '../../Profile/api';

import styles from '../index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const LoginFormHook: React.FC<{
  setIsModalVisible: (value: boolean) => void;
}> = ({ setIsModalVisible }) => {
  const [userLoginState, setUserLoginState] = useState<API_USER.LoginResult>();

  const { setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const handleSubmit = async (values: API_USER.LoginParams) => {
    try {
      const res = await login({ ...values });

      if (!res?.errorCode && res) {
        localStorage.setItem('token', res?.accessToken);
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Login successful!',
        });
        message.success(defaultLoginSuccessMessage);
        const dataUserProfile = await userProfile();
        await setInitialState((s) => ({
          ...s,
          currentUser: dataUserProfile,
        }));
        localStorage.setItem('userData', JSON.stringify(dataUserProfile));
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      setUserLoginState(res);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Login failed, please try again!',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <LoginForm
      logo={<img alt="logo" src="/logo.svg" />}
      title="Developer Demo"
      subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
      initialValues={{
        autoLogin: true,
      }}
      onFinish={async (values) => {
        const { password, email } = values as { password: string; email: string };
        await handleSubmit({ password, email } as API_USER.LoginParams);
      }}
    >
      {userLoginState?.errorCode ||
        (!userLoginState && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: 'Wrong account or password',
            })}
          />
        ))}
      <>
        <ProFormText
          name="email"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'Email',
            defaultMessage: 'Email',
          })}
          rules={[
            {
              required: true,
              type: 'email',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: '123',
            defaultMessage: 'Password',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.login.password.required"
                  defaultMessage="Please enter your password!"
                />
              ),
            },
          ]}
        />
      </>

      <div
        style={{
          marginBottom: 24,
        }}
      >
        <ProFormCheckbox noStyle name="autoLogin">
          <FormattedMessage id="pages.login.rememberMe" defaultMessage="Auto login" />
        </ProFormCheckbox>
        <a
          style={{
            float: 'right',
          }}
          onClick={() => setIsModalVisible(true)}
        >
          <FormattedMessage id="Reset your password!" defaultMessage="Reset your password!" />
        </a>
      </div>
    </LoginForm>
  );
};

export default LoginFormHook;
