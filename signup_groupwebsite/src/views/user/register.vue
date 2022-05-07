<template>
  <el-form :model="ruleForm" class="form1" ref="ruleForm" :rules="rules">
    <ul>
      <li class="star" v-for="item in starCount" :key="item.id"
      :style="{top:item.top+'px',left:item.left+'px',animationDelay:item.delay+'s'}"
      ></li>
    </ul>
    <div class="zhuce">
      <div style="width: 100%"><h2>天津理工大学计算机科学与工程学院</h2></div>
      <div style="width: 100%"><h2>学生组织报名系统</h2></div>
      <div style="width: 40%">
        <h3>个人信息</h3>
        <el-form-item prop="id">
          <el-input
            v-model="ruleForm.id"
            suffix-icon="el-icon-school"
            placeholder="请输入学号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            v-model="ruleForm.name"
            suffix-icon="el-icon-user-solid"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="qq">
          <el-input
            v-model="ruleForm.qq"
            suffix-icon="el-icon-chat-line-round"
            placeholder="请输入QQ"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            v-model="ruleForm.phone"
            suffix-icon="el-icon-phone"
            placeholder="电话"
          ></el-input>
        </el-form-item>
        <h3>专业与班级</h3>
        <el-form-item prop="valueMessage">
          <el-cascader
            v-model="ruleForm.valueMessage"
            :options="majorData"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        
      </div>
      <div style="width: 40%">
        <h3>第一志愿</h3>
        <el-form-item prop="wish1">
          <el-cascader
            v-model="ruleForm.wish1"
            :options="orginazationData"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="textarea1">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入加入组织的理由"
            v-model="ruleForm.textarea1"
          >
          </el-input>
        </el-form-item>
        <h3>第二志愿</h3>
        <el-form-item prop="wish2">
          <el-cascader
            v-model="ruleForm.wish2"
            :options="orginazationData"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="textarea2">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入加入组织的理由"
            v-model="ruleForm.textarea2"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="isTrue">
          <h3 class="sp">是否调剂</h3>
          <el-switch
            v-model="ruleForm.isTrue"
            active-color="#409EFF"
            inactive-color="#909399"
            style="margin-top: -50px"
          >
          </el-switch>
        </el-form-item>
      </div>
      <div>
        <el-form-item class="btn">
          <el-button type="primary" size="medium" @click="submit"
            >提交信息</el-button
          >
          <el-button type="info" size="medium" @click="allClear('ruleForm')"
            >全部重置</el-button
          >
          <el-button type="warning" @click="toLogin">后台登陆</el-button>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        id: "",
        qq: "",
        phone: "",
        valueMessage: [],
        wish1: [],
        wish2: [],
        textarea1: "",
        textarea2: "",
        isTrue: false,
      },
      majorData: [
        {
          value: "计算机科学与技术",
          label: "计算机科学与技术",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
            {
              value: "三班",
              label: "三班",
            },
            {
              value: "四班",
              label: "四班",
            },
          ],
        },
        {
          value: "信息安全",
          label: "信息安全",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
            {
              value: "三班",
              label: "三班",
            },
            {
              value: "四班",
              label: "四班",
            },
          ],
        },
        {
          value: "物联网",
          label: "物联网",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
          ],
        },
        {
          value: "数据科学与大数据技术",
          label: "数据科学与大数据技术",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
          ],
        },
        {
          value: "计算机科学与技术(中外合作)",
          label: "计算机科学与技术(中外合作)",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
            {
              value: "三班",
              label: "三班",
            },
            {
              value: "四班",
              label: "四班",
            },
            {
              value: "五班",
              label: "五班",
            },
            {
              value: "六班",
              label: "六班",
            },
          ],
        },
      ],
      orginazationData: [
        {
          value: "科技协会",
          label: "科技协会",
          children: [
            {
              value: "科技协会",
              label: "科技协会",
            },
          ],
        },
        {
          value: "团委",
          label: "团委",
          children: [
            {
              value: "组织部",
              label: "组织部",
            },
            {
              value: "宣传部",
              label: "宣传部",
            },
            {
              value: "心协",
              label: "心协",
            },
            {
              value: "青协",
              label: "青协",
            },
          ],
        },
        {
          value: "学生会",
          label: "学生会",
          children: [
            {
              value: "办公室",
              label: "办公室",
            },
            {
              value: "学习部",
              label: "学习部",
            },
            {
              value: "宣传部",
              label: "宣传部",
            },
            {
              value: "文艺部",
              label: "文艺部",
            },
            {
              value: "体育部",
              label: "体育部",
            },
            {
              value: "外联部",
              label: "外联部",
            },
            {
              value: "自管会",
              label: "自管会",
            },
          ],
        },
        {
          value: "勤工助学中心",
          label: "勤工助学中心",
          children: [
            {
              value: "管理部",
              label: "管理部",
            },
            {
              value: "活动部",
              label: "活动部",
            },
            {
              value: "助贷部",
              label: "助贷部",
            },
            {
              value: "外联部",
              label: "外联部",
            },
          ],
        },
        {
          value: "新闻中心",
          label: "新闻中心",
          children: [
            {
              value: "摄影协会",
              label: "摄影协会",
            },
            {
              value: "新媒体部",
              label: "新媒体部",
            },
            {
              value: "记者团",
              label: "记者团",
            },
          ],
        },
      ],
      //验证规则
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^\d{11}$/,
            message: "手机号必须是11位纯数字",
            trigger: "blur",
          },
        ],
        id: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { pattern: /^[0-9]*$/, message: "学号必须是纯数字", trigger: "blur" },
        ],
        qq: [
          { required: true, message: "请输入QQ", trigger: "blur" },
          { pattern: /^[0-9]*$/, message: "QQ必须是纯数字", trigger: "blur" },
        ],
        valueMessage: [
          { required: true, message: "专业与班级不能为空", trigger: "blur" },
        ],
        wish1: [
          { required: true, message: "第一志愿不能为空", trigger: "blur" },
        ],
        wish2: [
          { required: true, message: "第二志愿不能为空", trigger: "blur" },
        ],
      },
      starCount: [],
    };
  },
  methods: {
    //重置所有表单内容
    allClear(formName) {
      this.$refs[formName].resetFields();
    },
    submit() {
      if (confirm("是否确认提交")) {
        //提交前验证表单是否符合要求
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            //满足要求打包信息
            this.packMessage();
          } else {
            this.$message.error("输入内容有误");
          }
        });
      }
    },
    packMessage() {
      let firstWill = {
        organization: this.ruleForm.wish1[0], //组织名 必填
        branch: this.ruleForm.wish1[1], //下属部⻔ 必填
        reason: this.ruleForm.textarea1, //加⼊该组织的原因
      };
      let secondWill = {
        organization: this.ruleForm.wish2[0], //组织名 必填
        branch: this.ruleForm.wish2[1], //下属部⻔ 必填
        reason: this.ruleForm.textarea2, //加⼊该组织的原因
      };
      let isDispensing = this.ruleForm.isTrue;
      let studentObj = {
        stdId: this.ruleForm.id, //学号 必填 重复学号会覆盖之前的信息
        stdName: this.ruleForm.name, //姓名 必填 ,
        major: this.ruleForm.valueMessage[0], //专业 必填
        classNum: this.ruleForm.valueMessage[1], //班级 必填
        stdQQ: this.ruleForm.qq, //学⽣qq 必填
        stdPhone: this.ruleForm.phone, //学⽣⼿机号 必填
        firstWill,
        secondWill,
        isDispensing,
      };
      //发送请求
      this.sendMessage(studentObj);
    },
    sendMessage(studentObj) {
      axios({
        method: "post",
        baseURL: "http://47.94.90.140:8000/",
        url: "post",
        data: studentObj,
      })
        .then((val) => {
          if (val.data.code == "0000") {
            this.$message.success("注册成功");
          } else {
            this.$message.error(val.data.message);
          }
        })
        .catch((err) => {
          this.$message.error("注册失败");
          console.log(err);
        });
    },
    toLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    setStarCount() {
      //生成星星的方法
      for (let i = 0; i < 30; i++) {
        // i < 星星个数
        let star = {}; //定义存储一个星星的对象
        let top = parseInt(Math.random() * 1000); //定义星星的top值
        let left = parseInt(Math.random() * 1500); //定义星星的left值
        let delay = parseInt(Math.random() * 5); //定义星星的动画延迟时间
        star.id = i;
        star.top = top;
        star.left = left;
        star.delay = delay;
        this.starCount.push(star);
      }
    },
  },
  created() {
    this.setStarCount();
  },
  mounted() {
    document.getElementsByTagName("body")[0].className = "body-class";
  },
  destroyed() {
    document.body.removeAttribute("class", "body-class");
  },
};
</script>

<style >

.body-class {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  overflow: hidden;
  background-color: #000;
}
.form1 {
  width: 80%;
  background: #fff;
  position: absolute;
  /* top: 50%; */
  /* margin-top: -200px; */
  left: 50%;
  /* margin-left: -200px; */
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  text-align: center;
  /* width: 70%; */
  /* 居中 */
  /* text-align: center;
  padding: 5px 10px;
  box-sizing: border-box; */
  opacity: 0.6;
  /* width: 400px;
    margin: 0 auto;
    text-align: center; */
    transform: (-50%,-50%);
}
.sp {
  margin-top: -10px;
}
.btn {
  margin-top: -35px;
}
h2 {
  font-size: 20px;
}
h3 {
  font-size: 16px;
}
.star {
  width: 0;
  height: 0;
  position: relative;
  opacity: 0;
  animation: star-fall 3s linear infinite;
  z-index: -1;
}
.star::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 3px solid transparent;
  border-left-width: 200px;
  border-left-color: rgba(255, 255, 255, 0.7);
  transform: rotate(-45deg) translate3d(1px, 3px, 0);
  transform-origin: 0% 100%;
}
@keyframes star-fall {
  0% {
    opacity: 0;
    transform: scale(0.5) translate3d(0, 0, 0);
    /* 兼容一些浏览器 */
    -webkit-transform: scale(0.5) translate3d(0, 0, 0);
    -moz-transform: scale(0.5) translate3d(0, 0, 0);
  }
  50% {
    opacity: 1;
    transform: translate3d(-200px, 200px, 0);
    -webkit-transform: translate3d(-200px, 200px, 0);
    -moz-transform: translate3d(-200px, 200px, 0);
  }
  100% {
    opacity: 0;
    transform: scale(1.2) translate3d(-300px, 300px, 0);
    -webkit-transform: scale(1.2) translate3d(-300px, 300px, 0);
    -moz-transform: scale(1.2) translate3d(-300px, 300px, 0);
  }
}
.zhuce {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.zhuce .baoti {
  width: 100%;
}
</style>