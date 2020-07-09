<!--
 * @Description: 发现-心理测试管理
 * @Autor: Bonny.meng
 * @Date: 2020-07-08 1:38:20
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-08 11:54:36
-->
<template>
  <div class="app-container">
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
          <img :src="scope.row.banner_url" class="img">
        </template>
      </el-table-column>
      <el-table-column label="测试名称" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.banner_url" class="img">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button type="danger" @click="delBanner(scope.row.fileid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import fa from 'element-ui/src/locale/lang/fa'
// import data from './mock'

export default {
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  created() {
    this.getSwiper()
  },
  methods: {
    getSwiper() {
      this.listLoading = false
    //   this.list = data
      // this.$api.getSwiper().then((res) => {
      //   this.list = res
      //   this.listLoading = false
      // })
    },
    delBanner(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.$api.delSwiper(id)
          .then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getSwiper()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.img {
  width: 200px;
  height: 80px;
}
</style>
 