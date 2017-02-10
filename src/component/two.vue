<template>
	<div id="two">
		<h2>第二个模块</h2>
		<h3>和风天气</h3>
		<div>
			<label for="cityBox">输入城市</label>
			<input id="cityBox" type="text" name="" v-bind:value="city" @change="loopa">
		</div>
		<div>
			<label for="selectBox">选择方法</label>
			<select @change="changeRouter">
				<option value="now">现在</option>
				<option value="forecast">7--10天</option>
			</select>
		</div>
		<div class="contentBox">
			<nav class="clearfix">
				<a class="menu">三</a>
				<div class="nav_box_right">
					<span> {{ now.tmp + '°' }} </span>
					<i><img v-bind:src="rightIcon"></i>
				</div>
			</nav>
			<section>
				<h2> {{ basic.city }} </h2>
				<p>
					<img v-bind:src="rightIcon">
					<span> {{ now.tmp + '°' || '温度'}} </span>
				</p>
				<p>
					<ul>
						<li>
							<label>风力</label>
							<span>{{now.wind.sc + '级' || '风力'}}</span>
						</li>
						<li>
							<label>风向</label>
							<span>{{now.wind.dir || '风向'}}</span>
						</li>
					</ul>
				</p>
			</section>
		</div>
	</div>

</template>

<script>
	export default {
		data () {
			return {
				basic: {city: '城市'},
				now: {tmp: '温度',wind: {sc: '风力', dir: '风向'}},
				status: null,
				city: '包头',
				router: 'now',
				dataUrl: 'https://free-api.heweather.com/v5/',
				rightIcon: 'http://files.heweather.com/cond_icon/100.png'
			}
		},
		methods: {
			getJsonP: function(_url){
				var that = this;
				this.$http.get(that.dataUrl + _url,{
					params: {
						city: that.city,
						key: '146ba7b820344558a47496c09c16ff6d'
					}
				}).then(function(response){
					console.log();
					if(response.body && response.body.HeWeather5[0].status == 'ok'){
						this.basic = response.body.HeWeather5[0].basic;
						this.now = response.body.HeWeather5[0].now;
						this.status = response.body.HeWeather5[0].status;
						this.rightIcon = 'http://files.heweather.com/cond_icon/'+this.now.cond.code+'.png'
					}
					
				},function(response){
					console.log('请求失败');
				});
			},
			loopa : function(e){
				this.city = e.target.value;
				this.getJsonP(this.router);
			},
			changeRouter : function(e){
				this.router = e.target.options[e.target.selectedIndex].value;
				this.getJsonP(this.router);
			}
		},
		created: function(){
			this.getJsonP(this.router);
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
	#two nav .nav_box_right i img {
		width: 14px;
	}
	.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
	.clearfix{*+height:1%;}
</style>