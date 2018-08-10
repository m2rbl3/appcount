<template>
	<div class="card">
		<span class=" card-head text-center">选择账目类型</span>
			<ul class="card-body row" id="event-type">
				<li class="col flex-column justify-content-center align-content-center text-center" v-for="(item,index) of typeOfEvent" @click="handleEventType(item.src,index)">
					<div :style="'background-image:url('+require('../assets/img/'+item.src+'.png')+')'" :class="{border:isBorder[index]}" class="round box-fluid-img mx-auto border-trasnparent">
					</div>
					<br/>{{item.name}}
				</li>
		  	</ul>
  	</div>
</template>

<script>
	import Vue from 'vue'
	export default{
	    data:function(){
			return{
				typeOfEvent:[{src:"food",name:"饮食"},{src:"life",name:"日用"},{src:"entertainment",name:"娱乐"},{src:"other",name:"其它"},{src:"income",name:"收入"}],isBorder:[],accountTypeCp2:undefined
			}
		},
		props:['accountType'],
		computed:{
			accountTypeCp:{
				get:function(){
					return this.accountType;
				},
				set:function(val){
					this.accountTypeCp2=val;
				}
			}
		},
		methods:{
			handleEventType:function(itemType,index){
				for(var i=0,len=this.isBorder.length;i<len;i++){
					Vue.set(this.isBorder,i,false);
				}
				if(this.accountTypeCp2===undefined || this.accountTypeCp2!=itemType){
					this.accountTypeCp=itemType;
					Vue.set(this.isBorder,index,true);
				}
				else 
					this.accountTypeCp=undefined;
				this.$parent.$emit("handle-account","type",this.accountTypeCp2);
			}
		}
	}
</script>

<style>
	.box-fluid-img{
		box-sizing: content-box;
		height:0px;
		width:50%;
	    padding-bottom: 50%;
	   /* overflow:hidden;*/
	    background-position: center center;
	    background-repeat: no-repeat;
	    -webkit-background-size:cover;
	    -moz-background-size:cover;
	    background-size:contain;
	}

	.border-trasnparent{
		border:1px solid transparent;
	}
</style>