import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const Admin: React.FC = () => {
  return (
    <PageHeaderWrapper>
      <Card>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <SmileTwoTone /> Developer Demo <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Admin;
