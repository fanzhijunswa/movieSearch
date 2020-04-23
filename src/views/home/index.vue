<template lang="pug">
.home
	.header
		.header-up
			.header-left 涛哥电影
			.header-container
				el-autocomplete(
				class="header-input"
				v-model="state2"
				:fetch-suggestions="querySearch"
				placeholder="搜索电影、电视剧、综艺、影人"
				:trigger-on-focus="false"
				@select="handleSelect")
				.header-container-right
		.header-bottom        
			ul(class="header-ul")
				li(class="header-li")
					a(href="#") 影讯&购票
				li(class="header-li")
					a(href="#") 选电影
				li(class="header-li")
					a(href="#") 电视剧
				li(class="header-li")
					a(href="#") 排行榜
				li(class="header-li")
					a(href="#") 分类
				li(class="header-li")
					a(href="#") 影评
				li(class="header-li")
					a(href="#") 2020年度榜单
				li(class="header-li")
					a(href="#") 2020书影音报告
	.container
		.container-top
			h2 豆瓣电影 Top 250 
		.container-bottom
			.container-ul
				.container-li(v-for="(item,key) in movieData" :key="key")
					show-movie(:movieData="item")
							 

</template>
<script>
import _ from "lodash";
import ShowMovie from "./components/ShowMovie";
export default {
    name: "home",
    components: {
        ShowMovie
    },
    data() {
        return {
            middleFlag: false,
            movieData: [],
            restaurants: [],
            state1: "",
            state2: ""
        };
    },
    async created() {
        await this.getData();
    },
    methods: {
        ceshi(key) {
            console.log(key);
            console.log(this.$refs);
            console.log(this.$refs[key]);
        },
        getData() {
            return Promise.all([this.getMovie()]).catch(e => {
                console.warn("请求失败,请求日志为: ", e);
            });
        },
        getMovie() {
            return new Promise((resolve, reject) => {
                this.$http
                    .get("/getMovie")
                    .then(resp => {
                        this.movieData = _.get(resp, "data.data", []);
                        console.log(
                            "getMovie -> this.movieData",
                            this.movieData
                        );
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString
                ? restaurants.filter(this.createFilter(queryString))
                : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return restaurant => {
                return (
                    restaurant.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        loadAll() {
            return [
                { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
                {
                    value: "Hot honey 首尔炸鸡（仙霞路）",
                    address: "上海市长宁区淞虹路661号"
                },
                {
                    value: "新旺角茶餐厅",
                    address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
                },
                { value: "泷千家(天山西路店)", address: "天山西路438号" },
                {
                    value: "胖仙女纸杯蛋糕（上海凌空店）",
                    address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
                },
                { value: "贡茶", address: "上海市长宁区金钟路633号" },
                {
                    value: "豪大大香鸡排超级奶爸",
                    address: "上海市嘉定区曹安公路曹安路1685号"
                },
                {
                    value: "茶芝兰（奶茶，手抓饼）",
                    address: "上海市普陀区同普路1435号"
                },
                { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
                { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
                { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
                {
                    value: "新麦甜四季甜品炸鸡",
                    address: "嘉定区曹安公路2383弄55号"
                },
                {
                    value: "Monica摩托主题咖啡店",
                    address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
                },
                {
                    value: "浮生若茶（凌空soho店）",
                    address: "上海长宁区金钟路968号9号楼地下一层"
                },
                {
                    value: "NONO JUICE  鲜榨果汁",
                    address: "上海市长宁区天山西路119号"
                },
                {
                    value: "CoCo都可(北新泾店）",
                    address: "上海市长宁区仙霞西路"
                },
                {
                    value: "快乐柠檬（神州智慧店）",
                    address: "上海市长宁区天山西路567号1层R117号店铺"
                },
                {
                    value: "Merci Paul cafe",
                    address: "上海市普陀区光复西路丹巴路28弄6号楼819"
                },
                {
                    value: "猫山王（西郊百联店）",
                    address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
                },
                { value: "枪会山", address: "上海市普陀区棕榈路" },
                { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
                { value: "钱记", address: "上海市长宁区天山西路" },
                { value: "壹杯加", address: "上海市长宁区通协路" },
                {
                    value: "唦哇嘀咖",
                    address:
                        "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
                },
                {
                    value: "爱茜茜里(西郊百联)",
                    address: "长宁区仙霞西路88号1305室"
                },
                {
                    value: "爱茜茜里(近铁广场)",
                    address:
                        "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
                },
                {
                    value: "鲜果榨汁（金沙江路和美广店）",
                    address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
                },
                {
                    value: "开心丽果（缤谷店）",
                    address: "上海市长宁区威宁路天山路341号"
                },
                {
                    value: "超级鸡车（丰庄路店）",
                    address: "上海市嘉定区丰庄路240号"
                },
                {
                    value: "妙生活果园（北新泾店）",
                    address: "长宁区新渔路144号"
                },
                { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
                {
                    value: "凡仔汉堡（老真北路店）",
                    address: "上海市普陀区老真北路160号"
                },
                {
                    value: "港式小铺",
                    address: "上海市长宁区金钟路968号15楼15-105室"
                },
                { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
                {
                    value: "北京饺子馆",
                    address: "长宁区北新泾街道天山西路490-1号"
                },
                {
                    value: "饭典*新简餐（凌空SOHO店）",
                    address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
                },
                {
                    value: "焦耳·川式快餐（金钟路店）",
                    address: "上海市金钟路633号地下一层甲部"
                },
                { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
                { value: "浏阳蒸菜", address: "天山西路430号" },
                {
                    value: "四海游龙（天山西路店）",
                    address: "上海市长宁区天山西路"
                },
                {
                    value: "樱花食堂（凌空店）",
                    address: "上海市长宁区金钟路968号15楼15-105室"
                },
                {
                    value: "壹分米客家传统调制米粉(天山店)",
                    address: "天山西路428号"
                },
                {
                    value: "福荣祥烧腊（平溪路店）",
                    address: "上海市长宁区协和路福泉路255弄57-73号"
                },
                {
                    value: "速记黄焖鸡米饭",
                    address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
                },
                { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
                {
                    value: "(小杨生煎)西郊百联餐厅",
                    address: "长宁区仙霞西路88号百联2楼"
                },
                { value: "阳阳麻辣烫", address: "天山西路389号" },
                {
                    value: "南拳妈妈龙虾盖浇饭",
                    address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
                }
            ];
        },
        handleSelect(item) {
            console.log(item);
        }
    },
    mounted() {
        this.restaurants = this.loadAll();
    }
};
</script>

<style lang="sass" scoped>
.home
	display: flex
	flex-direction: column
	&>.header
		height: 115px
		border-bottom: 1px solid #e5ebe4
		display: flex
		flex-direction: column
		justify-content: flex-start
		margin-bottom: 40px
		&>.header-up
			height: 75px
			justify-content: center
			display: flex
			border-bottom: 1px solid #e5ebe4
			display: flex
			align-items: center
			&>.header-left
				width: 145px
				height: 56px
				color: #27a
				text-decoration: none
				font-size: 25px
				line-height: 56px
			&>.header-container
				width: 520px
				height: 56px
				display: flex
				align-items: center
				&>.header-input
					width: 94%
					border: 0
					outline: none
					border: none
					box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px
					::v-deep .el-input input
						height: 30px
				&>.header-container-right
					width: 6%
					height: 30px
					background-color: #666

		&>.header-bottom
			flex: 1
			&>.header-ul
				width: 100%
				height: 100%
				display: flex
				justify-content: center
				&>.header-li
					padding-left: 40px
					line-height: 39px
	&>.container
		display: flex
		flex-direction: column
		&>.container-top
			text-align: center
			margin-bottom: 40px
		&>.container-bottom
			// width:900px
			// background-color: pink
			&>.container-ul
				width: 100%
				display: flex
				flex-wrap: wrap
				&>.container-li
					width: 33.3333%
					height: 300px
					padding-left: 40px
					padding-top: 30px
</style>
