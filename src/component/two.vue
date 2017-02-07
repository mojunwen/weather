<template>
	<div id="two">
		<h2>第二个模块</h2>
		<div>
			<h3>{{items.}}</h3>
		</div>
	</div>

</template>

<script>
	export default {
		data () {
			return {
				items: [],
				dataUrl: 'https://free-api.heweather.com/v5/forecast?city=包头&key=146ba7b820344558a47496c09c16ff6d'
			}
		},
		methods: {
			getJsonP: function(_url){
				this.$http.jsonp(_url,{},{
					headers:{},
					emulateJSON: true
				}).then(function(response){
					this.items = response.HeWeather5
				},function(response){
					this.items = response.HeWeather5
					console.log('请求失败。');
				});
			}
		},
		mounted: function(){
			this.getJsonP(this.dataUrl);
		}
	}
</script>

<style>
	
</style>