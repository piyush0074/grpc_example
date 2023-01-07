const grpc = require("@grpc/grpc-js");
const PROTO_PATH = __dirname +"/proto/server.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const testProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const ping = (call, callback) => {
    console.log("param : "+JSON.stringify(call.request))
    callback(null,{statusCode:200, message:"pong"})
}


server.addService(testProto.TestServrice.service, {
    ping
});


server.bindAsync(
    "localhost:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server -> grpc server is running at http://localhost:50051");
        server.start();
    }
);