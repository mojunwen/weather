<template>
	<div id="one">
		<h2>豆瓣电影排行榜</h2>
		<ul>
			<li v-for="item in items">{{ item.title }}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				items: [],
				dataUrl: 'https://api.douban.com/v2/movie/top250?count=10'
			}
		},
		methods: {
			getJsonP: function(_url){
				this.$http.jsonp(_url,{},{
					headers:{},
					emulateJSON: true
				}).then(function(response){
					this.items = response.data.subjects
				},function(response){
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