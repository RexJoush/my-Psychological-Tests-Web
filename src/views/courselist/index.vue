<!--
 * @Description: 首页-线上课程管理
 * @Autor: Bonny.meng
 * @Date: 2020-07-10 09:14:47
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-10-24 20:38:16
-->
<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true">添加线上课程</el-button>
    <el-dialog title="添加线上课程" :visible.sync="dialogFormVisible">
      <el-form ref="addFormRef" :model="form">
        <el-form-item label="线上课程" :label-width="formLabelWidth">
          <el-select
            v-model="form.course_id"
            placeholder="请选择线上课程"
          >
            <el-option
              v-for="val in courseList"
              :key="val.course_id"
              :value="val.course_id"
              :label="val.title"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHomeCourse">确 定</el-button>
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
      <el-table-column label="课程名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.title || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button type="danger" @click="delHomeCourse(scope.row.course_id)">删除</el-button>
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
      courseList: [],
      form: {
        course_id: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getHomeCourse()
    this.getCourseList()
  },
  methods: {
    getCourseList() {
      this.$api.getCourseList()
        .then(res => {
          const data = res.data.data
          this.courseList = data
          console.log('conList', this.courseList)
        })
    },
    getHomeCourse() {
      this.listLoading = false
      this.$api.getHomeCourse()
        .then(res => {
          const data = res.data.data
          this.list = data
          this.listLoading = false
        }).catch(err => {
          console.log('err', err)
        })
    },
    delHomeCourse(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.$api.delHomeCourse({ 'course_id': id })
          .then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getHomeCourse()
          }).catch((err) => {
              this.$message.error(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addHomeCourse() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return null
        await this.$api.addHomeCourse({ 'course_id': this.form.course_id })
          .then(res => {
            this.$message.success('添加成功')
            this.getHomeCourse()
            this.dialogFormVisible = false // 关闭弹框
          }).catch((err) => {
            this.$message.error(err)
            this.dialogFormVisible = false // 关闭弹框
          })
      })
      this.$refs.addFormRef.resetFields() // 清空表单
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button {
  margin-bottom: 20px;
}
.img {
  width: 100px;
  height: 100px;
}
</style>

