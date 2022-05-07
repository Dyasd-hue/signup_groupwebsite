<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div class="nd">
        <img src="../../assets/logo.png" alt="" />
        <span style="font-size: 20px">学生组织报名管理系统</span>
      </div>
      <el-button type="info" @click="exit">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isHide">
        <!-- <div class="icon">
        <i class="el-icon-menu" :style="{'font-size':'30px','margin-left':'60px','color':'rgb(159, 161, 163)'}"></i>
      </div> -->
        <el-tooltip
          class="item"
          effect="light"
          content="展开/收起侧边栏"
          placement="right"
        >
         <div class="toggle-button" @click="collapse">|||</div> 
        </el-tooltip>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span @click="toStudemtInfo">学生信息</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //是否折叠侧脸栏
      isCollapse: false,
    };
  },
  methods: {
    //折叠侧脸栏
    collapse() {
      this.isCollapse = !this.isCollapse;
    },
    toStudemtInfo() {
      this.$router.push({
        path: "/student",
      });
    },
    exit() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
  computed: {
    isHide() {
      return this.isCollapse ? "70px" : "200px";
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 100vh;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  color: #fff;
  font-size: 30px;
}
.el-aside {
  background-color: #333744;
  width: 100%;
}
.el-aside .el-menu {
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
img {
  width: 60px;
  height: 60px;
}
.nd span {
  position: absolute;
  top: 18px;
  margin-left: 20px;
  font-size: 30px;
}
.home-container span {
  font-size: 14px;
}
.icon {
  margin-top: 20px;
  margin-bottom: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>