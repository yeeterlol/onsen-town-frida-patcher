import "frida-il2cpp-bridge";

Il2Cpp.perform(() => {
    const neptune = Il2Cpp.domain.assembly("Neptune.Core").image;
    const ntcore = neptune.class("NTCore.CommonAPI")
    const nt1 = neptune.class("NTCore.CommonAPI").nested("__Observable")
    const getDomain = ntcore.method("GetDomainURL");

    // modify this to the server you are redirecting to
    const SERVER_URL = "http://localhost:5000"
    //     static System.IObservable<LitJson.JsonData> RequestAsObservable(System.String serverAddr, System.String act, NTBase.HttpRequestParam param, NTBase.WebData webData, System.Func<NTBase.WebData,NTBase.WebData> preprocessor, System.Func<NTCore.HttpResponse,System.String> postprocessor); // 0x00d2ab84

    const method = nt1.method("RequestAsObservable").overload("System.String", "System.String", "NTBase.HttpRequestParam", "NTBase.WebData", "System.Func<NTBase.WebData,NTBase.WebData>", "System.Func<NTCore.HttpResponse,System.String>");


    getDomain.implementation = function (keyName: Il2Cpp.String) : any {
        const result = this.method("GetDomainURL").invoke(keyName);
        return Il2Cpp.string(SERVER_URL)
    }
    
    method.implementation = function (serverAddr: Il2Cpp.String, act: Il2Cpp.String, param: Il2Cpp.Parameter, webData: Il2Cpp.Object, preprocessor: any, postprocessor: any) : any {
        serverAddr = Il2Cpp.string(SERVER_URL);
        const result = this.method("RequestAsObservable").overload("System.String", "System.String", "NTBase.HttpRequestParam", "NTBase.WebData", "System.Func<NTBase.WebData,NTBase.WebData>", "System.Func<NTCore.HttpResponse,System.String>").invoke(serverAddr, act, param, webData, preprocessor, postprocessor);
        return result;
    }

});
    
    