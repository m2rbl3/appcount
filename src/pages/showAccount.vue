<template>
	<div id="container" class="text-center">
        <div class="row">
        	<div class="col-4 offset-4">
	    	<span>支出占比图</span>
	    	<ul class="row text-center justify-content-center align-content-center no-gutters" id="event-type-list">
	    		<li v-for="(item,index) in eventTypeList"><span class="box-type-item" :style="item.color"></span>{{item.type}}{{percentCache[index]}}%</li>
	   		</ul>
	    	<canvas id="circle" height="200px" width="200px"></canvas>
	   		</div>
	   	</div>
	   	<div class="row">
	    	<div class="col-4 offset-4">
				<span>月收入折线图</span>
				<ul id="income-list"></ul>
				<canvas id="line-chat" height="230px" width="270px"></canvas>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default{
		data:function(){
			return{
				payment:[],allPayment:0,dateArr:[],percent:[0,0,0,0],percentCache:[0,0,0,0],
				eventTypeList:[
					{type:'饮食',color:'background-color:#F44C53'},
					{type:'日用',color:'background-color:#EC48BD'},
					{type:'文娱',color:'background-color:#464AEB'},
					{type:'其他',color:'background-color:#1B9382'}
				]
			}
		},
		props:['accountData'],
		mounted:function(){
				this.accountCost();
				this.getPercent();
				this.drawCircle();
				this.drawLineChat();				
		},
		watch:{
	    	percent:function(){
	    		for(var i=0,len=this.percent.length;i<len;i++){
	    			if(this.percent[i]){
	    				var cache=Number(this.percent[i])*100;
	    			    Vue.set(this.percentCache,i,cache.toFixed(2));
	    			}
	    		}
			}
		},
		methods:{
			accountCost:function(){
				var countFood=0,countLife=0,countEntertainment=0,countOther=0,countIncome=0,item;
			 	for(var i=0,len=this.accountData.length;i<len;i++){
			 		item=this.accountData[i];
			 		if(item.type!==undefined && item.money!==undefined)
			 		switch(item.type){
			 			case "food":
			 				countFood=Number(item.money);break;
			 			case "life":
                    		countLife+=Number(item.money);break;
                		case "entertainment":
                			countEntertainment+=Number(item.money);break;
                		case "other":
            	    		countOther+=Number(item.money);break;
			 		}
			 		if(item.time!==undefined && item.type=="income"){
            		    var year=item.year,month=item.month,money=item.money;
               			if(this.dateArr[year]==undefined){
               	    		Vue.set(this.dateArr,year,[]);
               			} 
                		if(this.dateArr[year][month]==undefined){
                			Vue.set(this.dateArr[year],month,[]);
                	    	Vue.set(this.dateArr[year][month],"money",0);
                		}
                		var dateArrCache=this.dateArr[year][month]["money"]
                		Vue.set(this.dateArr[year][month],"money",dateArrCache+Number(item.money));
            		}
				}
				this.payment.push(countFood,countLife,countEntertainment,countOther);
				this.allPayment=countFood+countLife+countEntertainment+countOther;
			},

			getPercent:function(){
				var allCount=this.allPayment;
				for(var i=0,len=this.payment.length;i<len;i++){
					Vue.set(this.percent,i,this.payment[i]/allCount);
				}
			},

			drawCircle:function(){
			        var circle=document.getElementById("circle");
			        var color=["#F44C53","#EC48BD","#464AEB","#1B9382"];

			        if(circle.getContext){
			       	    circle=circle.getContext("2d");
			          	circle.translate(100,100);
			            if(this.percent!=[]){
			                var start=0,end=0,oNum;
			    	        for(var i=0,len=this.percent.length;i<len;i++){
			                    circle.beginPath();
			                    circle.moveTo(0,0);
			                    end+=this.percent[i]*2*Math.PI;
			                    circle.arc(0,0,98,start,end,false);
			                    circle.fillStyle=color[i];
			                    circle.fill();
			                    circle.closePath();
			                    start=end;
		                    }
		                }
		                else{
		            	    circle.textAlign="center";
		            	    circle.textBaseline="middle";
		            	    circle.font="20px Arial";
		            	    circle.fillText("无支出记录",0,0);
		            	}
		   		    }
		    },

		    drawLineChat:function(){
		    	var oDate=new Date();
		    	var thisYear=oDate.getFullYear();
		    	var thisMonth=oDate.getMonth()+1; 

		    	//取画布
		    	var lineChat=document.getElementById("line-chat");
		    	if(lineChat.getContext)
		    	lineChat=lineChat.getContext("2d");
		        lineChat.translate(70,200);

		        //画坐标轴//
		        lineChat.beginPath;
		        lineChat.moveTo(0,0);
		        lineChat.lineTo(0,-200);
		        lineChat.moveTo(0,0);
		        lineChat.lineTo(200,0);
		        lineChat.strokeStyle="#000";
		        lineChat.stroke();
		        lineChat.closePath;

		        //画虚线
		        lineChat.beginPath;
		        for(var i=0,j=40;i<4;i++,j+=40){
		        	lineChat.moveTo(j,0);
		        	for(var k=0;k<200;k+=10){
		        	   lineChat.moveTo(j,-k)
		               lineChat.lineTo(j,-k-5);
		               lineChat.stroke();
		        	}
		        }
		        lineChat.closePath;

		        //画X轴数据
		        lineChat.textAlign="center";
		        lineChat.textBaseline="middle";
		        // lineChat.font="20px Arial";
		        for(var i=0,j=0;i<5;i++,j+=40){
		            lineChat.fillText((thisMonth-2+i)+"月",j,10);
		            // if(dateArr[thisYear]!=undefined && dateArr[thisYear][String(thisMonth-2+i)]!=undefined)
		        	
		        }

		        //处理Y轴数据
		        var compArr=new Array();
		        for(var i=0;i<5;i++){
		        	if(this.dateArr[thisYear]!=undefined && this.dateArr[thisYear][String(thisMonth-2+i)]!=undefined)
		                compArr.push(this.dateArr[thisYear][String(thisMonth-2+i)]["money"]);
		        }
		        if(compArr.length>0){
		           var maxIncome=Math.max.apply(null,compArr);
		           var digit=Math.pow(10,String(maxIncome).split("").length-1)
		           var maxNumber=digit*Math.ceil(maxIncome/digit);
		           var section=maxNumber/180;
		        }
		        else maxNumber=0;

		        //画Y轴数据
		        lineChat.textAlign="end";
		        for(var i=0,j=0;i<6;i++,j+=36){
		        	lineChat.fillText(maxNumber*(i)/5,-5,-j);
		        }
		        lineChat.textAlign="center";
		        lineChat.fillText("(元)",-10,-193);

		         //画折线
		        lineChat.beginPath;
		        for(var i=0,j=0;i<5;i++,j+=40){
		        	if(this.dateArr[thisYear]!=undefined && this.dateArr[thisYear][String(thisMonth-2+i)]!=undefined)
		        	    lineChat.moveTo(j,-this.dateArr[thisYear][String(thisMonth-2+i)]["money"]/section);
		        	else lineChat.moveTo(j,-0);

		        	if(this.dateArr[thisYear]!=undefined && this.dateArr[thisYear][String(thisMonth-1+i)]!=undefined)
		        	    lineChat.lineTo(j+40,-this.dateArr[thisYear][String(thisMonth-1+i)]["money"]/section);  
		        	else lineChat.moveTo(j+40,0);  	
		        	
		        }
		        lineChat.fill();
		        lineChat.stroke();
		        lineChat.closePath;	    
			}
		}
	}
</script>

<style>
	.box-type-item{
		display: inline-block;
		height: 16px;
		width:16px;
		border-radius: 8px;
		vertical-align: -2px;
	}
</style>