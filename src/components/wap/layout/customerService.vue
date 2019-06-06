<template>
	<div class="customerService">
		<div class="flexMenu">
			<ul>
				<li @click="goDownload">
					<img src="/static/img/right1.png" alt="二维码"/>
				</li>
				<li  @click="goChat">
					<img src="/static/img/right2.png" alt="客服"/>
				</li>
				<li @click="goTop">
					<img src="/static/img/right3.png" alt="返回顶部"/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'customerService',
  		data(){
  			return{
  				friendList:[]
  			}
  		},
  		mounted(){
  			
  		},
  		methods:{
  			//聊天
  			goChat(){
  				let that=this;
  				if(localStorage.getItem('hxu')){
  					that.$com.loginHx(localStorage.getItem('hxu'),localStorage.getItem('hxp'),function(){
  						that.$router.push({path:'/wap/chat'})
  					});
  				}else{
  					//获取环信账号密码
					this.$ajax(this.$store.state.localIP+'registeredHuanXinAccount','get',{},function(res){
						if(res){
							localStorage.setItem('hxu',res.data.hxUserName);
							localStorage.setItem('hxp',res.data.hxPassWord);
							that.$com.loginHx(res.data.hxUserName,res.data.hxPassWord,function(){								
								that.$router.push({path:'/wap/chat'});
							});
						}
					})
  				}
  			},
  			//返回顶部
  			goTop(){
  				$('html,body').animate({scrollTop: 0},1000)
  			},
  			goDownload(){
				this.$com.openAPP();
			}
  		}
	}
</script>

<style scoped="scoped">
	.flexMenu {
		position: fixed;
		top: 40%;
		right: 0;
		z-index: 96;
	}
	.flexMenu ul li{
		width:0.8rem;
		height:0.8rem;
		background:rgba(0,0,0,0.6);
		border:1px solid rgba(255,255,255,1);
		text-align: center;
		position: relative;
		cursor: pointer;
	}
	.flexMenu li img{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 0.36rem;
		height: auto;
		margin: 0 auto;
		display: block;
		
	}
</style>