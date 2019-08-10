import React from 'react';
import withRouter from 'umi/withRouter';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { WingBlank } from 'antd-mobile';

const BasicLayout: React.FC = props => {
  const { location } = props;
  return (
    <WingBlank size="md">
      <SwitchTransition>
        <CSSTransition
          timeout={270}
          key={location.pathname}
          classNames={{
            enter: 'slideInRight',
            enterActive: 'slideInRight animated',
            enterDone: 'slideInRight animated',
            exit: 'slideOutLeft',
            exitActive: 'slideOutLeft animated',
            exitDone: 'slideOutLeft animated',
          }}
        >
          {props.children}
        </CSSTransition>
      </SwitchTransition>
    </WingBlank>
  );
};

export default withRouter(BasicLayout);
