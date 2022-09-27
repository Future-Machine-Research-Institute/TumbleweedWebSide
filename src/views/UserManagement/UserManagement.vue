<template>
    <el-page-header class = "head" :title="$t('userManagement.backButtonText')" :content="$t('userManagement.titleText')" @back="goBack" >
        <template #icon>
            <el-icon><arrow-left /></el-icon>
        </template>
    </el-page-header>
    <el-divider class = "divider" />

    <el-dialog v-model="addUserDialogFormVisible" :title="$t('userManagement.addUserDialogTitleText')" width="70%" >
        <el-form ref = "addUserForm" :model="addUserForm" :rules = "addUserFormRules" label-width="auto" label-position="left">
            <el-form-item :label="$t('userManagement.addUserDialogFormNameItemText')" prop="name">
                <el-input v-model="addUserForm.name"/>
            </el-form-item>
            <el-form-item :label="$t('userManagement.addUserDialogFormAccountItemText')" prop="account">
                <el-input v-model="addUserForm.account"/>
            </el-form-item>
            <el-form-item :label="$t('userManagement.addUserDialogFormPasswordItemText')" prop="password">
                <el-input v-model="addUserForm.password" show-password/>
            </el-form-item>
            <el-form-item :label="$t('userManagement.addUserDialogFormPermissionItemText')" prop="permission">
                <el-select v-model="addUserForm.permission" :placeholder="$t('userManagement.addUserDialogFormPermissionItemTipsText')">
                    <el-option :label="$t('userManagement.addUserDialogFormPermissionItemOption0Text')" :value="0" />
                    <el-option :label="$t('userManagement.addUserDialogFormPermissionItemOption1Text')" :value="1" />
                    <el-option :label="$t('userManagement.addUserDialogFormPermissionItemOption2Text')" :value="2" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span>
                <el-button @click="addUserDialogFormVisible = false">{{$t('userManagement.addUserDialogCancelButtonText')}}</el-button>
                <el-button @click="addUser">{{$t('userManagement.addUserDialogAddButtonText')}}</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="updatePermissionDialogFormVisible" :title="$t('userManagement.updatePermissionDialogTitleText')" width="70%" >
        <el-form ref = "updatePermissionForm" :model="updatePermissionForm" :rules = "updatePermissionFormRules" label-width="auto" label-position="left">
            <el-form-item :label="$t('userManagement.updatePermissionDialogFormAccountItemText')" prop="account">
                <el-input v-model="updatePermissionForm.account" disabled/>
            </el-form-item>
            <el-form-item :label="$t('userManagement.updatePermissionDialogFormPermissionItemText')" prop="permission">
                <el-select v-model="updatePermissionForm.permission" :placeholder="$t('userManagement.updatePermissionDialogFormPermissionItemTipsText')">
                    <el-option :label="$t('userManagement.updatePermissionDialogFormPermissionItemOption0Text')" :value="0" />
                    <el-option :label="$t('userManagement.updatePermissionDialogFormPermissionItemOption1Text')" :value="1" />
                    <el-option :label="$t('userManagement.updatePermissionDialogFormPermissionItemOption2Text')" :value="2" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span>
                <el-button @click="updatePermissionDialogFormVisible = false">{{$t('userManagement.updatePermissionDialogCancelButtonText')}}</el-button>
                <el-button @click="updatePermission">{{$t('userManagement.updatePermissionDialogUpdateButtonText')}}</el-button>
            </span>
        </template>
    </el-dialog>

    <el-table class="user-table" @selection-change="userListTableSelectionChange" ref="userListTable" :data="userListDataArray" max-height="calc(100vh - 400px)" :row-style="{height: '60px'}">
        <el-table-column type="selection" align = "center" />
        <el-table-column fixed prop="avatar" :label="$t('userManagement.userListTableAvatarColumnText')" align = "center">
            <template #default="scope">
                <el-image style="width: 60px; height: 60px; margin: 0 auto;" :src="scope.row.avatar"
                    :preview-src-list="[scope.row.avatar]" :preview-teleported="true" />
            </template>
        </el-table-column>
        <el-table-column prop="account" :label="$t('userManagement.userListTableAccountColumnText')" align = "center"/>
        <el-table-column prop="name" :label="$t('userManagement.userListTableNameColumnText')" align = "center"/>
        <el-table-column prop="permission" :label="$t('userManagement.userListTablePermissionColumnText')" align = "center">
            <template #default="scope">
                <span>{{ getPermission(scope.row.permission) }}</span>
            </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('userManagement.userListTableOperationsColumnText')" align="center">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="updatePermissionDialog(scope.row)">{{$t('userManagement.userListTableOperationsColumnUpdateButtonText')}}</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-input class="search-input" type="text" v-model="inputSearchString" :placeholder="$t('userManagement.searchInputTipsText')">
      <template #append>
        <el-button @click="searchUserList">
          <el-icon>
            <Search />
          </el-icon>
        </el-button>
      </template>
    </el-input>


    <el-button class="add-button" @click="addUserDialogFormVisible = true">{{$t('userManagement.addUserButtonText')}}</el-button>
    <el-button class="delete-button" @click="deleteUser">{{$t('userManagement.deleteUserButtonText')}}</el-button>

</template>

<script>
    import { ArrowLeft, Search } from '@element-plus/icons-vue'
    import NetApiShareInstance from '../../net/net-api'
    import { readAccount, readToken, md5HashSync } from '../../utils/utils'
    import { errorNotificationShow, successNotificationShow } from '../../utils/notification-view'
    import { errorMessageShow } from '../../utils/message-view'
    import { loadingViewShow, loadingViewDismiss } from '../../utils/loading-view'
    export default {
        components: {
            ArrowLeft,
            Search
        },
        data() {
            return {
                addUserDialogFormVisible: false,
                updatePermissionDialogFormVisible: false,
                addUserForm: {
                    name: "",
                    account: "",
                    password: "",
                    permission: null
                },
                updatePermissionForm: {
                    account: "",
                    permission: null
                },
                updatePermissionData: null,
                inputSearchString: "",
                userListDataArray: [],
                userListDataSelectionArray: []
            }
        },
        computed: {
            addUserFormRules() {
                return {
                    name: [
                        {
                            required: true,
                            message: this.$t('userManagement.addUserFormRulesNameMessage0Text')
                        },
                        {
                            pattern: /^[^@#!*$^%& ]{2,24}$/,
                            message: this.$t('userManagement.addUserFormRulesNameMessage1Text')
                        }
                    ],
                    account: [
                        {
                            required: true,
                            message: this.$t('userManagement.addUserFormRulesAccountMessage0Text')
                        },
                        {
                            pattern: /^1[3456789]\d{9}$/,
                            message: this.$t('userManagement.addUserFormRulesAccountMessage1Text')
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: this.$t('userManagement.addUserFormRulesPasswordMessage0Text')
                        },
                        {
                            pattern: /^[^@#!*$^%& ]{8,20}$/,
                            message: this.$t('userManagement.addUserFormRulesPasswordMessage1Text')
                        }
                    ],
                    permission: [
                        {
                            required: true,
                            message: this.$t('userManagement.addUserFormRulesPermissionMessage0Text')
                        }
                    ]
                }
            },
            updatePermissionFormRules() {
                return {
                    account: [
                        {
                            required: true,
                            message: this.$t('userManagement.updatePermissionFormRulesAccountMessage0Text')
                        },
                        {
                            pattern: /^1[3456789]\d{9}$/,
                            message: this.$t('userManagement.updatePermissionFormRulesAccountMessage1Text')
                        }
                    ],
                    permission: [
                        {
                            required: true,
                            message: this.$t('userManagement.updatePermissionFormRulesPermissionMessage0Text')
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
            searchUserList() {
                console.log("inputSearchString: ", this.inputSearchString)
                if (this.inputSearchString !== "") {
                    const searchObject = {
                        $or: [
                            {"name": this.inputSearchString},
                            {"account": this.inputSearchString}
                        ]
                    }
                    this.userListTableAllReload(searchObject)
                } else {
                    errorMessageShow(this.$t('userManagement.searchUserListErrorMessageText'))
                }
            },
            addUser() {
                this.$refs.addUserForm.validate(async (isok) => {
                    if(isok) {
                        console.log("this.addUserForm.permission: ", this.addUserForm.permission)
                        this.addUserDialogFormVisible = false
                        loadingViewShow()
                        NetApiShareInstance.userAdd(readAccount(), readToken(), this.addUserForm.name, this.addUserForm.account, md5HashSync(this.addUserForm.password), this.addUserForm.permission).then((res) => {
                            loadingViewDismiss()
                            if (res.data.ret === 0) {
                                this.addUserForm.name = ""
                                this.addUserForm.account = ""
                                this.addUserForm.password = ""
                                this.addUserForm.permission = null
                                this.userListTableAllReload({})
                            } else {
                                errorNotificationShow(this.$t('userManagement.addUserErrorNotificationText'), res.data.message)
                            }
                        }).catch((err) => {
                            errorMessageShow(err)
                        })
                    }
                })
            },
            updatePermissionDialog(data) {
                this.updatePermissionData = data
                this.updatePermissionDialogFormVisible = true
                this.updatePermissionForm.account = data.account
            },
            updatePermission() {
                this.$refs.updatePermissionForm.validate(async (isok) => {
                    if(isok) {
                        this.updatePermissionDialogFormVisible = false
                        loadingViewShow()
                        NetApiShareInstance.userUpdatePermission(readAccount(), readToken(), this.updatePermissionForm.account, this.updatePermissionForm.permission).then((res) => {
                            loadingViewDismiss()
                            if (res.data.ret === 0) {
                                this.updatePermissionForm.permission = null
                                this.userListTableAllReload({})
                            } else {
                                errorNotificationShow(this.$t('userManagement.updatePermissionErrorNotificationText'), res.data.message)
                            }
                        }).catch((err) => {
                            loadingViewDismiss()
                            errorMessageShow(err)
                        })
                    }
                })
            },
            userListTableSelectionChange(val) {
                this.userListDataSelectionArray = val
            },
            deleteUser() {

                let deleteAccountArray = []
                for (const item of this.userListDataSelectionArray) {
                    deleteAccountArray.push({ "account": item.account })
                }

                if(deleteAccountArray.length === 0) {
                    errorMessageShow(this.$t('userManagement.deleteUserErrorMessageText'))
                } else {
                    loadingViewShow()
                    NetApiShareInstance.userDelete(readAccount(), readToken(), deleteAccountArray).then((res) => {
                        loadingViewDismiss()
                        if (res.data.ret === 0) {
                            this.userListDataSelectionArray = []
                            this.$refs.userListTable.clearSelection()
                            this.userListTableAllReload({})
                        } else {
                            errorNotificationShow(this.$t('userManagement.deleteUserErrorNotificationText'), res.data.message)
                        }
                    }).catch((err) => {
                        loadingViewDismiss()
                        errorMessageShow(err)
                    })
                }

            },
            getPermission(permission) {
                switch (permission) {
                    case 0:
                        return this.$t('userManagement.administratorPermissionText')
                    case 1:
                        return this.$t('userManagement.testerPermissionText')
                    case 2:
                        return this.$t('userManagement.experiencerPermissionText')
                    default:
                        return this.$t('userManagement.experiencerPermissionText')
                }
            },
            userListTableAllReload(queryConditions) {
                loadingViewShow()
                NetApiShareInstance.userList(readAccount(), readToken(), queryConditions).then((res) => {
                    loadingViewDismiss()
                    if (res.data.ret === 0) {
                        this.userListDataArray = res.data.list
                        this.inputSearchString = ""
                    } else {
                        errorNotificationShow(this.$t('userManagement.obtainUserListErrorNotificationText'), res.data.message)
                    }
                }).catch((err) => {
                    loadingViewDismiss()
                    errorMessageShow(err)
                })
            }
        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
            this.userListTableAllReload({})
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

/* .el-form-item {
    margin-bottom: 10px;
} */
</style>