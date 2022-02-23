import React, { useEffect, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Card } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { loadListApiKey, deleteListApiKey } from './api';
import ModalApiKeyAddForm from './components/ModalDevelopAddForm';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const Group: React.FC = () => {
  const [dataSourceApi, setDataSourceApi] = useState<API_KEY.ResultAPI[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { initialState } = useModel('@@initialState');

  const fnLoadListApiKey = () => {
    loadListApiKey(initialState?.currentUser?.id).then((res: any) => {
      const result: API_KEY.ResultAPI[] = res;
      setDataSourceApi(result);
    });
  };
  const fnDeleteListApiKey = async (id: number) => {
    const userId = initialState?.currentUser?.id;
    await deleteListApiKey<API_KEY.ResultDeleteAPI>(userId, id);
    fnLoadListApiKey();
  };
  useEffect(() => {
    if (initialState?.currentUser?.id) {
      fnLoadListApiKey();
    }
  }, [initialState?.currentUser?.id]);

  const showDeleteConfirm = (callback: any) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        callback();
      },
    });
  };

  const columns: ProColumns<API_KEY.ResultAPI>[] = [
    {
      title: 'No.',
      dataIndex: 'id',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      render: (text, record) => {
        return [<span key="name">{`Name ${record.id}`}</span>];
      },
    },
    {
      title: 'Skill',
      dataIndex: 'apiKey',
      render: (text, record) => {
        return [<span key="skill">{`Skill ${record.id}`}</span>];
      },
      sorter: true,
    },

    {
      title: 'created at',
      dataIndex: 'createdAt',
      sorter: true,
    },
    {
      title: 'update at',
      dataIndex: 'updatedAt',
      sorter: true,
    },
    {
      title: 'Action',
      valueType: 'option',
      render: (text, record) => {
        return [
          <a
            key="deleteApi"
            onClick={() => {
              showDeleteConfirm(() => fnDeleteListApiKey(record.id));
            }}
          >
            Delete
          </a>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <Card>
        <ProTable<API_KEY.ResultAPI>
          dataSource={dataSourceApi}
          columns={columns}
          editable={{
            type: 'multiple',
          }}
          columnsState={{
            persistenceKey: 'table-api-key',
            persistenceType: 'localStorage',
          }}
          search={{
            labelWidth: 'auto',
          }}
          form={{
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          pagination={{
            pageSize: 10,
          }}
          dateFormatter="string"
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                setIsModalVisible(true);
              }}
              type="primary"
            >
              Add API
            </Button>,
          ]}
        />
        <ModalApiKeyAddForm
          isModalVisible={isModalVisible}
          fnLoadListApiKey={fnLoadListApiKey}
          setIsModalVisible={setIsModalVisible}
        />
      </Card>
    </PageContainer>
  );
};
export default Group;
