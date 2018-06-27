<template>
	<div>
		<nav ref="indexStatusBar" class="navbar navbar-expand-md text-center bg-info px-0">
			<span id="btn-menu" class="icon-reorder navbar navbar-text btn text-white" @click="ejectMenu"></span>
			<div class="text-white col-12 justify-content-center navbar-text">{{title}}</div>
		</nav>
		<div v-show="isAdd" id="btn-add" class="cursor-pointer text-white btn-danger" @click="switchPage('addAccount')">+</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default{
		data:function(){
    		return{
    			isAdd:true
    		}
    	},
		props:['currentPage','isEjectMenu'],
		methods:{
			switchPage:function(val){
				this.$parent.$emit('switch-page',val);
			},
			ejectMenu:function(){
				this.$parent.$emit('eject-menu',!this.isEjectMenu);
			}
		},
		computed:{
			title:function(){
				if(this.currentPage=="indexOfApp")
						return '账目列表'
				else if(this.currentPage=="showAccount")
						return '账目展示'
				else if(this.currentPage=="addAccount")
						return '添加账单'
			}
		},
	}
</script>

<style>
	#btn-menu{
		position:absolute;
		top:0.5rem;left:0px;
		z-index: 2;
	}

	#btn-add {
		z-index: 2;
		display: block;
		width: 50px;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
		text-align: center;
		border-radius: 25px;
		position: fixed;
		right: 10%;bottom: 10%;
	}

</style>