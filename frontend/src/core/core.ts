class ServerEndpoints{

}

class FrontendEndpoints{

}

class Core{
    constructor(){
        this.serverEnpoints = new ServerEndpoints()
        this.frontendEndpoints = new FrontendEndpoints()
    }
    apiBaseUrl = ""
    serverEnpoints
    frontendEndpoints
}

const core = new Core()
export default core