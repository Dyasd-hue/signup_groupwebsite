<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="spspan">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索栏 -->
    <el-card>
      <el-row>
        <el-col :span="10">
          <el-input
            placeholder="可根据关键字对姓名进行模糊搜索"
            v-model="key"
            clearable
            @clear="clearSearch"
            @keyup.enter.native="searchStudent"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchStudent"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 学生数据展示 -->
      <el-table :data="studentList" stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="学号" prop="stdId" sortable></el-table-column>
        <el-table-column label="姓名" prop="stdName"></el-table-column>
        <el-table-column label="专业" prop="major"></el-table-column>
        <el-table-column label="班级" prop="classNum"></el-table-column>
        <el-table-column label="QQ" prop="stdQQ"></el-table-column>
        <el-table-column label="电话" prop="stdPhone"></el-table-column>
        <el-table-column
          label="第一志愿"
          prop="firstWill.organization"
        ></el-table-column>
        <el-table-column label="部门" prop="firstWill.branch"></el-table-column>
        <el-table-column label="原因" prop="firstWill.reason"></el-table-column>
        <el-table-column
          label="第二志愿"
          prop="secondWill.organization"
        ></el-table-column>
        <el-table-column
          label="部门"
          prop="secondWill.branch"
        ></el-table-column>
        <el-table-column
          label="原因"
          prop="secondWill.reason"
        ></el-table-column>
        <el-table-column
          label="是否调剂"
          prop="isDispensing"
          :formatter="stateFormat"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="
                sendId(scope.row.stdId);
                showEditVisible();
              "
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="sendInfo.page"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="sendInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 修改信息框 -->
    <el-dialog title="修改信息" :visible.sync="editVisible" width="70%" class="form">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item prop="id">
          <el-input
            v-model="ruleForm.id"
            suffix-icon="el-icon-school"
            placeholder="请输入学号"
            disabled
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
        <el-form-item prop="isTrue" class="switch">
          <h3 style="text-align: center">是否调剂</h3>
          <el-switch
            v-model="ruleForm.isTrue"
            active-color="#409EFF"
            inactive-color="#909399"
            style="margin-top: -50px"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            editVisible = false;
            editUpdata();
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      sendInfo: {
        token: window.sessionStorage.getItem("token"),
        page: 1, //第⼏⻚,不传默认为1
        pageSize: 5, //每⻚数据的数量
      },
      studentList: [],
      total: 0,
      key: "",
      editVisible: false,
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
      //获得全部学生数据 搜索使用
      // allStudentList: [],
    };
  },
  methods: {
    getList() {
      axios({
        method: "post",
        baseURL: "http://47.94.90.140:8000/",
        url:
          "/getAllStuInfo?page=" +
          this.sendInfo.page +
          "&pageSize=" +
          this.sendInfo.pageSize,
        data: this.sendInfo,
      })
        .then((val) => {
          if (val.data.code == "0000") {
            this.studentList = val.data.data.students;
            this.total = val.data.data.total;
          } else {
            this.$message.error(val.data.message);
          }
        })
        .catch((err) => {
          this.$message.error("请求失败");
          console.log(err);
        });
    },
    handleSizeChange(newSize) {
      this.sendInfo.pageSize = newSize;
      if (this.key != "") {
        this.searchStudent();
      } else {
        this.getList();
      }
    },
    handleCurrentChange(newPage) {
      this.sendInfo.page = newPage;
      if (this.key != "") {
        this.searchStudent();
      } else {
        this.getList();
      }
    },
    //根据关键字进行模糊搜索
    // search(key) {
    //   if (this.key === "") {
    //     this.getList();
    //   } else {
    //     this.studentList = this.allStudentList.filter((p) => {
    //       return p.stdName.indexOf(key) !== -1;
    //     });
    //   }
    // },
    showEditVisible() {
      this.editVisible = true;
    },
    sendId(id) {
      let arr = this.studentList.filter((p) => {
        return p.stdId === id;
      });
      //一开始没有按文档格式写的 现在赋值有亿点麻烦
      this.ruleForm.id = id;
      this.ruleForm.name = arr[0].stdName;
      this.ruleForm.valueMessage[0] = arr[0].major;
      this.ruleForm.valueMessage[1] = arr[0].classNum;
      this.ruleForm.qq = arr[0].stdQQ;
      this.ruleForm.phone = arr[0].stdPhone;
      this.ruleForm.wish1[0] = arr[0].firstWill.organization;
      this.ruleForm.wish1[1] = arr[0].firstWill.branch;
      this.ruleForm.textarea1 = arr[0].firstWill.reason;
      this.ruleForm.wish2[0] = arr[0].secondWill.organization;
      this.ruleForm.wish2[1] = arr[0].secondWill.branch;
      this.ruleForm.textarea2 = arr[0].secondWill.reason;
      this.ruleForm.isTrue = arr[0].isDispensing;
    },
    editUpdata() {
      //因为一开始没看文档。。 打包数据
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
    //更新数据
    sendMessage(studentObj) {
      axios({
        method: "post",
        baseURL: "http://47.94.90.140:8000/",
        url: "post",
        data: studentObj,
      })
        .then((val) => {
          if (val.data.code == "0000") {
            if (this.key != "") {
              this.searchStudent();
            } else {
              this.getList();
            }
            this.$message.success("更新数据成功");
          }
        })
        .catch((err) => {
          this.$message.error("更新数据失败");
          console.log(err);
        });
    },
    // getAllStudentList() {
    //   axios({
    //     method: "post",
    //     baseURL: "http://47.94.90.140:8000/",
    //     url: "/getAllStuInfo?page=1&pageSize=" + this.total,
    //     data: {
    //       token: window.sessionStorage.getItem("token"),
    //       page: 1, //第⼏⻚,不传默认为1
    //       pageSize: this.total, //每⻚数据的数量
    //     },
    //   })
    //     .then((val) => {
    //       if (val.data.code == "0000") {
    //         this.allStudentList = val.data.data.students;
    //         console.log(this.al);
    //       } else {
    //         this.$message.error(val.data.message);
    //       }
    //     })
    //     .catch((err) => {
    //       this.$message.error("请求失败");
    //       console.log(err);
    //     });
    // },
    // getAllStudent() {
    //   //获得焦点时 获取全部学生列表 提供搜索
    //   this.getAllStudentList();
    // },
    stateFormat(row) {
      if (row.isDispensing) {
        return "是";
      } else {
        return "否";
      }
    },
    searchStudent() {
      axios({
        method: "post",
        baseURL: "http://47.94.90.140:8000/",
        url:
          "/getStuInfo?page=" +
          this.sendInfo.page +
          "&pageSize=" +
          this.sendInfo.pageSize,
        data: {
          token: window.sessionStorage.getItem("token"),
          keyWord: this.key,
        },
      })
        .then((val) => {
          if (val.data.code == "0000") {
            this.studentList = val.data.data.students;
            this.total = val.data.data.total;
          } else {
            this.$message.error(val.data.message);
          }
        })
        .catch((err) => {
          this.$message.error("搜素失败");
          console.log(err);
        });
    },
    clearSearch() {
      this.sendInfo.page = 1;
      this.sendInfo.pageSize = 5;
      this.getList();
    },
  },
  watch: {
    //当搜索框清空时还原列表
    key() {
      if (this.key === "") {
        this.getList();
      }
    },
    ruleForm() {},
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.spspan .el-breadcrumb span {
  font-size: 14px;
}
.el-card {
  box-shadow: 0 1px 1px rgb(0, 0, 0.15) !important;
}
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
}
.switch {
  text-align: center;
  margin: 0 auto;
}
.form {
  text-align: center;
}
</style>