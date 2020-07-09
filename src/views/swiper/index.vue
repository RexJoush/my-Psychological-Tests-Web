<!--
 * @Description: 首页轮播图管理
 * @Autor: Bonny.meng
 * @Date: 2020-07-07 09:38:20
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-08 23:22:31
-->
<template>
  <div class="app-container">
    <div class="img-upload">
      <p>温馨提示：在点击上传之前请先选择图片!</p>
      <el-upload
        action="action"
        :http-request="modeUpload"
      >
        <el-button size="small" type="primary">选择图片</el-button>
      </el-upload>
      <el-button size="small" icon="el-icon-upload" type="danger" @click="upload">点击上传</el-button>
    </div>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      style="width:70%"
      highlight-current-row
    >
      <el-table-column align="center" label="图片ID" width="100">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="Swiper" align="center">
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
      list: [],
      listLoading: true,
      action: 'http://www.rexjoush.com:3000/webapp/home/changeSwiper',
      mode: {}
    }
  },
  created() {
    this.getSwiper()
  },
  methods: {
    async getSwiper() {
      this.listLoading = true
      // this.list = data
      this.$api.getSwiper()
        .then(res => {
          const data = res.data.data
          this.list = data
          console.log('swiper', data)
          this.listLoading = false
        }).catch(err => {
          console.log('err', err)
        })
    },
    delBanner(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.$api.delSwiper({ 'fileid': id })
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
        this.getSwiper()
      })
    },
    upload() {
      const fd = new FormData()
      fd.append('img_url', this.mode)
      this.$api.uploadSwiper(fd)
        .then(res => {
          console.log(res.data)
        })
    },
    modeUpload(item) {
      this.mode = item.file
    }
  }
}
</script>
<style lang="scss" scoped>
.img {
  width: 200px;
  height: 80px;
}
.img-upload {
  width: 60%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  p {
    font-size: 12px;
    color: red;
  }
}
</style>
