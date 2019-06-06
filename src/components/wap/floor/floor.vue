<template>
	<div class="wapFloor">
		<v-wapTop :topData='topData'></v-wapTop>
		
		<!--楼盘列表-->
		<div class="floorList">
			<ul>
				<li v-for="(item,index) in floorList" :key='item.houseId' @click="goHouse(item.houseId)">
					<img :src="item.coverPic" alt="楼盘"/>
					<div class="name">{{ item.houseName }}</div>
					<div class="address">{{ item.address }}</div>
				</li>
			</ul>
			
			<div class="more" @click="getFloorMore" v-show="showMoreFlag && floorList.length">LOAD MORE</div>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'wapFloor',
  		data(){
  			return{
  				topData:{
  					bgImg:'http://images.wojiali.cn/Fma7qRww1Y73JDl5vrPgBeS47OJo',
					p1:'PROOERTY SELECTION',
					p2:'楼盘选择',
					p3:'我们搜罗城市楼盘典型户型，以全球设计作品，提供全屋房间解决方案'
  				},
  				floorList:[],//楼盘列表
				start:0,
				showMoreFlag:true
  			}
  		},
  		mounted(){
  			//获取楼盘列表
			getFloorList(this);
  		},
  		methods:{
  			//更多楼盘信息
			getFloorMore(){
				//获取楼盘列表
				getFloorList(this);
			},
			//跳转楼盘列表
			goHouse(houseId){
				let code=Base64.encode(houseId);
				this.$router.push({path:'/wap/house/'+code})
			}
  		}
	}
//获取楼盘列表
function getFloorList(obj){
	var data={
		length:8,
		start:obj.start,
		city:obj.$store.state.city
	}
	obj.$ajax(obj.$store.state.localIP+'queryHouseInfo','post',data,function(res){
		console.log(res);
		if(res.houseInfo){
			if(res.houseInfo.length>0){
				obj.floorList=obj.floorList.concat(res.houseInfo||[]);
				obj.start+=(res.houseInfo.length==8 ? 8 : res.houseInfo.length);
				if(obj.start>=res.countNum){
					obj.showMoreFlag=false;
				}
			}else{
				obj.$message('暂无更多楼盘信息！');
			}
		}else{
			obj.$message('暂无更多楼盘信息！');
		}
	})
}
</script>

<style scoped="scoped">
	.floorList{
		width: 100%;
		background:rgba(245,247,248,1);
		padding-bottom: 0.5rem;
	}
	.floorList ul{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0rem 0.4rem;
		box-sizing: border-box;
	}
	.floorList ul li{
		width: 3.2rem;
		height:auto;
		background: #ffffff;
		margin-top: 0.4rem;
		box-shadow:0px 5px 21px 0px rgba(40,52,51,0.27);
		padding: 0.24rem;
		box-sizing: border-box;
	}
	.floorList ul li img{
		display: block;
		width: 100%;
		height: 2.2rem;
	}
	.floorList ul li div{
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 0.1rem;
	}
	.name{
		font-size:0.24rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.address{
		font-size:0.22rem;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(68,68,68,1);
	}
	.more{
		width:2rem;
		height:0.6rem;
		background:rgba(161,171,162,1);
		opacity:0.65;
		border-radius:10px;
		font-size:0.26rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		margin: 0 auto;
		margin-top: 0.5rem;
		text-align: center;
		line-height: 0.6rem;
		cursor: pointer;
	}
</style>