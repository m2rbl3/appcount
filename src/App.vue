<template>
		<div v-hammer:swipe.right="ejectMenu">
			<status-bar ref="indexStatusBar" :is-eject-menu="isEjectMenu" :current-page="currentPage"></status-bar>
            <div class="container-fluid">
			<components :is="currentPage" :accountData="account"></components>
		    </div>
		<eject-menu ref="ejectMenuStatusBar" :is-eject-menu="isEjectMenu" v-show="isEjectMenu"></eject-menu>
    </div>
</template>

<script>
	import addAccount from './pages/addAccount.vue'
	import showAccount from './pages/showAccount.vue'
	import indexOfApp from './pages/indexOfApp.vue'
	import statusBar from './components/statusBar.vue'
	import ejectMenu from './components/ejectMenu.vue'
    import Vue from 'vue'

	export default {
		name:'appCount',
		data:function(){
            return {
    			currentPage:"indexOfApp",
    			account:[],
    			isEjectMenu:false
            }
    	},
    	components:{
    		addAccount,showAccount,indexOfApp,statusBar,ejectMenu
    	},
    	created:function(){
    			this.reloadPage();
    			this.$on("reload-page",this.reloadPage);
    			this.$on("switch-page",this.switchPage);
    			this.$on("eject-menu",this.ejectMenu);
    	},
        mounted:function(){
            console.log("a");
            this.$refs.ejectMenuStatusBar.$refs.ejectMenuStatusBar.style.height = this.$refs.indexStatusBar.$refs.indexStatusBar.clientHeight+"px";
        },       
    	methods:{
    		reloadPage:function(){
                var cache=JSON.parse(localStorage.getItem("account"));
                if(cache) this.account=cache;
    		},
    		switchPage:function(val){	
                if(val)
                    switch(val){
            			case "accountList":
            				this.currentPage="indexOfApp";
            				this.$refs.indexStatusBar.$data.isAdd=true;
                            break;
            			case "accountStatistics":
            				this.currentPage='showAccount';
            				this.$refs.indexStatusBar.$data.isAdd=true;
            			    break;
            		    case "addAccount":
            		    	this.currentPage="addAccount";
            		    	this.$refs.indexStatusBar.$data.isAdd=false;
                            break;
            		}    
    		},
    		ejectMenu:function(val){
    		    if(typeof val=="boolean")
    		    	this.isEjectMenu=val;
    		    else 
    		    	this.isEjectMenu=val.val
    	    }
    	}
	}
</script>

<style>
    ul,li{
        list-style: none;
        padding: 0px;
    }
</style>
