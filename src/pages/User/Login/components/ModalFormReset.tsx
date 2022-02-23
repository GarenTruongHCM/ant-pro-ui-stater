import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const ModalFormReset: React.FC<{
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
}> = ({ isModalVisible, setIsModalVisible }) => {
  return (
    <Modal
      visible={isModalVisible}
      title="Reset Password Email"
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={() => {}}
        onFinishFailed={() => {}}
      >
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Reset Password
          </Button>
          <Button onClick={() => setIsModalVisible(false)} htmlType="button">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalFormReset;
