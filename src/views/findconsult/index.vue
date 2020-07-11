<!--
 * @Description: 发现-心理咨询师管理
 * @Autor: Bonny.meng
 * @Date: 2020-07-010 06:08:20
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-11 11:54:42
-->
<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true">添加心理咨询师</el-button>
    <el-dialog title="添加咨询师" :visible.sync="dialogFormVisible">
      <el-form ref="addFormRef" :model="form" :rules="rules">
        <el-form-item label="咨询师名称" :label-width="formLabelWidth" prop="category_name">
          <el-input v-model="form.consultant_name" />
        </el-form-item>
        <el-form-item label="咨询师名称" :label-width="formLabelWidth" prop="sex">
          <el-input v-model="form.sex" />
        </el-form-item>
        <el-form-item label="咨询师的简介" :label-width="formLabelWidth" prop="introduction">
          <el-input v-model="form.introduction" />
        </el-form-item>
        <el-form-item label="咨询师的擅长领域" :label-width="formLabelWidth" prop="expertise">
          <el-input v-model="form.expertise" />
        </el-form-item>
        <el-form-item label="咨询价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" />
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
        <el-button type="primary" @click="addConsultant()">确 定</el-button>
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
      <el-table-column label="咨询师名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.consultant_name || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.img_url" class="img">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button type="danger" @click="delConsultant(scope.row.consultant_id)">删除</el-button>
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
        consultant_name: '',
        sex: '',
        introduction: '',
        expertise: '',
        prcie: '',
        action: 'http://www.rexjoush.com:3000/webapp/discover/addPsyTest'
      },
      formLabelWidth: '130px'
    }
  },
  created() {
    this.getConList()
  },
  methods: {
    getConList() {
      this.listLoading = false
      this.$api.getConList()
        .then(res => {
          const data = res.data.data
          this.list = data
          this.listLoading = false
        }).catch(err => {
          console.log('err', err)
        })
    },
    delConsultant(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.$api.delConsultant({ 'consultant_id': id })
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
            this.getConList()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addConsultant() {

    },
    modeUpload(item) {
      this.mode = item.file
    },
    getChange: function(i, item) {
      this.printerSelect[i] = item
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

