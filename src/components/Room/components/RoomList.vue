<template>
    <div>
       <RoomView v-for="(room, index) in RoomList" :room="room" :key="index" :slots="slots" :bookings="getRoomBookings(room)"/> 
    </div>
</template>
<script>
import RoomView from './RoomView';
export default {
    name: 'RoomList',
    props:["RoomList", "slots", "bookings"],
    methods: {
        getRoomBookings(room){
            return this.bookings[room.roomId] || {};
        }
    },
    components: {
        RoomView
    }
}
</Script>
<style scoped>
</style>