<!--
 * @Description: 发现-心理测试管理
 * @Autor: Bonny.meng
 * @Date: 2020-07-08 1:38:20
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-11 20:50:49
-->
<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true">添加心理测试</el-button>
    <el-dialog title="添加心理测试" :visible.sync="dialogFormVisible">
      <el-form ref="addFormRef" :model="form">
        <el-form-item label="测试名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="测试简介" :label-width="formLabelWidth" prop="introduction">
          <el-input v-model="form.introduction" />
        </el-form-item>
        <el-form-item label="测试类别" :label-width="formLabelWidth">
          <el-select
            v-model="form.category_id"
            placeholder="请选择测试类别"
          >
            <el-option
              v-for="val in categoryList"
              :key="val.category_id"
              :value="val.category_id"
              :label="val.category_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择图片" :label-width="formLabelWidth">
          <el-upload
            action="form.action"
            :http-request="modeUpload"
          >
            <el-button size="small" type="primary">选择图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPsyTest">确 定</el-button>
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
      <el-table-column label="测试名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="测试简介" align="center">
        <template slot-scope="scope">
          {{ scope.row.introduction || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="测试分类" align="center">
        <template slot-scope="scope">
          {{ scope.row.category || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button type="danger" @click="delPsyTest(scope.row.test_id)">删除</el-button>
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
      categoryList: [],
      form: {
        name: '',
        introduction: '',
        action: 'http://www.rexjoush.com:3000/webapp/discover/addPsyTest',
        category_id: ''
      },
      formLabelWidth: '130px'
    }
  },
  created() {
    this.getTestList()
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      this.$api.getCategoryList()
        .then(res => {
          const data = res.data.data
          this.categoryList = data
          console.log('getCategoryList', this.categoryList)
        })
    },
    getTestList() {
      this.listLoading = false
      this.$api.getTestList()
        .then(res => {
          const data = res.data.data
          this.list = data
          this.listLoading = false
        }).catch(err => {
          console.log('err', err)
        })
    },
    delPsyTest(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.$api.delPsyTest({ 'test_id': id })
          .then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
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
    addPsyTest() {
      this.dialogFormVisible = false
      const fd = new FormData()
      fd.append('details_img_url', this.mode)
      fd.append('name', this.form.name)
      fd.append('introduction', this.form.introduction)
      fd.append('category_id', this.form.category_id)
      this.$api.addPsyTest(fd)
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
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button {
  margin-bottom: 20px;
}
</style>

