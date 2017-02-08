<template>
	<div id="two">
		<h2>第二个模块</h2>
		<h3>和风天气</h3>
		<div class="contentBox">
			<nav class="clearfix">
				<a class="menu">三</a>
				<div class="nav_box_right">
					<span>6°</span>
					<i>☀</i>
				</div>
			</nav>
			
		</div>
	</div>

</template>

<script>
	export default {
		data () {
			return {
				items: null,
				dataUrl: 'https://free-api.heweather.com/v5/hourly'
			}
		},
		methods: {
			getJsonP: function(_url){
				this.$http.get(_url,{
					params: {
						city: '包头',
						key: '146ba7b820344558a47496c09c16ff6d'
					}
				}).then(function(response){
					this.items = response.body.HeWeather5
				},function(response){
					console.log('请求失败');
				});
			}
		},
		mounted: function(){
			this.getJsonP(this.dataUrl);
		}
	}
</script>

<style>
	#two * {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	#two .contentBox {
		display: block;
		border: 1px solid #ccc;
	    width: 400px;
	    margin: 0 auto;
	    box-shadow: 10px 10px 10px;
	    padding: 4px 4px;
	}
	#two nav .menu {
		width: 30px;
		float: left;
		cursor: pointer;
	}
	#two nav .nav_box_right {
		width: 60px;
		float: right;
	}
	.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
	.clearfix{*+height:1%;}
</style>