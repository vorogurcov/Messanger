const apiBaseUrl = ""

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
    access_token = "access_token"
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