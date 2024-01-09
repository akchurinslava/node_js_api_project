
const vue = Vue.createApp({
    data(){
        return{
            games: [],
            gameInModal: {name: null},
                
            }
},
async created(){
    this.games = await (await fetch('http://localhost:8080/games')).json();
},
methods: {
    getGame: async function(id){
        this.gameInModal = await (await fetch(`http://localhost:8080/games/${id}`)).json();
        let gameInModal = new bootstrap.Modal(document.getElementById('gameInfoModal'), {})
        gameInModal.show();
    }
}
}).mount('#app')