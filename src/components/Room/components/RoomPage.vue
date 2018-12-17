<template>
    <div>
        <div v-if="slots.length === 0">
            loading...
        </div>
            <div>
            <Search @change="changeSearch"/>  
            <ul class="slotList">
                <li class="slotsClass" v-for="(Slot,index) in slots" :key="Slot.slotId">{{slotTime(index)}}</li>
            </ul>  
            <div @click="slotClicked">
             <RoomList :RoomList="FilteredRoomList" :slots="slots" :bookings="bookings" @slotClicked="slotClicked"/>
            </div>
            <div class="bookedRooms" v-if="bookedRooms.length" >
                <ul>
                    <li v-for="bookedRoom in bookedRooms" :key="getBookedRoomKey(bookedRoom)">{{getBookedRoomText(bookedRoom)}}</li>
                </ul>
                <button @click="onClickBookRooms"> Book Rooms </button>
            </div>
        </div>
    </div>
</template>
<script>
import Search from './Search';
import RoomList from './RoomList';
import { mapState, mapActions } from 'vuex';
export default {
    name: 'Room',
    data(){
        return{
            searchValue:'',
            bookedRooms:[]
        }
    },
    mounted(){
        this.loadRooms();
        this.loadSlots();
        this.loadBookings();
    },
    methods:{
        changeSearch: function(value){
            this.searchValue=value;
        },
        slotTime: function(index){
            return this.slots[index].time.split("-")[0];
        },
        slotClicked(event){
            if(event.target.dataset && event.target.dataset.isavailable !=="0"){
                const dataset = event.target.dataset;
                this.bookedRooms.push({
                    slotId: dataset.slotid,
                    roomId: dataset.roomid
                });
            }
        },
        getBookedRoomKey(bookedRoom){
            return `${bookedRoom.roomId}_${bookedRoom.slotId}`;
        },
        getBookedRoomText(bookedRoom){
            var text = ''
            this.rooms.forEach(room=>{
                if(room.roomId == bookedRoom.roomId){
                    text+= 'Room Name : '+ room.name;
                }
            });
            this.slots.forEach(slot=>{
                if(slot.slotId == bookedRoom.slotId){
                    text+= ' / Slot : '+slot.time; 
                }
            });
            return text;
        },
        onClickBookRooms(){
            this.bookedRooms.forEach(bookedRoom=>{
                this.bookRoom(bookedRoom);
            });
            this.bookedRooms = [];
        },
        ...mapActions(['loadRooms','loadSlots','loadBookings','bookRoom'])
    },
    computed: {
        FilteredRoomList: function(){
            const searchValue = this.searchValue.toLowerCase();
            return this.rooms.filter(function(room){
                return room.name.toLowerCase().indexOf(searchValue)!==-1;
            });
        },
        ...mapState({
            rooms: state => state.RoomModule.rooms,
            slots: state => state.RoomModule.slots,
            bookings: state => state.RoomModule.bookings
        })
    },
    components:{
        Search,
        RoomList
    }
}
</script>
<style scoped>
ul {
  list-style-type: none;
}
.slotsClass{
    float: left;
    width: 80px;
    text-align: center;
    overflow: hidden;
}
.slotList{
    margin-left: 135px;
    text-align: center;
}
.bookedRooms{
    margin-top: 50px;
}
</style>


