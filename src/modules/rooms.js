import Axios from 'axios';
export const RoomModule = {
    state:{
        loading: false,
        rooms: [],
        slots: [],
        bookings: {}
    },
    mutations:{
        setLoading(state, loading){
            state.loading = loading;
        },
        setRooms(state, rooms){
            state.rooms = rooms;
        },
        setSlots(state, slots){
            state.slots = slots;
        },
        setBookings(state, bookings){
            state.bookings = bookings;
        },
        pushBookings(state, booking){
            if(!state.bookings.hasOwnProperty(booking.roomId)){
                state.bookings[booking.roomId] = {};
            }
            state.bookings[booking.roomId] = {
                ...state.bookings[booking.roomId],
                [booking.slotId]:true
            };
        }
    },
    actions:{
        loadRooms({commit}){
            commit('setLoading', true);
            Axios.get('http://localhost:3000/rooms').then(function(res){
                commit('setRooms', res.data);
                commit('setLoading', false);
            });
        },
        loadSlots({commit}){
            Axios.get('http://localhost:3000/slots').then(function(res){
                commit('setSlots', res.data);
            });
        },
        loadBookings({commit}){
            Axios.get('http://localhost:3000/bookings').then(function(res){
                const bookings = {};
                res.data.forEach(booking => {
                    if(!bookings.hasOwnProperty(booking.roomId)){
                        bookings[booking.roomId] = {};
                    }
                    bookings[booking.roomId] = {
                        [booking.slotId]: true
                    };
                });
                commit('setBookings',bookings);
            });
        },
        bookRoom({commit},data){
            const date = new Date();
            const currentDate = date.getDate() + "/"+ (date.getMonth()+1) + "/" + date.getFullYear();
            Axios.post('http://localhost:3000/bookings',{
                date: currentDate,
                ...data 
            }).then((res)=>{
                commit('pushBookings',{
                    date: currentDate,
                    ...data
                });
            });
        }
        
    }
}