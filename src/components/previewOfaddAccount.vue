<template>
<div class="text-center">
	<div id="preview" class="card">
	<div class="card-body row">
		<div class="col-3 row flex-column align-content-center justify-content-center">
			<div class="box-fluid-img" :style="src"></div>
		</div>
		<div class="col-7 row justify-content-center flex-column">
			<div class="row">事项：{{accountEvent}}</div>
			<div class="row">金额：{{accountMoney}}</div>
		</div>
		<div class="col-1 row justify-content-center align-content-center flex-column">
			<button type="button" class=" btn btn-danger" @click="handleDelete">&times;</button>
		</div>
	</div>
	</div>
</div>
</template>

<script>
	import Vue from 'vue'
	export default{
	 	data:function(){
			return{
				src:"background-image:none"
			}
		},
		props:[	'accountType','accountEvent','accountMoney'],
		watch:{
			accountType:function(){
				if(this.accountType!==undefined){
					this.src= 'background-image:url(~assets/img/'+this.accountType+'.png)';
				}
				else this.src= "background-image:none";
			}
		},
		methods:{
			handleDelete:function(){
				this.$parent.$emit("handle-delete");
			}
		}
	}
</script>

<style>
	.box-fluid-img{
		box-sizing: content-box;
		height: 0px;
		width: 50%;
	    padding-bottom: 50%;
	   /* overflow:hidden;*/
	    background-position: center center;
	    background-repeat: no-repeat;
	    -webkit-background-size:cover;
	    -moz-background-size:cover;
	    background-size:contain;
	}
</style>