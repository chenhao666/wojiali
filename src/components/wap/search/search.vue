<template>
	<div class="wapSearch">
		<!--楼盘列表-->
		<h3>楼盘</h3>
		<div class="floorList" v-if='floorList.length'>
			<ul>
				<li v-for="(item,index) in floorList" :key='item.houseId' @click="goHouse(item.houseId)">
					<img :src="item.coverPic" alt="楼盘"/>
					<div class="name">{{ item.houseName }}</div>
					<div class="address">{{ item.address }}</div>
				</li>
			</ul>
			
			<div class="more" @click="getFloorMore" v-show="showMoreFlag && floorList.length">LOAD MORE</div>
		</div>
		
		<!--风格列表-->
		<h3>风格</h3>
		<div class="floorList" v-if='styleList.length'>
			<ul>
				<li v-for="(item,index) in styleList" :key='item.uuid' @click="goStyle(item.uuid)">
					<img :src="item.coverPic" alt="风格"/>
					<div class="name">{{ item.stylePaiCode=='unusual' ? '与众不同': item.stylePaiCode=='internetCelebrity' ? '时尚网红' :  item.styleName }} | {{ item.designName }}</div>
					<div class="address">{{ item.details }}</div>
				</li>
			</ul>
			
			<div class="more" @click="getStyleMore" v-show="showStyleMore && styleList.length">LOAD MORE</div>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'wapSearch',
  		data(){
  			return{
  				code:'',//搜索信息
				floorList:[],//楼盘列表
				styleList:[],//风格列表
				start:0,
				showMoreFlag:true,
				styleStart:0,
				showStyleMore:true
  			}
  		},
		mounted(){
			if(this.$route.params.code){
				this.code=Base64.decode(this.$route.params.code);
				//console.log(this.code)
				//获取楼盘列表
				getFloorList(this);
				//获取风格派列表
				getStyleList(this);
			}else{
				window.history.go(-1);
			}
			if(!this.code){
				window.history.go(-1);
			}
		},
		methods:{
			//更多楼盘信息
			getFloorMore(){
				//获取楼盘列表
				getFloorList(this);
			},
			//获取更多风格
			getStyleMore(){
				getStyleList(this);
			},
			//跳转楼盘列表
			goHouse(houseId){
				let code=Base64.encode(houseId);
				this.$router.push({path:'/wap/house/'+code})
			},
			//跳转风格
			goStyle(uuid){
				//console.log(item.uuid);
				let code=Base64.encode(uuid);
				this.$router.push({path:'/wap/stylePai/info/'+code})
			}
		},
	}
//获取楼盘列表
/*function getFloorList(obj){
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
}*/
//获取楼盘列表
function getFloorList(obj){
	var data={
		length:8,
		start:obj.start,
		keyWord:obj.code,
		//city:obj.$store.state.city
	}
	obj.$ajax(obj.$store.state.localIP+'queryHouseInfo','post',data,function(res){
		//console.log(res);
		if(res.houseInfo){
			if(res.houseInfo.length>0){
				obj.floorList=obj.floorList.concat(res.houseInfo||[]);
				obj.start+=(res.houseInfo.length==8 ? 8 : res.houseInfo.length);
				if(obj.start>=res.countNum){
					obj.showMoreFlag=false;
				}
			}else{
				if(obj.start!=0){			
					obj.$message('暂无更多楼盘信息！');
				}
			}
		}else{
			if(obj.start!=0){	
				obj.$message('暂无更多楼盘信息！');
			}
		}
	})
}
//获取风格列表
function getStyleList(obj){
	var data={
		length:8,
		start:obj.styleStart,
		designName:obj.code,
		//city:obj.$store.state.city
	}
	obj.$ajax(obj.$store.state.localIP+'stylePai/listDesignByStylePai','post',data,function(res){
		//console.log(res);
		if(res.data){
			if(res.data.length>0){
				let list=res.data;
				for(let i=0;i<list.length;i++){
					if(list[i].details){
						list[i].details=list[i].details.replace(/[\s\r\n]/g,"");
					}
				}
				obj.styleList=obj.styleList.concat(res.data||[]);
				obj.styleStart+=(res.data.length==8 ? 8 : res.data.length);
				if(obj.styleStart>=res.countNum){
					obj.showStyleMore=false;
				}
			}else{
				if(obj.styleStart!=0){					
					obj.$message('暂无更多风格信息！');
				}
			}
		}else{
			if(obj.styleStart!=0){	
				obj.$message('暂无更多风格信息！');
			}
		}
	})
}
</script>

<style scoped="scoped">
	.wapSearch{
		height: 100%;
		background:rgba(245,247,248,1);
		padding-bottom: 0.5rem;
	}
	h3{
		width: 90%;
		margin-left: 5%;
		font-size:0.26rem;
		height: 0.8rem;
		line-height: 0.8rem;
		border-bottom: 1px solid #D2D2D2;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:#444444;
		margin-top: 0.4rem;
	}
	.floorList{
		width: 100%;
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