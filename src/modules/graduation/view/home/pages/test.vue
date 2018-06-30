<template>
  <div>
    <div id="example">
      <!--<p>Original message: "{{ message }}"</p>-->
      <el-input v-model="message"></el-input>
      <p>Computed reversed message: "{{ test }}"</p>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        message:'hello',
      }
    },
    computed: {
      // a computed getter
      test: function () {
        // `this` points to the vm instance
        return this.message.split('').reverse().join('')
      }
    }
  }
</script>