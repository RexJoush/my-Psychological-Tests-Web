<!--
 * @Description: 发现-线上管理
 * @Autor: Bonny.meng
 * @Date: 2020-07-010 06:58:20
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-11 20:42:24
-->
<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true">添加线上课程</el-button>
    <el-dialog title="添加线上课程" :visible.sync="dialogFormVisible">
      <el-form ref="addFormRef" :model="form">
        <el-form-item label="课程的标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="课程副标题" :label-width="formLabelWidth">
          <el-input v-model="form.subtitle" />
        </el-form-item>
        <el-form-item label="咨询师ID" :label-width="formLabelWidth">
          <el-select
            v-model="form.consultant_id"
            placeholder="请选择咨询师"
          >
            <el-option
              v-for="val in consultantList"
              :key="val.consultant_id"
              :value="val.consultant_id"
              :label="val.consultant_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择课程图片" :label-width="formLabelWidth">
          <el-upload
            action="form.action"
            :http-request="modeUpload"
          >
            <el-button size="small" type="primary">选择课程图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="选择详细介绍图片" :label-width="formLabelWidth">
          <el-upload
            action="form.action"
            :http-request="modeUploadDetail"
          >
            <el-button size="small" type="primary">选择详细介绍图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCourse">确 定</el-button>
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
          <el-button type="danger" @click="delCourse(scope.row.course_id)">删除</el-button>
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
      consultantList: [],
      form: {
        title: '',
        subtitle: '',
        action: 'http://www.rexjoush.com:3000/webapp/discover/addPsyTest',
        consultant_id: ''
      },
      formLabelWidth: '130px'
    }
  },
  created() {
    this.getCourseList()
    this.getConList()
  },
  methods: {
    getConList() {
      this.listLoading = false
      this.$api.getConList()
        .then(res => {
          const data = res.data.data
          this.consultantList = data
          this.listLoading = false
        }).catch(err => {
          console.log('err', err)
        })
    },
    getCourseList() {
      this.listLoading = false
      this.$api.getCourseList()
        .then(res => {
          const data = res.data.data
          this.list = data
          this.listLoading = false
        }).catch(err => {
          console.log('err', err)
        })
    },
    delCourse(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.$api.delCourse({ 'course_id': id })
          .then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            }).catch((err) => {
              this.$message.error(err)
            })
            this.getTestList()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addCourse() {
      this.dialogFormVisible = false
      const fd = new FormData()
      fd.append('img_url', this.mode)
      fd.append('details_introduction_img', this.detailimg)
      fd.append('title', this.form.title)
      fd.append('subtitle', this.form.subtitle)
      fd.append('consultant_id', this.form.consultant_id)
      fd.append('is_course', 1)
      this.$api.addCourse(fd)
        .then(res => {
          this.$message({
            type: 'success',
            message: '上传成功!'
          })
          this.getCourseList()
        }).catch(err => {
          console.log(err)
        })
    },
    modeUpload(item) {
      this.mode = item.file
    },
    modeUploadDetail(item) {
      this.detailimg = item.file
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

