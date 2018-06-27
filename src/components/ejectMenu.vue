<template>
	<div>
		<transition name="menu-eject-background">
    		<div id="menu-eject-background" v-show="isEjectMenu"></div>
		</transition>
		<transition name="menu-eject-left">
			<div class="bg-white" id="menu-eject-left" v-show="isEjectMenu" v-hammer:swipe.left="ejectMenu">
				<div ref="ejectMenuStatusBar" class="row bg-info"></div>
				<div class="row leftmenu-button cursor-pointer justify-content-center" @click="switchPage('accountList')">账目列表</div>
				<div class="row align-content-center leftmenu-button cursor-pointer justify-content-center"  @click="switchPage('accountStatistics')">账目统计</div>
			</div>
    	</transition>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		props:['isEjectMenu'],
		methods:{
			ejectMenu:function(){
				this.$parent.$emit('eject-menu',false);
			},
			switchPage:function(val){
				this.$parent.$emit("eject-menu",false);
				this.$parent.$emit("switch-page",val);
			}
		}
	}
</script>

<style>

	.leftmenu-button{
		height: 5vh;
	}

	.leftmenu-button:hover{
		background: gray;
		color: white;
	}

	#menu-eject-background {
		background: black;
		position:absolute;
		top:0vh; left:0vw;
		height: 100vh;
		width:100vw;
		z-index: 3;
		opacity: 0.5;
	}

	#menu-eject-left {
		position:absolute;
		top:0vh; left:0vw;
		height: 100vh;
		width: 50vw;
		z-index: 4;
		background: white;
	}

	.menu-eject-background-enter {
		opacity: 0;
	}

	.menu-eject-background-enter-active,.menu-eject-background-leave-active{
		transition: all .5s ease;
	}

	.menu-eject-background-leave-to{
		opacity:0;
	 }

	#menu-eject-left>div{
		margin: 0px;
	}

	.menu-eject-left-enter{
	 	transform: translateX(-50vw);
	 	opacity: 0
	}

	.menu-eject-left-enter-to{
	 	transform: translateX(0vw);
	 }

	.menu-eject-left-enter-active,.menu-eject-left-leave-active{
		transition: all .5s ease;
	}

	.menu-eject-left-leave-to{
		transform: translate(-50vw);
		opacity: 0;
	}

	.to-transform{
		transform:translateX(-20vw);
	}

</style>