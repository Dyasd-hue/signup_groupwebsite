<template>
  <el-form  class="form" :model="User" ref="User" :rules="rules">
        <p>Login</p>
        <el-form-item prop="username">
            <el-input :placeholder="placeholder1"  v-model="User.username" @focus="focusEvent(1)" @blur="blurEvent(1)"></el-input>
        </el-form-item>
        <!-- <input type="text" placeholder="Usename" class="name"><br> -->
        <!-- <div class="password">
            <input type="password" placeholder="Password" id="psd" class="pass">
        </div> -->
        <el-form-item class="password" prop="password">
            <el-input :placeholder="placeholder2"  show-password  v-model="User.password" @focus="focusEvent(2)" @blur="blurEvent(2)"></el-input>
        </el-form-item>
        <br>
        <a href="#" class="register" @click="allClear">
            <span></span>
            <span></span>
            <span></span> 重置
        </a>
        <a href="#" class="login" @click="login">
            <span></span>
            <span></span>
            <span></span>
            <span></span> 登录
        </a>
    </el-form>
</template>

<script >
import axios from 'axios'
export default {
    data() {
        return {
            User: {
                username:'',
                password:''
            },
            rules:{
                username:[
                    {required:true,message:'用户名不能为空',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'密码不能为空',trigger:'blur'}
                ]
            },
            placeholder1:'Usename',
            placeholder2:'Password'
        }
    },
    methods: {
        //获取焦点placeholder消失
        focusEvent(val) {
            if(val == 1) {
                this.placeholder1 = ''
            }
            if(val == 2) {
                this.placeholder2 = ''
            }
        },
        blurEvent(val) {
            if(val == 1) {
                this.placeholder1 = 'Usename'
            }
            if(val == 2) {
                this.placeholder2 = 'passWord'
            }
        },
        login(){
            this.$refs.User.validate((valid)=>{
            if(valid) {
            //满足要求打包信息
            this.send()
            } else {
            this.$message.error('输入内容有误')
            }
            })
        },
        //发送请求
        send() {
            axios({
            method:'post',
            baseURL: 'http://47.94.90.140:8000/',
            url: 'login',
            data:this.User
            })
            .then((val)=>{
                if(val.data.code == '0000') {
                this.$message.success('登录成功')
                window.sessionStorage.setItem('token',val.data.data.token)
                //延迟2s跳转
                setTimeout(() => {
                    this.$router.push({
                    path:'/home',
                 })
                }, 2000);
                } else {
                    this.$message.error(val.data.message)
                }
            })
            .catch((err)=>{
                this.$message.error('登录失败')
                console.log(err)
            })
        },
        //重置内容
        allClear() {
            this.$refs.User.resetFields();
        }
        

    },
    beforeCreate() {
    //修改背景颜色
    document.querySelector('body').setAttribute('style', 'background:rgb(73, 73, 73)')
    },
    beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
    }
}
</script>

<style scoped lang='scss'>


.form {
    position: absolute;
    top: 50%;
    margin-top: -200px;
    left: 50%;
    margin-left: -200px;
    width: 400px;
    height: 400px;
    /* 居中 */
    background-color: rgb(0, 0, 0);
    color: #fff;
    text-align: center;
    padding: 5px 40px;
    border-radius: 25px;
    box-sizing: border-box;
}



.password {
    position: relative;
}

p {
    font-size: 42px;
    font-weight: 600;
}

input {
    color: #fff;
    background-color: rgb(0, 0, 0);
    width: 100%;
    height: 48px;
    margin-bottom: 10px;
    border: none;
    border-bottom: 2px solid silver;
    outline: none;
    font-size: 22px;
}
.sp {
   border: none;
    border-bottom: 2px solid silver; 
}
a {
    border-radius: 13px;
    position: relative;
    display: inline-block;
    padding: 25px 30px;
    color: #03e9f4;
    font-size: 18px;
    text-decoration: none;
    letter-spacing: 4px;
    overflow: hidden;
    transition: 0.5s;
    margin: 0 25px;
    -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}

a:hover {
    background-color: #03e9f4;
    color: #050801;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 200px #03e9f4;
}

span {
    position: absolute;
    display: block;
}

span:nth-child(1) {
    width: 100%;
    height: 2px;
    top: 0;
    left: -100%;
    background: linear-gradient(to right, transparent, #03e9f4);
    animation: animate1 2s linear infinite;
    animation-delay: 0s;
}

@keyframes animate1 {
    0% {
        left: -100%;
    }
    50%,
    100% {
        left: 100%;
    }
}

span:nth-child(2) {
    width: 2px;
    height: 100%;
    top: -100%;
    right: 0;
    background: linear-gradient(to bottom, transparent, #03e9f4);
    animation: animate2 2s linear infinite;
    animation-delay: 0.25s;
}

@keyframes animate2 {
    0% {
        top: -100%;
    }
    50%,
    100% {
        top: 100%;
    }
}

span:nth-child(3) {
    width: 100%;
    height: 2px;
    bottom: 0;
    right: -100%;
    background: linear-gradient(to left, transparent, #03e9f4);
    animation: animate3 2s linear infinite;
    animation-delay: 0.5s;
}

@keyframes animate3 {
    0% {
        right: -100%;
    }
    50%,
    100% {
        right: 100%;
    }
}

span:nth-child(4) {
    width: 2px;
    height: 100%;
    bottom: -100%;
    left: 0;
    background: linear-gradient(to top, transparent, #03e9f4);
    animation: animate4 2s linear infinite;
    animation-delay: 0.75s;
}

@keyframes animate4 {
    0% {
        bottom: -100%;
    }
    50%,
    100% {
        bottom: 100%;
    }
}

.clearfix::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

/deep/.el-input__inner {
    border: none;
    border-bottom: 2px solid silver; 
    background-color: rgb(0, 0, 0);
    color: #fff;
    font-size: 22px;
    height: 48px;
}

</style>