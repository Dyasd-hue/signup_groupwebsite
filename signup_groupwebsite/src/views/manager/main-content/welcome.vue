<template>
  <div class="content">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="daohang">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="head">
      现在是: {{ dateYear }} {{ dateWeek }} {{ dateDay }}
      <span>欢迎使用学生组织报名管理系统!!</span>
    </div>
    <div class="chartAll">
      <div ref="chart1" class="chart1"></div>
      <div ref="chart2" class="chart2"></div>
    </div>
  </div>
</template>
 
<script>
import axios from "axios";
export default {
  data() {
    return {
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      timer: null,
      kx: 0,
      tw: 0,
      xsh: 0,
      qgjx: 0,
      xinwen: 0,
      kx1: 0,
      tw1: 0,
      xsh1: 0,
      qgjx1: 0,
      xinwen1: 0,
    };
  },
  methods: {
    getEchart1() {
      const chart1 = this.$refs.chart1;
      if (chart1) {
        const myChart1 = this.$echarts.init(chart1);
        const option = {
          title: {
            text: "学生组织报名情况",
            subtext: "第一志愿",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: [
                { value: this.kx, name: "科技协会" },
                { value: this.tw, name: "团委" },
                { value: this.xsh, name: "学生会" },
                { value: this.qgjx, name: "勤工助学中心" },
                { value: this.xinwen, name: "新闻中心" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        myChart1.setOption(option);
        window.addEventListener("resize", function () {
          myChart1.resize();
        });
      }
    },
    getList() {
      axios({
        method: "post",
        baseURL: "http://47.94.90.140:8000/",
        url: "/getAllStuInfo?page=1&pageSize=1000",
        data: { token: window.sessionStorage.getItem("token") },
      })
        .then((val) => {
          if (val.data.code == "0000") {
            this.getFirstBranch(val.data.data.students);
            this.getSecondBranch(val.data.data.students);
          } else {
            this.$message.error(val.data.message);
          }
        })
        .catch((err) => {
          this.$message.error("请求失败");
          console.log(err);
        });
    },
    getFirstBranch(studentList) {
      studentList.forEach((p) => {
        if (p.firstWill.organization === "科技协会") this.kx++;
        if (p.firstWill.organization === "团委") this.tw++;
        if (p.firstWill.organization === "学生会") this.xsh++;
        if (p.firstWill.organization === "勤工助学中心") this.qgjx++;
        if (p.firstWill.organization === "新闻中心") this.xinwen++;
      });
      this.getEchart1();
    },
    getSecondBranch(studentList) {
      studentList.forEach((p) => {
        if (p.secondWill.organization === "科技协会") this.kx1++;
        if (p.secondWill.organization === "团委") this.tw1++;
        if (p.secondWill.organization === "学生会") this.xsh1++;
        if (p.secondWill.organization === "勤工助学中心") this.qgjx1++;
        if (p.secondWill.organization === "新闻中心") this.xinwen1++;
      });
      this.getEchart2();
    },
    getEchart2() {
      const chart2 = this.$refs.chart2;
      if (chart2) {
        const myChart2 = this.$echarts.init(chart2);
        const option = {
          title: {
            text: "学生组织报名情况",
            subtext: "第二志愿",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: [
                { value: this.kx1, name: "科技协会" },
                { value: this.tw1, name: "团委" },
                { value: this.xsh1, name: "学生会" },
                { value: this.qgjx1, name: "勤工助学中心" },
                { value: this.xinwen1, name: "新闻中心" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        myChart2.setOption(option);
        window.addEventListener("resize", function () {
          myChart2.resize();
        });
      }
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      const date = this.$dayjs(new Date());
      this.dateDay = date.format("HH:mm:ss");
      this.dateYear = date.format("YYYY-MM-DD");
      this.dateWeek = date.format(this.weekday[date.day()]);
    }, 0);
    this.getList();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>
<style scoped>
.content {
  font-size: 20px;
}
.content span {
  font-size: 20px;
  margin-left: 20px;
}
.daohang {
  margin-bottom: 15px;
}
.daohang span {
  margin-left: 0;
}
.head {
  margin-bottom: 100px;
}
.chartAll {
  width: 1232px;
}
.chart1 {
  float: left;
  width: 450px;
  height: 450px;
  margin-left: 100px;
}
.chart2 {
  float: right;
  width: 450px;
  height: 450px;
  margin-left: 100px;
  margin-right: 100px;
}
</style>