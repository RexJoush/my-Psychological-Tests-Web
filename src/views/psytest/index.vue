<!--
 * @Description: 首页-修改心理测试管理
 * @Autor: Bonny.meng
 * @Date: 2020-07-07 11:38:20
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-11 21:33:44
-->
<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true">添加心理测试</el-button>
    <el-dialog
      title="添加心理测试"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="addDialogClose"
    >
      <el-form ref="addFormRef" :model="form">
        <el-form-item label="心理测试ID" :label-width="formLabelWidth" prop="sex">
          <el-select
            v-model="form.test_id"
            placeholder="请选择心理测试"
          >
            <el-option
              v-for="item in psyList"
              :key="item.test_id"
              :value="item.test_id"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHomePsyTest">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      style="width:70%"
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="100">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="心理测试名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="心理测试简介" align="center">
        <template slot-scope="scope">
          {{ scope.row.introduction }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button type="danger" @click="delHomePsyTest(scope.row.test_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: null,
      listLoading: false,
      dialogFormVisible: false,
      psyList: [],
      form: {
        test_id: ''
      },
      formLabelWidth: '120px',
      rules: {
        test_id: [
          { required: true, message: '请输入要添加的测试id', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getHomePsyTest()
    this.getTestList()
  },
  methods: {
    getTestList() {
      this.$api.getTestList()
        .then(res => {
          const data = res.data.data
          this.psyList = data
        }).catch(err => {
          this.$message.error(err)
        })
    },
    getHomePsyTest() {
      this.listLoading = false
      this.$api.getHomePsyTest()
        .then((res) => {
          const data = res.data.data
          this.list = data
        }).catch(err => {
          this.$message.error(err)
        })
    },
    delHomePsyTest(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.$api.delHomePsyTest({ 'test_id': id })
          .then((res) => {
            if (res.data.result === 0) {
              this.$message({
                type: 'error',
                message: res.data.err
              })
            } else {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
            this.getHomePsyTest()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addHomePsyTest() {
      console.log('this.form.test_id', this.form.test_id)
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return null
        await this.$api.addHomePsyTest({ 'test_id': this.form.test_id })
          .then(res => {
            if (res.data.result === 0) {
              this.$message({
                type: 'error',
                message: res.data.err
              })
            } else {
              this.$message.success('添加成功')
            }
            this.getHomePsyTest()
            this.dialogFormVisible = false // 关闭弹框
          }).catch((err) => {
            this.$message.error(err.data.err)
            this.dialogFormVisible = false // 关闭弹框
            this.getHomePsyTest()
          })
      })
      this.$refs.addFormRef.resetFields() // 清空表单
    },

    addDialogClose() {
      this.$refs.addFormRef.resetFields() // 清空表单
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button {
  margin-bottom: 20px;
}
</style>

