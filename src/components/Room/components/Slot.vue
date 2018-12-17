<template>
    <div :class="[ 'box', isBooked ? 'booked': 'free' ]" :data-slotId="slotId" :data-isAvailable="[isBooked?0:1]" :data-roomId="roomId"/>
</template>
<script>
export default {
    name:"SlotBox",
    props:['isBooked','slotId', 'roomId']
}
</script>
<style scoped>
.box{
    width: 20px;
    height: 20px;
    margin-left: 60px;
    float: left;
}
.free{
    background: green;
}
.booked{
    background: red;
}
</style>