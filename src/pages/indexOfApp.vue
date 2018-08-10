<template>
	<div>
		<div class="card card-index" v-for="(account,index) in accountData" :key="account.time">
			<div class="card-head bg-info text-white text-center">{{account.time}}</div>
			<div class="card-body row">
				<div class="col-4 col-md-2 flex-column align-content-center justify-content-center">
					<div class="fluid-img" :style="account.type==undefined?'background-image:none;':'background-image:url('+require('../assets/img/'+account.type+'.png')+');'"></div>
				</div>

				<div v-if="showEdit[index]" class="col-8 col-md-4 offset-md-2 flex-column-center"> 
					<div class="flex-column align-content-center justify-content-center">
						<span>事项：<input type='text'
						@input='editBind("event",$event,index)' :value="account.event"></input></span>
					</div>
					<div class="flex-column align-content-center justify-content-center" :value="account.money">
						<span>金额：<input type='text'
						@input='editBind("money",$event,index)'></input></span>
					</div>
				</div>

				<div v-else class="col-8 col-md-4 offset-md-2 flex-column align-content-center justify-content-center">
					<div class="flex-column align-content-center justify-content-center">
						<span>事项：{{account.event}}</span>
					</div>
					<div class="flex-column align-content-center justify-content-center">
						<span>金额：{{account.money}}</span>
					</div>
				</div>

				<div class="col-md-4 row flex-row-center">
					<button type="button" class="col-md-2 mx-md-1 mb-xs-1 btn btn-info flex-row-center" @click="handleSave(index)" v-if="showEdit[index]">保存</button>
					<button type="button" class="col-md-2 mx-md-1 btn btn-info flex-row-center" @click="handleEdit(index)" v-else>编辑</button>

				<button class="col-md-2 btn btn-danger justify-content-center align-content-center btn-index" @click="handleDelete(index)">&times;</button>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default{
		name:'indexOfApp',
		data:function(){
    		return {
    			src:'background-image:none',
    			showEdit:[],
    			eventOfChange:undefined,
    			moneyofChange:undefined
    		}
    	},
		props:{
			"accountData":{
				required:true,
				type:Array
			}
		},
		computed:{
			account:function(){
				return this.accountData;
			}
		},
		beforeMount:function(){ 
						for(let i=0,len=this.accountData.length;i<len;i++){
							Vue.set(this.showEdit,i,false);
						}
		},
		methods:{
			handleDelete:function(index){
				this.account.splice(index,1);
				localStorage.setItem("account",JSON.stringify(this.account));
				this.$parent.$emit("reload-page");
			},
			handleEdit:function(index){
				Vue.set(this.showEdit,index,true);
			},
			handleSave:function(index){
				if(this.eventOfChange!=undefined && typeof this.moneyOfChange!='number'){
					var eventCache=this.eventOfChange[index];
					var moneyCache=this.moneyOfChange[index];
					Vue.set(this.account[index],'event',eventCache);
					Vue.set(this.account[index],'money',moneyCache);
					localStorage.setItem("account",JSON.stringify(this.account));
					this.$parent.$emit("reload-page");
					Vue.set(this.showEdit,index,false);
				}
				else alert("请输入正确事件或者金额");
			},
			editBind:function(type,event,index){
				if(type=="event")
					this.eventOfChange=event.target.value;
				else if(type=="money")
					this.moneyOfChange=event.target.value;
			}
		}
	}
</script>

<style>
	.card-index {
		margin: 10px;
		box-shadow: 0px 2px 5px gray;
	}

.fluid-img{
	box-sizing: content-box;
	height:0px;
	width:50%;
    padding-bottom: 50%;
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    background-size:contain;
}

</style>