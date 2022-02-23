import react, { useState } from 'react';
import { SelectLang } from 'umi';
import Footer from '@/components/Footer';
import LoginFormHook from './components/LoginFormHook';
import ModalFormReset from './components/ModalFormReset';
import styles from './index.less';

const Login: react.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginFormHook setIsModalVisible={setIsModalVisible} />
        <ModalFormReset setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
