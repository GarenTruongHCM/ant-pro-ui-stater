import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { useModel } from 'umi';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import Avatar from './components/Avatar';

const Profile: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card>
        <ProForm
          name="validate_profile"
          initialValues={initialState?.currentUser}
          onValuesChange={(_, values) => {
            console.log(values);
          }}
          onFinish={async (value) => console.log(value)}
          submitter={{
            searchConfig: {
              submitText: 'Save',
            },

            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
          }}
        >
          <Avatar />
          <ProFormText width="md" name="name" label="name" />
          {/* <ProFormText.Password width="md" name="password" label="Current password" />
          <ProFormText.Password width="md" name="new_password" label="New password" />
          <ProFormRadio.Group
            name="radio"
            label="Gender"
            options={[
              {
                label: 'Female',
                value: 'female',
              },
              {
                label: 'Male',
                value: 'male',
              },
              {
                label: 'Nonbinary',
                value: 'nonbinary',
              },
              {
                label: 'Prefer not to say',
                value: 'prefer',
              },
            ]}
          /> */}
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default Profile;
