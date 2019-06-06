<template>
	<div class="chat">
		<div class="header">
			<img src="/static/img/wap/back.png" alt="返回" class="back" @click="goBack"/>
			<div class="title">
				<img src="/static/img/wap/service.png" alt="头像"/>
				客服
			</div>
		</div>
		<div class="content" id="chatContainer">
			<!--<div class="loadingHistory" v-show="loadingFlag"><i class="el-icon-loading"></i>&nbsp;&nbsp;<span>加载中...</span></div>
			<div class="more" v-show='!loadingFlag' @click="lookHistory"><span class="iconfont icon-lishijilu"></span>查看更多消息</div>-->
			<ul>
				<div class="list_chat" v-for="(value,key) in nowChat" :key="key">
					<div class="chatTime"><span>{{ formatDate(key) }}</span></div>
					<li v-for="(item,index) in value" :key="index" :class="item.name!=chatTitle?'customer_chat':'server_chat'">
						<div class="out_box">
							<!--<img src="../../../assets/defaultPhoto.png" alt="" v-if="item.name==chatTitle"/>-->
							<!--<img src="../../../assets/server.jpg" alt="" v-if="item.name!=chatTitle"/>-->
							<div class="serverNmae" v-if="item.name!=chatTitle">客服</div>
							<div class="chat_border" v-html='item.info'>
								
							</div>
							<div class="clear"></div>
						</div>
					</li>
				</div>
			</ul>
		</div>
		<div class="chatInput">
			<textarea name="" rows="" cols="" v-model="desc" autofocus="autofocus"></textarea>
			<button class="submit" @click="sendMessage">发送</button>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'chat',
  		data(){
  			return{
  				friendList:[],
  				chatTitle:localStorage.getItem('hxu'),//聊天标题
  				nowChat:[],//当前聊天内容
  				desc:''
  			}
  		},
  		mounted(){
  			if(sessionStorage.getItem('chat')){
  				this.friendList=JSON.parse(sessionStorage.getItem('chat'))
  			}
  			if(this.friendList.length>0){  				
  				this.nowChat=this.friendList[0].msg || [];
  			}
  		},
  		computed: { 
            listenFriend() {  
                return this.$store.state.friendList;  
            }
        }, 
  		methods:{
  			//返回
  			goBack(){
  				window.history.go(-1)	
  			},
  			//返回顶部
  			goTop(){
  				$('html,body').animate({scrollTop: 0},1000)
  			},
  			//发送消息
  			sendMessage(){
  				var that=this;
				// 单聊发送文本消息
				if(this.desc==""){
					that.$message.error('发送内容不能为空！');
				}else{					
					sendPrivateText(this);
				}
	  		},
	  		paperScroll(){
				var scroll=$("#chatContainer").scrollTop();
				if(scroll==0){
					this.lookHistory();
				}
			},
			//时间戳转换
			formatDate(timeStamp){
		   		var date = new Date();  
			    date.setTime(timeStamp);  
			    var y = date.getFullYear();      
			    var m = date.getMonth() + 1;      
			    m = m < 10 ? ('0' + m) : m;      
			    var d = date.getDate();      
			    d = d < 10 ? ('0' + d) : d;      
			    var h = date.getHours();    
			    h = h < 10 ? ('0' + h) : h;    
			    var minute = date.getMinutes();    
			    var second = date.getSeconds();    
			    minute = minute < 10 ? ('0' + minute) : minute;      
			    second = second < 10 ? ('0' + second) : second;     
			    return y + '-' + m + '-' + d+' '+h+':'+minute;      	
		   	}
  		},
  		//监听消息
		watch: {  
            listenFriend:{
			    handler(newName, oldName){
			    	if(newName){
			    		if(newName.length>1){			     		
				     		this.friendList=JSON.parse(newName);
				     		var index=0;
				     		var list=this.friendList;
				     		if(list.length>0){			     			
				     			this.nowChat=list[index].msg;
				     		}
				     	}
			    	}
			    },
			    immediate:true,
			    deep: true
			},
			nowChat() {
			    this.$nextTick(() => {
			       	var container = this.$el.querySelector("#chatContainer");
			       	//console.log(container.scrollTop)
			       	//console.log(this.scrollTop)
			       	//console.log(container.scrollHeight)
			       	//console.log(container.clientHeight)
			       	//console.log(Math.abs(container.scrollHeight-container.scrollTop-container.clientHeight))
			       	//判断滚动条距离底部的距离
			       	if(Math.abs(this.scrollTop-container.scrollTop-container.clientHeight)<20){
				       	container.scrollTop = container.scrollHeight;
			       	}else{
			       		if(this.scrollTop==0 && container.scrollTop==0){
				       		container.scrollTop=0;
				       	}else{
				       		if(container.scrollTop<20){
			       				container.scrollTop=container.scrollHeight-this.scrollTop;
			       			}	
				       	} 		
			       	}
			       	this.scrollTop=container.scrollHeight;
			    })
			}
        }
	}
	//发送消息
	function sendPrivateText(that) {
	    var id = that.$com.conn.getUniqueId();                 // 生成本地消息id
	    var msg = new WebIM.message('txt', id);      // 创建文本消息
	    var dataMsg=that.desc;
	    dataMsg = dataMsg.replace(/\r\n/g, '<br/>'); //IE9、FF、chrome  
        dataMsg = dataMsg.replace(/\n/g, '<br/>'); //IE7-8  
        dataMsg = dataMsg.replace(/\s/g, ' '); //空格处理
        that.$ajax(that.$store.state.localIP+'sendMessage','post', {
			"from":localStorage.getItem('hxu'),
			"target": ['customerservice'],
			"msg":that.desc,
			"userType":2,
			"type":1//文本1 图片2
		},function(response){
			//console.log(response)
			if(response.retCode==0){
				//console.log(1)
				var date = new Date(response.createTime);
    			var time = date.getTime();
    			var timeTarget=parseInt(time/60000);//时间标记
				var list=that.friendList;
		        var num=0;
		        if(list.length==0){
		        	list.push({'msg':{}})
		        }
		        //替换表情文件
		        var  expressionList=that.expressionList;
		        for(var i in expressionList){
		        	//使用正则替换原有表情符号
		        	dataMsg=dataMsg.replace(i,"<img src='"+that.expressionPath+expressionList[i]+"' style='vertical-align:middle;'>");
		        }
		        dataMsg=dataMsg.replace(/((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/,"<a target='_black' href='$&'>$&</a>");
		        //console.log(dataMsg)
		        var info={
		        	name:localStorage.getItem('hxu'),
		        	//time:time,
		        	info:dataMsg
		        }
		        
		        var msgArr=list[num].msg;
		        var timeFlag=0;//时间标记
		        for(var i in msgArr){
		        	if(Math.abs(parseInt(i/60000)-timeTarget)<4){
		        		msgArr[i].push(info);
		        		timeFlag=1;
		        	}
		        }
		        if(!timeFlag){
		        	msgArr[time]=[info];
		        }
		        list[num].msg=msgArr;
		        that.nowChat=list[num].msg;
		        list[num].num=0;
		        list[num].lastMsg=dataMsg;
		        //console.log(list[num])
		        that.desc="";
		        sessionStorage.setItem('chat',JSON.stringify(list));
		        //跳转到底部
				that.$nextTick(() => {
			       var container = that.$el.querySelector("#chatContainer");
			       container.scrollTop = container.scrollHeight;
			    })
			}else{
				that.$message.error('消息发送失败！');
			}
		})
	};
	//发送图片消息
	function sendPrivatePic(that) {
		that.$ajax(that.$store.state.localIP+'sendMessage','post', {
			"from":localStorage.getItem('hxu'),
			"target": ['customerservice'],
			"msg":that.desc,
			"userType":1,
			"width":that.imgObj.width,
			"height":that.imgObj.height,
			"type":2//文本1 图片2
		}).then((response)=>{
			//console.log(response)
			if(response.retCode==0){
				//console.log(1)
				var date = new Date(response.createTime);
    			var time = date.getTime();
    			var timeTarget=parseInt(time/60000);//时间标记
				var list=that.friendList;
		        var num=0;
		       	if(list.length==0){
		        	list.push({'msg':{}})
		        }
		        var dataMsg='<a href="'+that.uploadPicUrl+'" target="_blank"><img src='+that.uploadPicUrl+' width="80"></a>';
		        //console.log(dataMsg)
		        var info={
		        	name:localStorage.getItem('hxu'),
		        	//time:time,
		        	info:dataMsg
		        }
		        
		        var msgArr=list[num].msg;
		        var timeFlag=0;//时间标记
		        for(var i in msgArr){
		        	if(Math.abs(parseInt(i/60000)-timeTarget)<4){
		        		msgArr[i].push(info);
		        		timeFlag=1;
		        	}
		        }
		        if(!timeFlag){
		        	msgArr[time]=[info];
		        }
		        list[num].msg=msgArr;
		        that.nowChat=list[num].msg;
		        list[num].num=0;
		        list[num].lastMsg=dataMsg;
		        //console.log(list[num])
				that.friendList=[];
				that.friendList=list;
		        that.desc="";
		        sessionStorage.setItem('chat',JSON.stringify(list));
		        //跳转到底部
				/*that.$nextTick(() => {
			       var container = that.$el.querySelector("#chatContainer");
			       container.scrollTop = container.scrollHeight;
			    })*/
			}else{
				that.$message.error('消息发送失败！');
			}
		}).catch((error)=>{
			that.$message.error('消息发送失败！');
		})
	}
	//历史记录
	function messagesHistory(that,length){
		that.$ajax(that.$store.state.localIP+'messagesHistory','post', {
			"from":localStorage.getItem('hxu'),
			"target":['customerservice'],
			"curPage":length
		},function(response){
			//console.log(response)
			if(response.retCode==0){
				var list=response.messageList;
				var friendList=that.friendList;//好友信息列表
				var num=0;//当前的index
				if(list.length==0){
		        	list.push({'msg':{}})
		        }
				var msgArr=friendList[num].msg;//msg对象
				//console.log(msgArr)
				var timeFlag=0;//标记
				for(var i=0;i<list.length;i++){
					if(list[i].type==2){
						list[i].msg='<a href="'+list[i].msg+'" target="_blank"><img src='+list[i].msg+' width="80"></a>'
					}
					//替换图片表情
					var  expressionList=that.expressionList;
					for(var x in expressionList){
			        	//使用正则替换原有表情符号
			        	list[i].msg=list[i].msg.replace(x,"<img src='"+that.expressionPath+expressionList[x]+"' style='vertical-align:middle;'>");
			        }
					list[i].msg=list[i].msg.replace(/((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/,"<a target='_black' href='$&'>$&</a>");
					var time=parseInt(list[i].createTime/60000);
					let info={
						name:list[i].froms,
						info:list[i].msg
					}
					for(var j in msgArr){	
						if(Math.abs(time-parseInt(j/60000))<4){
							timeFlag=1;
							msgArr[j].unshift(info);
						}
					}
					if(!timeFlag){
						msgArr[list[i].createTime]=[info];
					}
				}
				var newObj=sortObj(msgArr);
				friendList[num].msg=newObj;
				that.nowChat=newObj;
				//console.log(newObj)
				that.friendList=[];
				that.friendList=friendList;
				sessionStorage.setItem('chat',JSON.stringify(that.friendList));
				that.loadingFlag=false;
			}else{
				that.loadingFlag=false;
				that.$message.error('查询历史记录失败！');
			}
		})
	}
	//排序
	function sortObj(obj){
		var newObj={};
		var arr=[];
		for(var i in obj){
			arr.push(i);
		}
		arr.sort(function(a,b){return a-b});
		for(var i=0;i<arr.length;i++){
			newObj[arr[i]]=obj[arr[i]];
		}
		return newObj;
	}
</script>

<style scoped="scoped">
	.chat{
		position: fixed;
		top: 0rem;
		left: 0rem;
		z-index: 99;
		width: 100%;
		height: 100%;
		background: #ffffff;
	}
	.header{
		width:100%;
		height:0.98rem;
		line-height: 0.98rem;
		background:rgba(68,68,68,1);
		position: relative;
		text-align: center;
	}
	.back{
		position:absolute;
		top: 0.315rem;
		left: 0.3rem;
		width: 0.19rem;
		height: 0.35rem;
	}
	.title{
		display: inline-block;
		text-align: left;
		padding-left: 0.7rem;
		position: relative;
		font-size:0.26rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(255,254,254,1);
	}
	.title img{
		position: absolute;
		display: block;
		width: 0.6rem;
		height: 0.6rem;
		top: 0.17rem;
		left: 0rem;
	}
	.content{
		position: absolute;
		width: 100%;
		height: 100%;
		background: #F5F7F8;
		/*padding-top: 0.98rem;*/
		padding-bottom:4.2rem;
		box-sizing: border-box;
		overflow-x: hidden;
		overflow-y: auto;
		z-index: 90;
	}
	.chatInput{
		height: 3rem;
		border-top:1px solid rgba(220,220,220,1);
		position: absolute;
		bottom: 0rem;
		background: #ffffff;
		left: 0rem;
		width: 100%;
		z-index: 92;
	}
	textarea{
		width: 100%;
		padding: 0.1rem;
		box-sizing: border-box;
		height: 100%;
		resize: none;
		border: none;
		font-size: 0.24rem;
		outline: none;
	}
	.submit{
		width:1.82rem;
		height:0.82rem;
		background:rgba(220,220,220,1);
		border:1px solid rgba(210,210,210,1);
		border-radius:4px;
		line-height: 0.82rem;
		text-align: center;
		position: absolute;
		z-index: 20;
		bottom: 0.2rem;
		right: 0.2rem;
		background: none;
		border-radius:4px;
		font-size:0.24rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(68,68,68,1);
		cursor: pointer;
		outline: none;
	}
	.more{
		width: 100%;
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: center;
		font-size: 0.14rem;
		color: cornflowerblue;
		cursor: pointer;
	}
	.content ul li{
		width: 100%;
	}
	.content img{
		float: left;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		border:1px solid #cccccc;
	}
	.customer_chat img{
		float: left;
	}
	.server_chat img{
		float: right;
		border: none;
	}
	.out_box{
		margin-top: 0.3rem;
		padding:0px 0.2rem;
	}

	.content .chat_border{
		padding: 0.1rem;
		border-radius: 10px;
		margin: 0px 0.2rem;
		letter-spacing: 3px;
		position: relative;
		min-height: 0.2rem;
		min-width: 0.4rem;
		max-width: 300px;
		line-height: 32px;
	}
	.customer_chat .chat_border{
		float: left;
		margin-left: 0rem;
		margin-top: 0.1rem;
		padding: 0.3rem;
		background: #ffffff;
		font-size:0.24rem;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(68,68,68,1);
		line-height:150%;
		word-break: break-all;
		white-space:normal; 
	}
	.server_chat .chat_border{
		float: right;
		background: #F4C54B;
		color: #4E000C;
		word-break: break-all;
		white-space:normal; 
		margin-right: 0rem;
		padding: 0.2rem;
		box-shadow:0px 5px 7px 0px rgba(209,216,220,0.69);
		border-radius:0.3rem;
		min-width: 1.6rem;
		text-align: center;
		margin-top: 0.2rem;
	}
	.tools span.right{
		float: right;
		font-size: 0.14rem;
		height: 0.3rem;
		line-height:  0.3rem;
		margin-right: 0.1rem;
		padding:0px  0.1rem;
	}
	.more{
		width: 100%;
		height: 0.4rem;
		line-height: 0.4rem;
		text-align: center;
		font-size: 0.14rem;
		color: #009BDB;
		cursor: pointer;
	}
	.chatTime{
		width:100%;
		text-align: center;	
		margin: 0.2rem 0px;
	}
	.chatTime span{
		padding: 0.05rem 0.1rem;
		background: #cccccc;
		border-radius: 15px;
		font-size: 0.12rem;
	}
	.loadingHistory{
		color: #009BDB;
		font-size: 0.14rem;
		text-align: center;
		height: 0.4rem;
		line-height: 0.4rem;
	}
	.el-icon-loading:before{
		font-size: 0.2rem;
	}
	.icon-tupian{
		position: relative;
		z-index: 10;
		cursor: pointer;
	}
	.uploadPic{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 0.3rem;
		height: 0.3rem;
		opacity: 0;
		z-index: 20;
		overflow: hidden;
		cursor: pointer;
	}
	.serverNmae{
		font-size:0.22rem;
		height: 0.6rem;
		line-height: 0.6rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(121,121,121,1);
	}
</style>