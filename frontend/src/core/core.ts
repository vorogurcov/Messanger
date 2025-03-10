const apiBaseUrl = "http://localhost:8080"

class ServerEndpoints{
    enterAuth = `${apiBaseUrl}/auth/login`
    regAuth = `${apiBaseUrl}/auth/register`
    updateRefresh = `${apiBaseUrl}/auth/refresh`
}

class FrontendEndpoints{
    login = "/login"
    home = "/"
}

enum LocalStorageKeys{
    access_token = "accessToken"
}

class Core{
    constructor(){
        this.serverEdnpoints = new ServerEndpoints()
        this.frontendEndpoints = new FrontendEndpoints()
        this.localStorageKeys = LocalStorageKeys
    }
    apiBaseUrl = apiBaseUrl
    serverEdnpoints
    frontendEndpoints
    localStorageKeys
}

const core = new Core()
export default core