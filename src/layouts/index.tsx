import React from 'react';
import { WingBlank } from 'antd-mobile';

const BasicLayout: React.FC = props => {
  return (
    <WingBlank size="md">
      {props.children}
    </WingBlank>
  );
};

export default BasicLayout;
