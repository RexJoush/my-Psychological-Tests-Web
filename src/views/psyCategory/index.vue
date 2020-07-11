<!--
 * @Description: 测试类别管理
 * @Autor: Bonny.meng
 * @Date: 2020-07-09 22:42:02
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-11 10:30:07
-->
<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true">添加测试类别</el-button>
    <el-dialog
      title="添加测试类别"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="addDialogClose"
    >
      <el-form ref="addFormRef" :model="form" :rules="rules">
        <el-form-item label="测试类别名称" :label-width="formLabelWidth" prop="consultant_name">
          <el-input v-model="form.consultant_name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory()">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      style="width:100%"
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="100">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="测试类别" align="center">
        <template slot-scope="scope">
          {{ scope.row.category_name || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button type="danger" @click="delCategory(scope.row.category_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      categoryList: [],
      form: {
        category_name: ''
      },
      formLabelWidth: '120px',
      rules: {
        consultant_name: [
          { required: true, message: '请输入测试类别', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      this.$api.getCategoryList()
        .then(res => {
          const data = res.data.data
          this.list = data
        }).catch(err => {
          this.$message.error(err)
        })
    },
    delCategory(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.$api.delCategory({ 'category_id': id })
          .then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch((err) => {
            this.$message.error(err)
          })
        this.getCategoryList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addCategory() {
      console.log('this.form.consultant_name', this.form.consultant_name)
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return null
        await this.$api.addCategory({ 'consultant_name': (this.form.consultant_name).toString() })
          .then(res => {
            this.$message.success('添加成功')
            this.getCategoryList()
            this.dialogFormVisible = false // 关闭弹框
          }).catch((err) => {
            this.$message.error(err)
            this.dialogFormVisible = false // 关闭弹框
          })
      })
      this.$refs.addFormRef.resetFields() // 清空表单
    },

    addDialogClose() {
      this.$refs.addFormRef.resetFields() // 清空表单
    }
  }
  // 关闭弹框的回调
}
</script>
<style lang="scss" scoped>
.el-button {
  margin-bottom: 20px;
}
</style>

