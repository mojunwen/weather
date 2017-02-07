<template>
	<div id="two">
		<h2>第二个模块</h2>
		<div>
			<h3>和风天气</h3>
			
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
	
</style>