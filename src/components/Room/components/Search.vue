<template>
   <input v-model="value" />
</template>
<script>
export default {
    name: 'Search',
    data(){
        return{
            value:''
        }
    },
    watch:{
        value(v){
            this.$emit('change',v);
        }
    }
}
</script>
>