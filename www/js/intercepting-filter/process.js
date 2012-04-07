var AuthenticateRequest, DecorateProcess, LogRequest, MainProcess, ProcessRequest, RequestHelper, StructureRequest, process,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

RequestHelper = (function() {

  function RequestHelper() {}

  return RequestHelper;

})();

ProcessRequest = (function() {

  function ProcessRequest() {}

  ProcessRequest.prototype.process = function(req) {};

  return ProcessRequest;

})();

MainProcess = (function(_super) {

  __extends(MainProcess, _super);

  function MainProcess() {
    MainProcess.__super__.constructor.apply(this, arguments);
  }

  MainProcess.prototype.process = function(req) {
    return console.log("Doing something useful");
  };

  return MainProcess;

})(ProcessRequest);

DecorateProcess = (function(_super) {

  __extends(DecorateProcess, _super);

  function DecorateProcess(processRequest) {
    this.processRequest = processRequest;
  }

  return DecorateProcess;

})(ProcessRequest);

LogRequest = (function(_super) {

  __extends(LogRequest, _super);

  function LogRequest() {
    LogRequest.__super__.constructor.apply(this, arguments);
  }

  LogRequest.prototype.process = function(req) {
    console.log("Logging request");
    this.processRequest.process(req);
  };

  return LogRequest;

})(DecorateProcess);

AuthenticateRequest = (function(_super) {

  __extends(AuthenticateRequest, _super);

  function AuthenticateRequest() {
    AuthenticateRequest.__super__.constructor.apply(this, arguments);
  }

  AuthenticateRequest.prototype.process = function(req) {
    console.log("Authenticating request");
    this.processRequest.process(req);
  };

  return AuthenticateRequest;

})(DecorateProcess);

StructureRequest = (function(_super) {

  __extends(StructureRequest, _super);

  function StructureRequest() {
    StructureRequest.__super__.constructor.apply(this, arguments);
  }

  StructureRequest.prototype.process = function(req) {
    console.log("Structuring request");
    this.processRequest.process(req);
  };

  return StructureRequest;

})(DecorateProcess);

process = new AuthenticateRequest(new StructureRequest(new LogRequest(new MainProcess)));

process.process(new RequestHelper);