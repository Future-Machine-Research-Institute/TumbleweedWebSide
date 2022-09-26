<template>
    <el-page-header class = "head" title="返回" content="用户管理" @back="goBack" >
        <template #icon>
            <el-icon><arrow-left /></el-icon>
        </template>
    </el-page-header>
    <el-divider class = "divider" />

    <el-dialog v-model="addUserDialogFormVisible" title="添加用户" width="70%" >
        <el-form ref = "addUserForm" :model="addUserForm" :rules = "addUserFormRules">
            <el-form-item label="账号" prop="account">
                <el-input v-model="addUserForm.account"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addUserForm.password" show-password/>
            </el-form-item>
            <el-form-item label="权限" prop="permission">
                <el-select v-model="addUserForm.permission" placeholder="选择">
                    <el-option label="管理员" :value="0" />
                    <el-option label="测试" :value="1" />
                    <el-option label="体验" :value="2" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span>
                <el-button @click="addUserDialogFormVisible = false">取消</el-button>
                <el-button @click="addUser">添加</el-button>
            </span>
        </template>
    </el-dialog>

    <el-table class="user-table" :data="userListDataArray" max-height="calc(100vh - 400px)" :row-style="{height: '60px'}">
        <el-table-column type="selection" align = "center" />
        <el-table-column fixed prop="avatar" label="头像" align = "center">
            <template #default="scope">
                <el-image style="width: 60px; height: 60px; margin: 0 auto;" :src="scope.row.appIcon"
                    :preview-src-list="[scope.row.appIcon]" :preview-teleported="true" />
            </template>
        </el-table-column>
        <el-table-column prop="account" label="账号" align = "center"/>
        <el-table-column prop="name" label="用户名" align = "center"/>
        <el-table-column prop="permission" label="权限" align = "center">
            <template #default="scope">
                <span>{{ getPermission(scope.row.permission) }}</span>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operations" align="center">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="updatePermission(scope.row)">更新权限</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-input class="search-input" type="text" v-model="inputSearchString" placeholder="请输入用户账号或用户名">
      <template #append>
        <el-button @click="searchUserList">
          <el-icon>
            <Search />
          </el-icon>
        </el-button>
      </template>
    </el-input>


    <el-button class="add-button" @click="addUserDialogFormVisible = true">添加用户</el-button>
    <el-button class="delete-button" @click="deleteUser">删除用户</el-button>

</template>

<script>
    import { ArrowLeft, Search } from '@element-plus/icons-vue'
    export default {
        components: {
            ArrowLeft,
            Search
        },
        data() {
            return {
                addUserDialogFormVisible: false,
                addUserForm: {
                    account: "",
                    password: "",
                    permission: null
                },
                inputSearchString: "",
                userListDataArray:[
                    {
                        "avatar": null,
                        "account": "17826805863",
                        "name": "Root",
                        "permission": 0
                    },
                    {
                        "avatar": null,
                        "account": "17826805863",
                        "name": "Root",
                        "permission": 1
                    },
                    {
                        "avatar": null,
                        "account": "17826805863",
                        "name": "Root",
                        "permission": 2
                    },
                    {
                        "avatar": null,
                        "account": "17826805863",
                        "name": "Root",
                        "permission": 2
                    }
                ]
            }
        },
        computed: {
            addUserFormRules() {
                return {
                    account: [
                        {
                            required: true,
                            message: "账号不能为空"
                        },
                        {
                            pattern: /^1[3456789]\d{9}$/,
                            message: "请输入正确的手机号"
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: "密码不能为空"
                        },
                        {
                            pattern: /^[^@#!*$^%& ]{8,20}$/,
                            message: "密码长度必须在8-20位以内, 且不能包含特殊字符和空格号"
                        }
                    ],
                    permission: [
                        {
                            required: true,
                            message: "权限未选择"
                        }
                    ]
                }
            }
        },
        //方法
        methods: {
            goBack() {
                this.$router.back()
            },
            addUser() {
                this.$refs.addUserForm.validate(async (isok) => {
                    if(isok) {
                        console.log("添加用户")
                    }
                })
            },
            deleteUser() {

            },
            getPermission(permission) {
                switch (permission) {
                    case 0:
                        return "管理员"
                    case 1:
                        return "测试"
                    case 2:
                        return "体验"
                    default:
                        return "体验"
                }
            }
        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
            
        },
        unmounted() {
          console.log("UserManagement -- delloc")
        }
    }
</script>

<style scoped>
/* @import url(); 引入css类 */

.head {
    height: 64px;
    /* background-color: white; */
    align-items: center;
}

.divider {
    margin: 0px;
}

.user-table {
    width: 90vw;
    margin: 0 auto;
    border-radius: 10px;
    position: absolute;
    top: 80px;
    left: 5vw;
}

.search-input {
  width: 90vw;
  position: absolute;
  top: calc(100vh - 280px);
  left: 5vw;
}

.search-input :deep(.el-input__inner) {
    height: 40px;
}

.add-button {
  width: 40vw;
  height: 40px;
  position: absolute;
  top: calc(100vh - 200px);
  left: 5vw;
  color: white;
  background-color: #409EFF;
}

.delete-button {
  width: 40vw;
  height: 40px;
  position: absolute;
  margin: 0px;
  top: calc(100vh - 200px);
  left: 55vw;
  color: white;
  background-color: #F56C6C;
}

</style>