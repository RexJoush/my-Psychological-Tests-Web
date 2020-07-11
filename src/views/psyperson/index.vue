<!--
 * @Description: 首页-心理咨询师管理
 * @Autor: Bonny.meng
 * @Date: 2020-07-11 07:12:54
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-11 21:43:07
-->
<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true">添加心理咨询师</el-button>
    <el-dialog title="添加咨询师" :visible.sync="dialogFormVisible">
      <el-form ref="addFormRef" :model="form">
        <el-form-item label="咨询师" :label-width="formLabelWidth">
          <el-select
            v-model="form.consultant_id"
            placeholder="请选择咨询师"
          >
            <el-option
              v-for="val in conList"
              :key="val.consultant_id"
              :value="val.consultant_id"
              :label="val.consultant_name"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHomeConsultant">确 定</el-button>
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
      conList: [],
      form: {
        consultant_id: ''
      },
      formLabelWidth: '130px'
    }
  },
  created() {
    this.getHomeConsultant()
    this.getConList()
  },
  methods: {
    getConList() {
      this.$api.getConList()
        .then(res => {
          const data = res.data.data
          this.conList = data
          console.log('conList', this.conList)
        })
    },
    getHomeConsultant() {
      this.listLoading = false
      this.$api.getHomeConsultant()
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
            console.log('del', res.data.err)
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
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      this.getHomeConsultant()
    },
    addHomeConsultant() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return null
        await this.$api.addHomeConsultant({ 'consultant_id': this.form.consultant_id })
          .then(res => {
            this.$message.success('添加成功')
            this.getHomeConsultant()
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

