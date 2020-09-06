(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0964a202"],{1520:function(t,e,a){"use strict";var l=a("687a"),o=a.n(l);o.a},"687a":function(t,e,a){},ddd5:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogFormVisible=!0}}},[t._v("添加心理咨询师")]),a("el-dialog",{attrs:{title:"添加咨询师",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"addFormRef",attrs:{model:t.form}},[a("el-form-item",{attrs:{label:"咨询师姓名","label-width":t.formLabelWidth,prop:"category_name"}},[a("el-input",{model:{value:t.form.consultant_name,callback:function(e){t.$set(t.form,"consultant_name",e)},expression:"form.consultant_name"}})],1),a("el-form-item",{attrs:{label:"咨询师性别","label-width":t.formLabelWidth,prop:"sex"}},[a("el-select",{attrs:{placeholder:"请选择性别"},model:{value:t.form.sex,callback:function(e){t.$set(t.form,"sex",e)},expression:"form.sex"}},t._l(t.sexList,(function(t){return a("el-option",{key:t.value,attrs:{value:t.label,label:t.label}})})),1)],1),a("el-form-item",{attrs:{label:"咨询师的简介","label-width":t.formLabelWidth,prop:"introduction"}},[a("el-input",{model:{value:t.form.introduction,callback:function(e){t.$set(t.form,"introduction",e)},expression:"form.introduction"}})],1),a("el-form-item",{attrs:{label:"咨询师的擅长领域","label-width":t.formLabelWidth,prop:"expertise"}},[a("el-input",{model:{value:t.form.expertise,callback:function(e){t.$set(t.form,"expertise",e)},expression:"form.expertise"}})],1),a("el-form-item",{attrs:{label:"咨询价格(每小时)","label-width":t.formLabelWidth,prop:"price"}},[a("el-input",{model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",e)},expression:"form.price"}})],1),a("el-form-item",{attrs:{label:"选择咨询师图片","label-width":t.formLabelWidth}},[a("el-upload",{attrs:{action:"form.action","http-request":t.modeUpload}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("选择图片")])],1)],1),a("el-form-item",{attrs:{label:"选择咨询师剩余介绍详情图片","label-width":t.formLabelWidth}},[a("el-upload",{attrs:{action:"form.action","http-request":t.modeUploadDetail}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("选择详情图片")])],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addConsultant()}}},[t._v("确 定")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,"element-loading-text":"Loading",border:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"序号",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.$index+1)+" ")]}}])}),a("el-table-column",{attrs:{label:"咨询师名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.consultant_name||"--")+" ")]}}])}),a("el-table-column",{attrs:{label:"图片",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"img",attrs:{src:t.row.img_url}})]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"danger"},on:{click:function(a){return t.delConsultant(e.row.consultant_id)}}},[t._v("删除")])]}}])})],1)],1)},o=[],i={data:function(){return{list:null,listLoading:!1,dialogFormVisible:!1,categoryList:[],sexList:[{value:0,label:"男"},{value:1,label:"女"}],typeList:[{value:1,label:"两种均可"},{value:2,label:"线上咨询"},{value:3,label:"面对面咨询"}],form:{consultant_name:"",sex:"",introduction:"",expertise:"",prcie:"",action:"http://www.rexjoush.com:3000/webapp/discover/addPsyTest",type:""},formLabelWidth:"130px"}},created:function(){this.getConList()},methods:{getConList:function(){var t=this;this.listLoading=!1,this.$api.getConList().then((function(e){var a=e.data.data;t.list=a,t.listLoading=!1})).catch((function(t){console.log("err",t)}))},delConsultant:function(t){var e=this;this.$confirm("确认删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(a){e.$api.delConsultant({consultant_id:t}).then((function(t){0===t.data.result?e.$message({type:"error",message:t.data.err}):e.$message({type:"success",message:"删除成功!"}),e.getConList()}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},addConsultant:function(){var t=this;this.dialogFormVisible=!1;var e=new FormData;e.append("details_img_url",this.detailimg),e.append("img_url",this.mode),e.append("consultant_name",this.form.consultant_name),e.append("introduction",this.form.introduction),e.append("expertise",this.form.expertise),e.append("price",this.form.price),e.append("sex",this.form.sex),e.append("form",this.form.type),this.$api.addConsultant(e).then((function(e){t.$message({type:"success",message:"上传成功!"}),t.getConList()})).catch((function(t){console.log(t)}))},modeUpload:function(t){this.mode=t.file},modeUploadDetail:function(t){this.detailimg=t.file}}},n=i,r=(a("1520"),a("2877")),s=Object(r["a"])(n,l,o,!1,null,"8a587444",null);e["default"]=s.exports}}]);