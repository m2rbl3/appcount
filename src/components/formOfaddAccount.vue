<template>
	<form class="card">
		<div class="card-body form-group text-center">
			<div class="row">
				<label class="col-md-2 mx-auto" for="event">事项</label>
					<input type="text" class="col-md-10 form-control" id="event" @input="handleAccount('event',$event)" :value="accountEvent"> 
			</div>
			<div class="row">
				<label class="col-md-2 mx-auto" for="money">金额</label>
					<input type="text" class="col-md-10 form-control" id="money" :value="accountMoney"
					@input="handleAccount('money',$event)">
			</div>
			<button class="btn btn-primary mx-auto" @click="saveAccount">提交</button>
		</div>
	</form>
</template>

<script>
	import Vue from 'vue'
	export default{
	    props:['accountEvent','accountMoney'],
		methods:{
			handleAccount:function(type,event){
				this.$parent.$emit("handle-account",type,event.target.value);
			},
			saveAccount:function(){
				this.$parent.$emit("save-account");
			}
		}
	}
</script>