import React from 'react';
import { connect } from 'dva';
import { Popover, Icon, Modal, Toast } from 'antd-mobile';

const Item = Popover.Item;
const prompt = Modal.prompt;
const alert = Modal.alert;

@connect(({ roomItem }) => ({
}))
export default class PopoverComponent extends React.PureComponent {

	constructor(props) {
		super(props)

		this.state = {
			visible: false,
		};
	}


	handleVisibleChange = (visible) => {
		this.setState({
			visible,
		});
	};

	handleDoneReservation = (record, token) => {
		let obj = {
			recordId: record.id,
			token: token,
		}
		this.props.dispatch({
			type: 'roomItem/fetchReservationDone',
			payload: obj
		}).then(res => {
			if (res) {
				Toast.success('完成成功！')
			}
		})
	}


	onSelect = (opt) => {
		this.setState({
			visible: false,
		});
		if (opt.props.value.useToken) {
			prompt('完成会议', '是否确认提前完成会议', [
				{ text: '取消' },
				{ text: '确认', onPress: value => this.handleDoneReservation(opt.props.value, value) },
			], 'default', null, ['请输入Token'])
		} else {
			alert('完成会议', '是否确认提前完成会议', [
				{ text: '取消' },
				{ text: '确认', onPress: value => this.handleDoneReservation(opt.props.value, value) },
			])
		}
	};

	handleOverlay = () => {
		const { overlayData, record } = this.props
		return (
			overlayData.map(i =>
				<Item key="5" value={record} icon={<Icon type={i.icon} size={i.iconSize ? i.iconSize : 'xs'} />}>
					{i.title}
				</Item>
			)
		)
	}

	render() {
		return (
			<Popover
				mask={true}
				visible={this.state.visible}
				overlay={this.handleOverlay()}
				align={{
					offset: [1, -4],
				}}
				onVisibleChange={this.handleVisibleChange}
				onSelect={this.onSelect}
			>
				<div style={{
					float: 'right'
				}}
				>
					<Icon type="ellipsis" />
				</div>
			</Popover >
		)
	}
}
