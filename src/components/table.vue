<template>
  <a-table 
  :columns="columns" 
  :data-source="data"
  :pagination="page"
  @change="changePage"
  >
    <a slot="name" slot-scope="text,record">
        <a-button @click="editProduct(record)">编辑</a-button>
        <a-button @click="handleDelete(record)">删除</a-button>
    </a>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'category',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
  },
   {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
   {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
   {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
   {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'name' },
    width:200,
  },
];


export default {
  data() {
    return {
      columns,
    };
  },
  props: ['data','page'],
  methods: {
     changePage(page) {
      this.$emit('change', page);
    },
    //点击编辑按钮进行跳转页面操作，向父级传递
    editProduct(record) {
      this.$emit("editProduct",record)
    },
    //删除按钮操作,向父级传递
    handleDelete(record) {
      this.$emit("deldeteProduct",record)
    }
  }
};
</script>
