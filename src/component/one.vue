<template>
	<div id="secondcomponent">
		<!-- <h2>I am a anthor page</h2>
		<a> written by {{ author }} </a>
		<p> 感谢 <a href="https://github.com/showonne">showonne</a>大神的技术指导</p> -->
		<h2>豆瓣评分排行榜：</h2>
		<div class="list">
			<transition name="fade">
				<img src="../assets/logo.png" class="img" v-if='!show'>
			</transition>
			
			<ul class=" clearfix" >
				<li v-for="article in articles">
					<a v-bind:href="article.alt" target="_blank">
						<img v-bind:src="article.images.small">
						<label>{{article.title}}</label>
					</a>
				</li>
			</ul>
			
			<div id="paging">
				<a class="btn s" @click="prevPage">上一页</a>
				<a class="btn x" @click="nextPage">下一页</a>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data () {
			return {
				author : 'mowen',
				pageSize: 12,
				pageNum: 0,
				show: true,
				url: 'https://api.douban.com/v2/movie/top250',
				articles: []
			}
		}, 
		methods: {
			prevPage: function(){
				this.pageNum = this.pageNum - this.pageSize;
				if(!(this.pageNum - this.pageSize)){
					return this.pageNum = 0;
				}
				this.show = false;
				this.articles = [];
				this.jsonp(this.url + '?count=' + this.pageSize + '&start=' + this.pageNum)
			},
			nextPage: function(){
				this.pageNum = this.pageNum + this.pageSize;
				this.articles = [];
				this.show = false;
				this.jsonp(this.url + '?count=' + this.pageSize + '&start=' + this.pageNum)
			},
			jsonp: function(_url){
				this.$http.jsonp(_url,{},{
					headers: {},
					emulateJSON: true
				}).then(function(response){
					this.articles = response.data['subjects'];
					this.show = true;
				}, function(res){
					console.log(res);
				});
			}
		},
		mounted: function(){
			this.show = false;
			this.jsonp(this.url + '?count=' + this.pageSize + '&start=' + this.pageNum);
		}
	}
</script>

<style>
	.img {
		    margin-bottom: 340px;
	}
	.list {
		color: black;
	    border: 1px solid #ccc;
	    margin: 0 auto;
	    box-shadow: 10px 10px 30px #ccc;
	    width: 80%;
	        height: 598px;
	    padding: 6%;
	}
	.list .clearfix li {
		display: block;
    float: left;
    width: 30%;
    height: 127px;
    border-bottom: 1px solid #ccc;
    margin: 4px;
	}
	.list .clearfix li a {
		display: block;
	}
	.list #paging .btn {
		display: inline-block;
		padding: 4px;
		border: 1px solid #ccc;
		border-radius: 4px;
		color: black;
		cursor: pointer;
	}
	.list #paging .btn:hover {
		background: #bbb;
	}
	.list li label {
		display: block;
    	font-size: 12px;
	}
	.fade-enter-active {
	  	transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
	  	opacity: 0
	}
	.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
	.clearfix{*+height:1%;}
</style>