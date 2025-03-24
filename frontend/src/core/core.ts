const apiBaseUrl = "http://localhost:8000"

class ServerEndpoints{
    enterAuth = `${apiBaseUrl}/auth/login`
    regAuth = `${apiBaseUrl}/auth/register`
    updateRefresh = `${apiBaseUrl}/auth/refresh`
    confirmCode = `${apiBaseUrl}/auth/verify`
}

class FrontendEndpoints{
    login = "/login"
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
    }
    apiBaseUrl = apiBaseUrl
    serverEdnpoints
    frontendEndpoints
    localStorageKeys
}

const core = new Core()
export default core