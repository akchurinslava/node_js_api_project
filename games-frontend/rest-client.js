
const vue = Vue.createApp({
    data(){
        return{
            games: [],
            gameInModal: {name: null},
            orders: [],
            orderInModal: {name: null},
            clients: [],
            clientInModal: {name: null},
            }
        },
    async created(){
        this.games = await (await fetch('http://localhost:8080/games')).json();
        this.orders = await (await fetch('http://localhost:8080/orders')).json();
        this.clients = await (await fetch('http://localhost:8080/clients')).json();
    },
    methods: {
        getGame: async function(id){
            this.gameInModal = await (await fetch(`http://localhost:8080/games/${id}`)).json();
            let gameInModal = new bootstrap.Modal(document.getElementById('gameInfoModal'), {})
            gameInModal.show();
        },
        getOrder: async function(id){
            this.orderInModal = await (await fetch(`http://localhost:8080/orders/${id}`)).json();
            let orderInModal = new bootstrap.Modal(document.getElementById('orderInfoModal'), {})
            orderInModal.show();
        },
        getClient: async function(id){
            this.clientInModal = await (await fetch(`http://localhost:8080/clients/${id}`)).json();
            let clientInModal = new bootstrap.Modal(document.getElementById('clientInfoModal'), {})
            clientInModal.show();
        }
    }
}).mount('#app')