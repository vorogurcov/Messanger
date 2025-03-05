class ServerEndpoints{

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
    apiBaseUrl = ""
    serverEdnpoints
    frontendEndpoints
    localStorageKeys
}

const core = new Core()
export default core