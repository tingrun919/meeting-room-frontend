import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { ListView, PullToRefresh, Tag } from 'antd-mobile';
import styles from './index.less';

class PullToRefreshComponent extends PureComponent {
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

	handleRoomList = () => {
		this.props.dispatch({
			type: 'roomList/fetchList',
		}).then(() => {
			const { roomData } = this.props
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(roomData),
				refreshing: false,
				isLoading: false,
			});
		})
	}

	componentDidMount() {
		this.handleRoomList()
	}

	onRefresh = () => {
		this.setState({ refreshing: true, isLoading: true });
		this.handleRoomList()
	};

	render() {
		const { roomData } = this.props
		const separator = (sectionID: any, rowID: any) => (
			<div
				key={`${sectionID}-${rowID}`}
				style={{
					backgroundColor: '#F5F5F9',
					height: 8,
				}}
			/>
		);

		let index = roomData.length - 1;
		const row = (rowData: any, sectionID: any, rowID: any) => {
			if (index < 0) {
				index = roomData.length - 1;
			}
			const obj = roomData[index--];
			return (
				<div
					key={rowID}
					style={{
						backgroundColor: 'white',
						padding: '10px',
					}}
				>
					<div style={{ display: 'flex' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<img style={{ height: '63px', width: '63px', marginRight: '15px', }} src={obj.imgPath} alt="" />
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
							<div>
								<span style={{ fontSize: '20px' }}>{obj.name}</span>
							</div>
							<div style={{ marginTop: '3px' }}>
								<span style={{ fontSize: '12px', color: '#999' }}>会议室地点：{obj.alias}</span>
							</div>
							<div style={{ marginTop: '10px' }}>
								{obj.tags.map((item: string, index: number) => <Tag style={{ marginRight: "3px", color: '#108ee9', border: '1px solid #108ee9' }} small={true} key={index}>{item}</Tag>)}
							</div>
						</div>
					</div>
				</div>
			);
		};
		return (
			<ListView
				dataSource={this.state.dataSource}//list-view 实例
				useBodyScroll={this.state.useBodyScroll} //使用html的body作为滚动容器
				renderRow={row} //从数据源中接收数据，返回一个渲染的组件来为这行数据进行渲染
				renderSeparator={separator}
				style={this.state.useBodyScroll ? {} : {
					height: this.state.height,
				}}
				className={styles.renderRow}
				pageSize={5} //每次事件循环（每帧）渲染的行数
				pullToRefresh={ //使用 pullToRefresh，需要和 PullToRefresh 组件一起使用
					<PullToRefresh
						refreshing={this.state.refreshing} //是否显示刷新状态
						onRefresh={this.onRefresh} //刷新的回调，必选
					/>}
			/>
		)
	}
}
export default connect(({ roomList }) => ({
	roomData: roomList.roomList,
}))(PullToRefreshComponent)
