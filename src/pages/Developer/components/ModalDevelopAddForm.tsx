import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useModel } from 'umi';
import { ProFormSelect } from '@ant-design/pro-form';
import { addListApiKey } from '../api';

const ModalApiKeyAddForm: React.FC<{
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  fnLoadListApiKey: () => void;
}> = ({ isModalVisible, setIsModalVisible, fnLoadListApiKey }) => {
  const { initialState } = useModel('@@initialState');

  const onClickSaveApiKey = async (values: any) => {
    const userId = initialState?.currentUser?.id;
    const body = {
      name: values.name,
    };
    await addListApiKey(userId, body);
    fnLoadListApiKey();
    setIsModalVisible(false);
  };

  return (
    <Modal
      visible={isModalVisible}
      title="Add Develop"
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onClickSaveApiKey}
        onFinishFailed={() => {}}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter your name" />
        </Form.Item>
        <ProFormSelect
          name="skill"
          label="Skill"
          valueEnum={{
            java: 'java',
            rust: 'rust',
            dotnet: 'dotnet',
            ruby: 'ruby',
          }}
          fieldProps={{
            mode: 'multiple',
          }}
          placeholder="Please select  your skill !'"
          rules={[{ required: true, message: 'Please select your skill !', type: 'array' }]}
        />
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button onClick={() => setIsModalVisible(false)} htmlType="button">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalApiKeyAddForm;
