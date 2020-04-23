<template lang="pug">
.show-movie
    .container-left(@click="sayHi")
        img(:src="movieData.image_url", alt="alt" class="movie-pic")
    .container-right
        //- el-tooltip(class="movieData" effect="dark" :disabled="!tooltipObj.top" :content="movieData.name" placement="top-start")
        .container-right-top(ref="top" @click="sayHi") {{ movieData.name }}
        //- el-tooltip(class="movieData" effect="dark" :disabled="!tooltipObj.middle" :content="`导演: ${movieData.direct}   主演: ${movieData.performer }`" placement="top-start")
        .container-right-middle(ref="middle") {{ `导演: ${movieData.direct}   主演: ${movieData.performer }` }}
        //- el-tooltip(class="movieData" effect="dark" :disabled="!tooltipObj.time" :content="`${movieData.time} / ${movieData.type}`" placement="top-start")
        .container-right-time(ref="time") {{ `${movieData.time} / ${movieData.type}` }}
        .container-right-score(ref="score") 
            template(v-for="item in getStarNum")
                .star
            span {{ movieData.score }}分
        el-tooltip(class="movieData" effect="dark" :disabled="!tooltipObj.cinecism" :content="movieData.cinecism" placement="top-start")
            .container-right-cinecism(ref="cinecism")
                span {{ movieData.cinecism }}
</template>
<script>
import _ from "lodash";
export default {
    name: "show-movie",
    components: {},
    props: {
        movieData: Object
    },
    data() {
        return {
            starNum: 0,
            tooltipObj: {
                top: false,
                middle: false,
                time: false,
                cinecism: false
            }
        };
    },
    computed: {
        getStarNum() {
            const { score } = _.get(this, "movieData", []);
            return parseInt(score / 2);
        }
    },
    methods: {
        sayHi() {
            alert(1);
        },
        setTooltip() {
            this.tooltipObj.top = this.$refs["top"].offsetHeight > 20;
            this.tooltipObj.middle = this.$refs["middle"].offsetHeight > 20;
            this.tooltipObj.time = this.$refs["time"].offsetHeight > 20;
            this.tooltipObj.cinecism = this.$refs["cinecism"].offsetHeight > 20;
        }
    },
    mounted() {
        this.setTooltip();
    }
};
</script>

<style lang="sass" scoped>
.show-movie
    width: 100%
    height: 100%
    display: flex
    &>.container-left
        cursor: pointer
        width: 20%
        height: 60%
        background-color: green
        margin-right: 20px
        background-color: green
        .movie-pic
            width: 100%
            height: 100%
    &>.container-right
        flex: 1
        .container-right-top
            cursor: pointer
            margin-bottom: 10px
        .container-right-middle
            margin-bottom: 10px
        .container-right-score
            height: 30px
            display: flex
            line-height: 30px
            margin-bottom: 10px
            .star
                background: url(http://demo.htmleaf.com/1511/201511131551/images/web_heart_animation.png)
                background-position: right
                background-repeat: no-repeat
                height: 100%
                width: 30px
                cursor: pointer
                // transform: scale(0.6)
                background-size: 4500%
                &:nth-last-child(1)
        .container-right-cinecism
</style>
