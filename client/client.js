const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname+"/proto/client.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const TestService = grpc.loadPackageDefinition(packageDefinition).TestServrice;

console.log("client -> client init")
const client = new TestService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.ping({name: "ping request"}, (error, resp) => {
  if (error) throw error
    console.log(resp);
});