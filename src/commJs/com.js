let WebIM=require('easemob-websdk'); 
import '@/commJs/webim.base.config.js';
//引入状态管理器
import store from '@/store.js'

//创建连接
var conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true
});
//用户登录
const options={ 
	apiUrl: WebIM.config.apiURL,
	user:null,
	pwd: null,
	appKey: WebIM.config.appkey
}
//设置环信登录监听
//设置监听
conn.listen({
//登录监听
  	onOpened: function ( message ) {          //连接成功回调
		// 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
		// 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
		// 则无需调用conn.setPresence();
		//console.log(message)
		//设置心跳
		//that.$imconn.heartBeat(that.$imconn);
		console.log("连接成功");
	}, 
	//接收文本消息
	onTextMessage: function ( message ) {
		//console.log(message);
		store.commit("friendList",message);
	},
	//收到表情消息
	onEmojiMessage: function (message) {
		// 当为WebIM添加了Emoji属性后，若发送的消息含WebIM.Emoji里特定的字符串，connection就会自动将
		// 这些字符串和其它文字按顺序组合成一个数组，每一个数组元素的结构为{type: 'emoji(或者txt)', data:''}
		// 当type='emoji'时，data表示表情图像的路径，当type='txt'时，data表示文本消息
		//console.log('Emoji');
		that.$store.commit("friendEmojiMessage",message);
		that.$notify.info({
		  title: '消息',
		  message: '您有新的消息',
		  duration:2000,
		  onClick:function(){
		  	that.$router.push({path:'/customerService/servicePersonal'})
		  }
		});
		var data = message.data;
		//console.log(message)
		/*for(var i = 0 , l = data.length ; i < l ; i++){
		    console.log(data[i]);
		}*/
	},   
	//接收图片监听
	onPictureMessage: function (message) {
		//console.log(message);
		store.commit("friendList",message);
		console.log("Location of Picture is ", message.url);
	}, 
	//关闭连接
	onClosed: function ( message ) {
		console.log("连接断开");
	}
});
//登录环信
function loginHx(user,psw,callback){
	options.user=user;
	options.pwd=psw || '123456';
	conn.open(options);
	if(arguments.length>2){
		callback()
	}
}
//唤醒app
function openAPP(){
	var ua = navigator.userAgent.toLowerCase();
   	var config = {
       /*scheme:必须*/
       scheme_IOS: 'wojiali://wojiali.com/path',
       scheme_Adr: 'wojiali://wojiali.com/path',
       download_url: 'http://app.appurl.cc/21794628',
       timeout: 2600
   	};
	var ifr = document.createElement('iframe');
	if(ua.indexOf('micromessenger')==-1){
		if(ua.indexOf('os') > -1){
	    	//提示请选择在浏览器打开			    
	    	window.location.href=config.scheme_IOS;
		}else{
			ifr.src = config.scheme_Adr
	        ifr.style.display = 'none';
		    document.body.appendChild(ifr);
		}
		setTimeout(function(){
	    	if(ua.indexOf('os')==-1){
		    	document.body.removeChild(ifr);
		    }
		    window.location.href = config.download_url
		}, 2000);
	}
}

export default {
	loginHx,
	conn,
	openAPP
}
