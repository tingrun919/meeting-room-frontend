import React from 'react';
import { connect } from 'dva';
import { Button, List, InputItem, DatePicker, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import dayjs from 'dayjs';

import styles from './AddReservation.css';
import roomUseRecordService, { InRecordExists } from '@/service/roomUseRecord';
import { GlobalState } from '@/models-helper/models';
import { RoomUseRecord } from '@/apis/RoomUseRecord';

interface AddReservationNeedsProps {
  form?: any;
  roomId: string;
  onAdded?: (record: RoomUseRecord) => void;
}

interface AddReservationState {
  startTime: Date;
  endTime: Date;
}

class AddReservation extends React.Component<AddReservationProps, AddReservationState> {
  creatorInput!: InputItem;
  tokenInput!: InputItem;
  minDate = dayjs('2016-1-1').toDate();

  constructor(props: AddReservationProps, context?: any) {
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

  resetForm = () => {
    const { form } = this.props;
    form.resetFields();
  }

  onSubmit = () => {
    const { form, dispatch, roomId } = this.props;
    form.validateFields({ force: true })
      .then((values: any) => {
        Toast.loading('正在创建预约', 0);
        const record = Object.assign({}, values, {
          meetingRoom: roomId
        });

        dispatch({
          type: 'roomItem/create',
          payload: record
        }).then((record: RoomUseRecord) => {
          Toast.hide();
          this.resetForm();
          if (typeof this.props.onAdded === 'function') {
            this.props.onAdded(record);
          }
        });
      })
      .catch(() => {
        Toast.info('你得好好填');
      });
  }

  startTimeChanged = (rules: unknown, value: string, callback: (error?: Error) => void) => {
    const endTime = this.props.form.getFieldValue('endTime');
    Toast.loading('正在检查时间段是否可用');

    return new Promise((resolve, reject) => {
      if (dayjs(value).isAfter(dayjs(endTime))) {
        return reject('开始时间不能晚于结束时间');
      }
      resolve();
    })
      .then(() =>
        this.checkReservationRange({
          startTime: value,
          endTime: endTime
        }))
      .then(() => {
        Toast.hide();
        callback();
      })
      .catch((msg: string) => {
        Toast.hide();
        Toast.fail(msg);
        callback(new Error(msg));
      });
  };

  endTimeChanged = (rules: unknown, value: string, callback: (error?: Error) => void) => {
    const { form } = this.props;
    form.validateFields(['startTime'], {
      force: true
    });
    callback();
  };

  checkReservationRange: (options: Omit<InRecordExists, 'roomId'>) => Promise<void> =
    (options: Omit<InRecordExists, 'roomId'>) => {
      const params = Object.assign({}, options, {
        roomId: this.props.roomId
      });
      return roomUseRecordService.exists(params)
        .catch(() => {
          Toast.info('检查预约时间段失败，请稍后重试');
          return { exists: true };
        })
        .then(({ exists }) => {
          if (exists) {
            return Promise.reject('预约已存在，请选择其他时间段');
          }
        });
    };

  render() {
    const { minDate } = this;
    const { startTime, endTime } = this.state;
    const { loading } = this.props;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <List>
        <DatePicker
          {...getFieldProps('startTime', {
            initialValue: startTime,
            rules: [{ validator: this.startTimeChanged }]
          })}
          mode="datetime"
          title="开始时间"
          minDate={minDate}
        >
          <List.Item className={styles['date-picker-line']} arrow="horizontal">开始时间</List.Item>
        </DatePicker>
        <DatePicker
          {...getFieldProps('endTime', {
            initialValue: endTime,
            rules: [{ validator: this.endTimeChanged }]
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
          <Button
            type="primary"
            loading={loading}
            onClick={this.onSubmit}
          >
            预约
          </Button>
        </List.Item>
      </List>
    );
  }
}

function mapStateToProps(state: GlobalState, ownProps: AddReservationNeedsProps) {
  return {
    loading: state.loading.effects['roomItem/create']
  };
}

const wrappedComponent = connect(mapStateToProps)(createForm()(AddReservation));

type AddReservationProps = typeof wrappedComponent;

export default wrappedComponent;
