const apiBaseUrl = "http://localhost:8080"
const centrifugoBaseUrl = 'http://localhost:8081'
class ServerEndpoints{
    enterAuth = `${apiBaseUrl}/auth/login`
    regAuth = `${apiBaseUrl}/auth/register`
    updateRefresh = `${apiBaseUrl}/auth/refresh`
    confirmCode = `${apiBaseUrl}/auth/verify`
    allChats = `${apiBaseUrl}/chats`
    groups = `${apiBaseUrl}/groups`
    searchUsers = `${apiBaseUrl}/profile/search`
}

class CentrifugoEndpoints{
    websocket = `ws://localhost:8081/connection/websocket`
}

class FrontendEndpoints{
    login = "/login"
    register = "/register"
    home = "/"
    profile = "/profile"
    confirmCode = "/:id"
}

enum LocalStorageKeys{
    access_token = "accessToken"
}

class Core{
    constructor(){
        this.serverEdnpoints = new ServerEndpoints()
        this.frontendEndpoints = new FrontendEndpoints()
        this.localStorageKeys = LocalStorageKeys
        this.centrifugoEndpoints = new CentrifugoEndpoints()
    }
    apiBaseUrl = apiBaseUrl
    serverEdnpoints
    frontendEndpoints
    localStorageKeys

    centrifugoEndpoints
}

const core = new Core()
export default core