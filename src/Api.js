import AsyncStorage from "@react-native-community/async-storage"

const BASE_API = "https://api.b7web.com.br/devbarber/api";

export default {
    /**
     * Quando esse método for chamado um novo token será gerado. Um "refresh" 
     * acontecerá. Você envia um token velho e recebe um token novo.
     */
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    /** 
     * Nesse bloco de código servirá para que o usuário faça seu login. Ele está
     * funcionando da seguinte forma: o método é chamado passando email e senha
     * como parâmetro, é feito uma requisição para uma API que já está na nuvem, 
     * e no corpo dessa requisição está sendo passado o email e senha. Em seguida 
     * o devolvida uma resposta da requisição, que será retornada em JSON
     * 
     * @return retorna vários dados do usuário:
     * - token
     * - id
     * - nome
     * - email
     * - avatar
     */
    signIn: async (email, password) => {
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await req.json();
        return json; /** retorna vários dados do usuário: */
    },
    /**
     * Endpoint: url
     * 
     * Esse bloco de código será utilizando quando o usuário for fazer um cadastro.
     * Essa função será chamada e nela será passados os três parâmetros (name, email, 
     * password). No corpo da requisição é passado esses params e é retornando um JSON.
     */
    signUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await req.json();
        return json;
    },
    logout: async () => {
        const token = await AsyncStorage.getItem("token")
        const req = await fetch(`${BASE_API}/auth/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json; /** retorna vários dados do usuário: */
    },
    /**
     * Pega todos os barbeiros
     * 
     * O token é aceito na URL, body, e cabeçalho
     */
    getBarbers: async (lat=null, lng=null, address=null) => { 
        const token = await AsyncStorage.getItem("token") // Pega o token do AsyncStorage
        const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`) /** Faz uma requisição passando como parâmetro o token */
        const json = await req.json(); /** Transforma a requisição em um JSON */
        return json;
    },
    getBarber: async (id) => {
        const token = await AsyncStorage.getItem("token") // Pega o token do AsyncStorage
        const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`) /** Faz uma requisição passando como parâmetro o token */
        const json = await req.json(); /** Transforma a requisição em um JSON */
        return json;
    },
    /** 
     * Requisição para favoritar um barbeiro
     */
    setFavorite: async(barberId) => {
        const token = await AsyncStorage.getItem("token")
        const req = await fetch(`${BASE_API}/user/favorite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token, barber: barberId})
        });
        const json = await req.json();
        return json; /** retorna vários dados do usuário: */
    },
    setAppointment: async (
        userId,
        service,
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour
    ) => {
        const token = await AsyncStorage.getItem("token")
        const req = await fetch(`${BASE_API}/user/appointment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                id: userId,
                service,
                year: selectedYear,
                month: selectedMonth,
                day: selectedDay,
                hour: selectedHour
            })
        });
        const json = await req.json();
        return json;
    }
};