import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { ListView, PullToRefresh } from 'antd-mobile';
import styles from './index.less';
import MeetingRoomRow from '../MeetingRoomRow';

@connect(({ roomList, loading }) => ({
	roomData: roomList.roomList,
	loading: loading.models.roomList
}))
export default class MeetingRoomList extends PureComponent {
	constructor(props: any) {
		super(props)
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1: any, row2: any) => row1 !== row2,
		})
		this.state = {
			dataSource,
			refreshing: false,
			height: document.documentElement.clientHeight,
			useBodyScroll: false,
		}
	}

	/**
	 * 数据获取
	 */
	handleRoomList = () => {
		this.props.dispatch({
			type: 'roomList/fetchList',
		}).then(() => {
			const { roomData, loading } = this.props
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(roomData),
				refreshing: false,
				isLoading: loading,
			});
		})
	}

	componentDidMount() {
		this.handleRoomList()
	}

	/**
	 * 下拉刷新
	 */
	onRefresh = () => {
		const { loading } = this.props
		this.setState({ refreshing: true, isLoading: loading });
		this.handleRoomList()
	};

	render() {
		//每个item下方的组件
		const separator = (sectionID: any, rowID: any) => (
			<div
				key={`${sectionID}-${rowID}`}
				style={{
					backgroundColor: '#F5F5F9',
					height: 8,
				}}
			/>
		);
		//item
		const row = (rowData: any, sectionID: any, rowID: any) => {
			return (
				<MeetingRoomRow
					rowData={rowData}
					rowID={rowID}
				/>
			)
		};
		return (
			<ListView
				dataSource={this.state.dataSource}//list-view 实例
				useBodyScroll={this.state.useBodyScroll} //使用html的body作为滚动容器
				renderRow={row} //从数据源中接收数据，返回一个渲染的组件来为这行数据进行渲染
				renderSeparator={separator}
				style={
					this.state.useBodyScroll ? {} : {
						height: this.state.height,
					}}
				className={styles.renderRow}
				pullToRefresh={ //使用 pullToRefresh，需要和 PullToRefresh 组件一起使用
					< PullToRefresh
						refreshing={this.state.refreshing} //是否显示刷新状态
						onRefresh={this.onRefresh} //刷新的回调，必选
					/>}
			/>
		)
	}
}