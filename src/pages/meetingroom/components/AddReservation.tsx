import React, { Ref } from 'react';
import { Button, List, InputItem, DatePicker, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import dayjs from 'dayjs';

import styles from './AddReservation.css';

interface AddReservationState {
  startTime: Date;
  endTime: Date;
}

class AddReservation extends React.Component<any, AddReservationState> {
  creatorInput!: InputItem;
  tokenInput!: InputItem;
  minDate = dayjs('2016-1-1').toDate();

  constructor(props: any, context?: any) {
    super(props, context);

    const startTime = dayjs().startOf('hour').add(1, 'hour');
    const endTime = startTime.add(2, 'hour');

    this.state = {
      startTime: startTime.toDate(),
      endTime: endTime.toDate()
    };
  }

  focusInputItem = (el: InputItem, name?: string) => {
    return () => {
      const { getFieldError } = this.props.form;
      if (name) {
        Toast.info(getFieldError(name).join('.'));
      }
      el.focus();
    };
  }

  onSubmit = () => {
    const { form } = this.props;
    form.validateFields({ force: true }, error => {
      if (error) {
        Toast.fail('你得好好填');
      }
    });
  }

  render() {
    const { minDate } = this;
    const { startTime, endTime } = this.state;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <List>
        <DatePicker
          {...getFieldProps('startTime', {
            initialValue: startTime
          })}
          mode="datetime"
          title="开始时间"
          minDate={minDate}
        >
          <List.Item className={styles['date-picker-line']} arrow="horizontal">开始时间</List.Item>
        </DatePicker>
        <DatePicker
          {...getFieldProps('endTime', {
            initialValue: endTime
          })}
          mode="datetime"
          title="结束时间"
          minDate={minDate}
        >
          <List.Item className={styles['date-picker-line']} arrow="horizontal">结束时间</List.Item>
        </DatePicker>
        <InputItem
          {...getFieldProps('creator', {
            rules: [
              { required: true, message: '必须填写预约人' },
            ]
          })}
          error={!!getFieldError('creator')}
          onErrorClick={this.focusInputItem(this.creatorInput, 'creator')}
          placeholder="会显示在预约列表中"
          ref={(el: InputItem) => this.creatorInput = el}
        >
          预约人
        </InputItem>
        <InputItem
          {...getFieldProps('token', {
            rules: [
              { max: 36, message: '最长接收36位' }
            ]
          })}
          type="password"
          placeholder="选填，取消预约时需要"
          error={!!getFieldError('token')}
          onErrorClick={this.focusInputItem(this.tokenInput, 'token')}
          ref={(el: InputItem) => this.tokenInput = el}
        >
          Token
        </InputItem>
        <InputItem
          {...getFieldProps('description')}
          placeholder="会议描述，展示在预约记录中"
        >
          描述
        </InputItem>
        <List.Item>
          <Button type="primary" onClick={this.onSubmit}>预约</Button>
        </List.Item>
      </List>
    );
  }
}

export default createForm()(AddReservation);
