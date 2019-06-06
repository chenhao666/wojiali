<template>
	<div class="wapHeader">
		<div class="logo">
			<img src="/static/img/wap/logo.png" alt="logo"/>
		</div>
		<div class="menu" @click="flexShow=true">
			<img src="/static/img/wap/menu.png" alt="menu"/>
		</div>
		<div class="search" @click="searchShow=true">
			<img src="/static/img/wap/search.png" alt="search"/>
		</div>
		<div class="clear"></div>
		
		<div class="rightMenu animated slideInRight" v-show="flexShow">
			<div class="menuHeader">
				<img src="/static/img/closeBg.png" alt="关闭" @click="flexShow=false"/>
			</div>
			<ul>
				<router-link to="/wap">
					<li :class="$route.name=='wap'?'active' : ''">首页</li>
				</router-link>
				<router-link to="/wap/stylePai">
					<li :class="$route.name.indexOf('wap/stylePai')>-1?'active' : ''">风格派</li>
				</router-link>
				<router-link to="/wap/floor">
					<li :class="$route.name.indexOf('wap/floor')>-1?'active' : ''">楼盘</li>
				</router-link>
				<router-link to="/wap/goodsThing">
					<li :class="$route.name.indexOf('wap/goodsThing')>-1?'active' : ''">好物</li>
				</router-link>
				<router-link to="/wap/aboutUs">
					<li :class="$route.name.indexOf('wap/aboutUs')>-1?'active' : ''">关于我们</li>
				</router-link>
			</ul>
			<div class="childrenMenu">
				<router-link to="/wap/storeList">
					<div class="item">实体店</div>
				</router-link>
				<router-link to="/wap/case">
					<div class="item">案列</div>
				</router-link>
				<div class="item" @click="changeCityFun"><img src="/static/img/location.png"/>{{ city }}</div>
				<div class="clear"></div>
			</div>
		</div>
		
		<!--搜索弹窗-->
		<div class="searchModel" v-show="searchShow">
			<div class="close">
				<img src="/static/img/closeBg.png" alt="关闭" @click="searchShow=false"/>
			</div>
			<div class="searchGrop">
				<input type="text" v-model="search" value="" placeholder="搜索" autofocus="autofocus"/>
				<div class="searchImg" @click="searchFun">					
					<img src="/static/img/search.png" alt="搜索"/>
				</div>
			</div>
		</div>
		<div class="mask" v-show="flexShow || searchShow" @click="flexShow=false"></div>
		
		<el-dialog
		  title="切换城市"
		  :visible.sync="dialogVisible"
		  style="font-size: 0.16rem;"
		  width='90%'
		  center
		  >
		  	<!--城市列表-->
		  	<ul class="cityList">
		  		<li v-for="(item,index) in cityList" :class="cityIndex==index ? 'active' : ''" :key="index" @click="cityIndex=index">
		  			<img src="/static/img/sjFlag.png" alt="标记" v-show="cityIndex==index"/>
		  			{{ item.cityName }}
		  		</li>
		  		<div class="clear"></div>
		  	</ul>
		  	<span slot="footer" class="dialog-footer">
			    	<el-button class="confirmBtn" @click="changeFun">确 定</el-button>
			  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
  		name: 'wapHeader',
  		data(){
  			return{
  				dialogVisible:false,//弹窗
  				flexShow:false,
  				searchShow:false,
  				search:'',//搜索参数
  				cityList:[],//城市列表
      			cityIndex:0,//当前选中城市
  				city:this.$store.state.city
  			}
  		},
  		created(){
  			getLocation(this);
  		},
  		mounted(){
  			console.log(this.$route.name)
  		},
  		inject:['reload'],
  		methods:{
  			searchFun(){
  				let code=Base64.encode(this.search);
				//console.log(code)
				this.$router.push({path:'/wap/search/'+code});
  			},
  			//更换城市
			changeCityFun(){
				this.dialogVisible=true;
				getLocation(this);
			},
			
			//提交更换城市
		   	changeFun(){
		   		let city=this.cityList[this.cityIndex].cityName;
		   		sessionStorage.setItem('city',city);
				this.$store.commit('changeCity');
		   	}
  		},
  		watch:{
  			//监听city变化
	    	'$store.state.city': function () {
	      		this.city=this.$store.state.city;
	      		this.reload();
	    	}
  		}
	}
	//获取城市列表
	function getLocation(obj){ 
		//获取当前城市列表
		obj.$ajax(obj.$store.state.localIP+'queryCityList','post',{},function(res){
			//console.log(res);
			obj.cityList=res.cityList || [];
			let list=res.cityList || [];
			for(let i=0;i<list.length;i++){
				if(list[i].cityName==obj.city){
					obj.cityIndex=i
					break;
				}
			}
		})
	}
</script>

<style scoped="scoped">
	.wapHeader{
		width: 100%;
		height: 0.9rem;
		line-height: 0.9rem;
	}
	.logo{
		float: left;
		margin-left: 0.4rem;
		width: 1.55rem;
		height: 0.56rem;
		margin-top: 0.17rem;
	}
	.logo img{
		width: 1.55rem;
		height: 0.56rem;
		display: block;
	}
	.search{
		float: right;
		margin-right: 0.3rem;
		margin-top:0.27rem;
		width: 0.36rem;
		height: 0.36rem;
		cursor: pointer;
	}
	.search img{
		display: block;
		width: 100%;
		height: auto;
	}
	.menu{
		float: right;
		margin-right: 0.3rem;
		margin-top: 0.3rem;
		width: 0.34rem;
		height: 0.3rem;
		cursor: pointer;
	}
	.menu img{
		display: block;
		width: 0.34rem;
		height: auto;
	}
	.rightMenu{
		position:fixed;
		top: 0rem;
		right: 0rem;
		width: 3.8rem;
		height: 100%;
		background: #ffffff;
		z-index: 98;
	}
	.mask{
		position: fixed;
		top: 0rem;
		left: 0rem;
		background: rgba(0,0,0,0.8);
		width: 100%;
		height: 100%;
		z-index: 97;
	}
	.menuHeader{
		width: 100%;
		height: 0.9rem;
		background: #000;
	}
	.menuHeader img{
		display: block;
		width: 0.34rem;
		height: auto;
		float: right;
		margin-top: 0.28rem;
		margin-right: 0.28rem;
		cursor: pointer;
	}
	.rightMenu ul{
		width: 100%;
		padding:0rem 0.3rem;
		box-sizing: border-box;
	}
	.rightMenu ul li{
		width: 100%;
		height:1rem;
		line-height:1rem;
		border-bottom: 1px solid #CDD6CD;
		font-size:0.24rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(68,68,68,1);
		cursor: pointer;
	}
	.rightMenu ul li.active{
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(0,0,0,1);
	}
	.childrenMenu{
		width: 100%;
		margin-top: 1rem;
	}
	.childrenMenu .item{
		float: left;
		padding: 0.2rem 0.3rem;
		font-size:0.22rem;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(68,68,68,1);
		position: relative;
		cursor: pointer;
	}
	.childrenMenu .item img{
		position: absolute;
		top:50%;
		transform: translateY(-50%);
		left: 0rem;
		width: 0.18rem;
		height: 0.25rem;
	}
	.searchModel{
		position: fixed;
		top: 0rem;
		left: 0rem;
		width: 100%;
		height: 100%;
		z-index: 99;
	}
	.searchModel .close{
		position: absolute;
		top: 0rem;
		right: 0rem;
		width: 0.8rem;
		height: 0.8rem;
	}
	.searchModel .close img{
		width: 0.34rem;
		height: 0.34rem;
		display: block;
		margin-top: 0.23rem;
		margin-left: 0.23rem;
	}
	.searchGrop{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 90%;
		left: 5%;
		border-bottom:1px solid #D2D2D2;
	}
	.searchGrop input{
		text-align: center;
		font-size:0.3rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:#fff;
		width: 100%;
		height: 0.7rem;
		line-height: 0.7rem;
		background: none;
		outline: none;
		border: none;
		letter-spacing: 3px;
		padding-right: 0.7rem;
		box-sizing: border-box;
	}
	input::-webkit-input-placeholder{
		color: #fff;
		font-size:0.3rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		letter-spacing: 3px;
	}
	.searchImg{
		position: absolute;
		width: 0.7rem;
		height: 0.7rem;
		top: 0rem;
		right: 0rem;
		cursor: pointer;
	}
	.searchImg img{
		display: block;
		width: 0.36rem;
		height: 0.36rem;
		margin: 0.17rem;
	}
	
	.cityList{
		width: 100%;
	}
	.cityList li{
		float: left;
		width:1rem;
		height:0.5rem;
		text-align: center;
		line-height: 0.5rem;
		background:rgba(255,255,255,1);
		border:2px solid rgba(181,181,181,1);
		font-size:0.16rem;
		font-family:MicrosoftYaHei;
		font-weight:bold;
		color:rgba(153,153,153,1);
		margin-left: 0.27rem;
		text-spacing: 3px;
		position: relative;
		cursor: pointer;
		overflow: hidden;
	}
	.cityList li.active{
		background:rgba(255,255,255,1);
		border:2px solid rgba(67,67,67,1);
		font-family:MicrosoftYaHei;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.cityList li img{
		position: absolute;
		top: 0rem;
		left: 0rem;
		width: 0.1rem;
		height: 0.1rem;
	}
	.confirmBtn{
		width:90%;
		height:0.8rem;
		background: none;
		border: none;
		background:rgba(0,0,0,1);
		border-radius:4px;
		text-align: center;
		line-height: 0.8rem;
		font-size:0.20rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		margin: 0rem;
		padding: 0rem;
	}
</style>