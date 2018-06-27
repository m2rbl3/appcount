<template>
	<div>
		<previewOfaddAccount ref="preview" :newAccount="newAccount" :account-type="accountType" :account-money="accountMoney" :account-event="accountEvent"></previewOfaddAccount>
  		<chooseTypeOfaddAccount ref="chooseType" :account-type="accountType"></chooseTypeOfaddAccount>
  		<formOfaddAccount ref="form" :account-event="accountEvent" :account-money="accountMoney"></formOfaddAccount>
  	</div>
</template>

<script>
	import Vue from 'vue'
	import previewOfaddAccount from '../components/previewOfaddAccount.vue'
	import chooseTypeOfaddAccount from '../components/chooseTypeOfaddAccount.vue'
	import formOfaddAccount from '../components/formOfaddAccount.vue'

	export default{
		data:function(){
			return{
				newAccount:{},
				accountType:undefined,
				accountEvent:undefined,
				accountMoney:undefined
			}
		},
		components:{
			previewOfaddAccount,chooseTypeOfaddAccount,formOfaddAccount
		},
		watch:{
			accountType:function(){
				Vue.set(this.newAccount,"type",this.accountType);
			},
			accountEvent:function(){
				Vue.set(this.newAccount,"event",this.accountEvent);
			},
			accountMoney:function(){
				Vue.set(this.newAccount,"money",this.accountMoney);
			}
		},
		methods:{
			handleAccount:function(type,value){
				switch(type){
					case "money":this.accountMoney=value;break;
					case "event":this.accountEvent=value;break;
					case "type":this.accountType=value;break;
				}
			},

			handleDelete:function(){	
				this.accountType=undefined;
				this.accountEvent=undefined;
				this.accountMoney=undefined;
				for(var i=0,isBorder=this.$refs.chooseType.isBorder,len=isBorder.length;i<len;i++){
					Vue.set(isBorder,i,false);
				}
			},

			saveAccount:function(){
				if(this.newAccount.event===undefined)
					alert("请填写事件");
				else if(/^(\d+)(\.\d+)?$/.test(this.newAccount.money)==false){
					if(this.newAccount.money===undefined)
						alert("请填写金额");
					else 
						alert("金额请填写数字");				
			    }
				else if(this.newAccount.type===undefined)
					alert("请选择事件类型");
				else {
					var oTime=new Date();
					Vue.set(this.newAccount,"time",oTime.toLocaleString());
					Vue.set(this.newAccount,"year",oTime.getFullYear());
					Vue.set(this.newAccount,"month",oTime.getMonth()+1);

					var newAccount=this.newAccount;
					if(localStorage.getItem("account")===null)
						localStorage.setItem("account","[]");
					var arr=JSON.parse(localStorage.account);
					arr.push(newAccount);
					arr=JSON.stringify(arr);
					localStorage.setItem("account",arr);

				 this.$parent.$emit("reload-page");				
				 this.$parent.$emit("switch-page","accountList");
				}	
			},
		},
		created:function(){
			this.$on("handle-account",this.handleAccount);
			this.$on("handle-delete",this.handleDelete);
			this.$on("save-account",this.saveAccount);
		}
	}
</script>