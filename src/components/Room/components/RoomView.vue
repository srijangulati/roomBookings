<template>
    <div class="block">
        <div class="name">{{room.name}}</div>
        <div class="list">
            <SlotBox v-for="(slot, index) in slots" :key="getSlotKey(index)" :slotId="slot.slotId" :roomId="room.roomId" :isBooked="isBooked(slot.slotId)" />
        </div>
    </div>
</template>

<script>
import SlotBox from './Slot';
export default {
    name: 'RoomView',
    props: ["slots", "room", "bookings"],
    methods:{
        isBooked(index){
            return this.bookings[index]||false;
        },
        getSlotKey(index){
            return `${index}_${this.room.roomId}`
        }
    },
    components:{
        SlotBox
    }
}
</script>


<style scoped>
.block{
    clear: left;
    margin-top: 10px;
}
.name{
    float: left;
}
.list{
    margin-left: 150px;
}
</style>