import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';

const getBase64 = (img: any, callback: (imgUrl: any) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: { type: string; size: number }) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Avatar: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    'https://images.weserv.nl/?url=https%3A%2F%2Fui-avatars.com%2Fapi%2F%3Fname%3DGT%26background%3Dffa5ee%26color%3D000000&w=128&h=128&fit=contain',
  );

  const handleChange = (info: { file: { status: string; originFileObj: string } }) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imgUrl) => {
        setImageUrl(imgUrl);
        setLoading(false);
      });
    }
  };

  return (
    <>
      <img src={imageUrl} alt="avatar" style={{ width: 99 }} />
      <br />
      <Upload
        name="avatar"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>Upload</Button>
      </Upload>
      <br />
      <br />
    </>
  );
};

export default Avatar;
