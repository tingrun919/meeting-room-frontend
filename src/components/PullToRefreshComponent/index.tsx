import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { ListView, PullToRefresh } from 'antd-mobile';
const data = [
	{
		img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
		title: 'Meet hotel',
		des: '不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒',
	},
	{
		img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
		title: 'McDonald\'s invites you',
		des: '不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒',
	},
	{
		img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
		title: 'Eat the week',
		des: '不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒',
	},
];

const NUM_ROWS = 20;

function genData(pIndex = 0) {
	const dataArr = [];
	for (let i = 0; i < NUM_ROWS; i++) {
		dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
	}
	return dataArr;
}

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
		})
	}

	componentDidMount() {
		this.handleRoomList()
		// const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

		this.setState({
			// height: hei,
		})
		setTimeout(() => {
			this.rData = genData();
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(genData()),
				// height: hei,
				refreshing: false,
				isLoading: false,
			});
		}, 1500);
	}

	onRefresh = () => {
		this.setState({ refreshing: true, isLoading: true });
		// simulate initial Ajax
		setTimeout(() => {
			this.rData = genData();
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.rData),
				refreshing: false,
				isLoading: false,
			});
		}, 600);
	};

	render() {
		const separator = (sectionID, rowID) => (
			<div
				key={`${sectionID}-${rowID}`}
				style={{
					backgroundColor: '#F5F5F9',
					height: 8,
					borderTop: '1px solid #ECECED',
					borderBottom: '1px solid #ECECED',
				}}
			/>
		);

		let index = data.length - 1;
		const row = (rowData, sectionID, rowID) => {
			if (index < 0) {
				index = data.length - 1;
			}
			const obj = data[index--];
			return (
				<div
					key={rowID}
					style={{
						backgroundColor: 'white',
					}}
				>
					<div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
						{obj.title}
					</div>
					<div style={{ display: '-webkit-box', display: 'flex', borderColor: 'red' }}>
						<img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" />
						<div style={{ display: 'inline-block' }}>
							<div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>{obj.des}</div>
							<div style={{ fontSize: '16px' }}><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
						</div>
					</div>
				</div>
			);
		};
		return (
			<ListView
				dataSource={this.state.dataSource}//list-view 实例
				ref={el => this.lv = el}
				useBodyScroll={this.state.useBodyScroll} //使用html的body作为滚动容器
				renderRow={row} //从数据源中接收数据，返回一个渲染的组件来为这行数据进行渲染
				renderSeparator={separator}
				style={this.state.useBodyScroll ? {} : {
					height: this.state.height,
					// border: '1px solid #ddd',
					margin: '5px 0',
				}}
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
