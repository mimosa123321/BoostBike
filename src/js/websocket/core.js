/* Utils functions */
function parseBool(str) {

    if (str.length == null) {
        return str == 1 ? true : false;
    } else {
        return str == "true" ? true : false;
    }

}

var isDebugModeEnabled = true;

//If debug mode is enabled we silent all console
if (!isDebugModeEnabled) {
    console.log = function() {};
    console.warn = function() {};
    console.info = function() {};
    console.debug = function() {};
}

var GameScreenState = {
    ScreenSaver: 0x01,
    CameraFeed: 0x02,
    Tutorial: 0x03,
    Game: 0x04,
    Ending: 0x05
};

// Network Message that can be receveid / send
var NetworkMessage = {
    Identifier: {
        Handshake: 0x0001,
        Initialization: 0x001A,
        GuestPlayer: 0x002A,
        BOCPlayer: 0x002B,
        CameraFeed: 0x003A,
        PictureCapturePlayer1: 0x004A,
        PictureCapturePlayer2: 0x004B,
        PlayerReady: 0x005A,
        GameInformation: 0x006A,
        GameEnded: 0x007A,
        Leaderboard: 0x009A,
        ReadyForRestart: 0x010A,
        Test: 0x0002,
        Ping: 0x0003
    },
    Kinds: {
        CameraFeed: {
            Action: {
                TouchScreen1: 0x01,
                TouchScreen2: 0x02,
                GameScreen: 0x03,
                Player2IsReady: 0x04,
                Player1IsReady: 0x05
            }
        },
        GameEnded: {
            Action: {
                GameServer: 0x01,
                GameScreen: 0x02
            },
            Attributes: {
                players_teamLevel: "int",
                players_maxSpeed: "int",
                players_souvenir: "string",
                players_position: "int",
                players_totalRPM: "int"
            }
        },
        GameInformation: {
            Action: {
                GameScreen: 0x01,
                TouchScreen1: 0x02,
                TouchScreen2: 0x03,
                GameServer: 0x04,
                TutorialEnded: 0x05
            },
            Attributes: {
                isTutorialEnded: "bool",
                player1_name: "string",
                player1_rpm: "int",
                player1_kmh: "int",
                player2_name: "string",
                player2_rpm: "int",
                player2_kmh: "int",
                players_teamLevel: "int",
                players_teamNumber: "int"
            }
        },
        Handshake: {
            Action: {
                Hello: 1,
                ACK: 2,
                NACK: 3
            },
            ClientType: {
                GameScreen: 1,
                TouchScreen1: 2,
                TouchScreen2: 3,
                Admin: 4
            }
        },
        Initialization: {
            Action: {
                GameScreen: 0x01,
                TouchScreen1: 0x02,
                TouchScreen2: 0x03
            }
        },
        PictureCapturePlayer1: {
            Action: {
                Capture: 0x01,
                TouchScreen1: 0x02,
                TouchScreen2: 0x03,
                GameScreen: 0x04,
                Captured: 0x05
            },
            Attributes: {
                players_souvenir: "string"
            }
        },
        PictureCapturePlayer2: {
            Action: {
                Capture: 0x01,
                TouchScreen1: 0x02,
                TouchScreen2: 0x03,
                GameScreen: 0x04,
                Captured: 0x05
            },
            Attributes: {
                players_souvenir: "string"
            }
        },
        PlayerReady: {
            Action: {
                Player1: 0x01,
                Player2: 0x02,
                TouchScreen1: 0x03,
                TouchScreen2: 0x04,
                GameScreen: 0x05
            }
        }
    }
};

//Network GameEnded Message parser / constructor
var NetworkGameEnded = function(action, teamLevel, maxSpeed, souvenir, position, totalRPM) {
    this.identifier = NetworkMessage.Identifier.GameEnded;
    this.action = parseInt(action);
    this.players_teamLevel = parseInt(teamLevel);
    this.players_maxSpeed = parseInt(maxSpeed);
    this.players_souvenir = souvenir;
    this.players_position = parseInt(position);
    this.players_totalRPM = parseInt(totalRPM);
};

//Network CameraFeed Message parser / constructor
var NetworkCameraFeed = function(action) {
    this.identifier = NetworkMessage.Identifier.Handshake;
    this.action = parseInt(action);
};

//Network PictureCapturePlayer1 Message parser / constructor
var NetworkPictureCapturePlayer1 = function(action, players_souvenir) {
    this.identifier = NetworkMessage.Identifier.PictureCapturePlayer1;
    this.action = parseInt(action);
    this.players_souvenir = players_souvenir;
};

//Network PictureCapturePlayer2 Message parser / constructor
var NetworkPictureCapturePlayer2 = function(action, players_souvenir) {
    this.identifier = NetworkMessage.Identifier.PictureCapturePlayer2;
    this.action = parseInt(action);
    this.players_souvenir = players_souvenir;
};

//Network Handshake Message parser / constructor
var NetworkHandshake = function(action, clientType) {
    this.identifier = NetworkMessage.Identifier.Handshake;
    this.action = parseInt(action);
    this.clientType = parseInt(clientType);
};



//Network GameInformation Message parser / constructor
var NetworkGameInformation = function(
    action,
    isTutorialEnded,
    player1_name, player1_rpm, player1_kmh,
    player2_name, player2_rpm, player2_kmh,
    players_teamLevel, players_teamNumber
) {
    this.identifier = NetworkMessage.Identifier.GameInformation;
    this.action = parseInt(action);
    this.isTutorialEnded = parseBool(isTutorialEnded);
    this.player1_name = player1_name;
    this.player1_rpm = Math.ceil(parseInt(player1_rpm));
    this.player1_kmh = Math.ceil(parseInt(player1_kmh));
    this.player2_name = player2_name;
    this.player2_rpm = Math.ceil(parseInt(player2_rpm));
    this.player2_kmh = Math.ceil(parseInt(player2_kmh));
    this.players_teamLevel = parseInt(players_teamLevel);
    this.players_teamNumber = parseInt(players_teamNumber);
};

//Netowrk ping message
var NetworkPing = function() {
    this.identifier = NetworkMessage.Identifier.Ping;
}


//Constructor
var GameScreenFactory = function() {
    //Keep Alive Variables
    this.isKeepingAlive = false; //If true, ping will be through to keep alive the connect
    this.keepAliveInstance = null; //Instance of the interval
    this.pictureFromPlayerID = 0; //ID of the player that take the initial picture
    this.gameScreenState = GameScreenState.ScreenSaver; //State of the gamescreen

    //WebSocket Variables
    this.serverURL = "doudou.localhost.com";
    this.serverPort = "8802";
    this.serverEndpoint = "boostbike";
    this.gameInformation = new NetworkGameInformation(
        NetworkMessage.Kinds.GameInformation.Action.GameServer,
        false,
        "Guest", 0, 0,
        "Guest", 0, 0,
        0, 0
    );

    this.connectedCallback = function() {};
    this.initializationCallback = function() {};
    this.cameraFeedCallback = function() {};
    this.getReadyCallback = function() {};
    this.pictureCaptureCallback = function(playerID) {};
    this.gameStartCallback = function() {};
    this.gameTutorialEndedCallback = function() {};
    this.gameEndedCallback = function() {};
    this.updateGameInformationCallback = function() {};
    this.updateUserInformationCallback = function(player1_name, player2_name, players_teamNumber) {};
};


//Init process
GameScreenFactory.prototype.init = function(cameraFeedID) {
    this.cameraFeedID = cameraFeedID;
    this.webSocketConnect();
}

//WebSocket On Close CallBack
GameScreenFactory.prototype.webSocketConnect = function() {
    console.log("webSocketConnect", {
        event: "connecting",
        result: "call"
    });

    this.isConnected = false;
    this.isWebSocketHaveError = false;
    this.webSocketInstance = new WebSocket(
        "wss://" + this.serverURL + ":" + this.serverPort + "/" + this.serverEndpoint
    );

    this.webSocketInstance.GameScreenFactory = this;

    this.webSocketInstance.onopen = function(e) {
        GameScreenCore.getInstance().webSocketOnOpen(e);
    };

    this.webSocketInstance.onclose = function(e) {
        GameScreenCore.getInstance().webSocketOnClose(e);
    };

    this.webSocketInstance.onmessage = function(e) {
        GameScreenCore.getInstance().webSocketOnMessage(e);
    };

    this.webSocketInstance.onerror = function(e) {
        GameScreenCore.getInstance().webSocketOnError(e);
    };

}

//WebSocket On Close CallBack
GameScreenFactory.prototype.webSocketOnClose = function(event) {
    console.warn("webSocketOnClose", event, {
        result: 'closed'
    });
    this.isConnected = false;
    this.keepAlive(false); //We stop keep alive
    this.webSocketConnect(); //Re-initiate connect
};

//WebSocket On Open CallBack
GameScreenFactory.prototype.webSocketOnOpen = function(event) {
    console.log("webSocketOnOpen", event, {
        result: 'connected'
    });
    this.isConnected = true;
    this.keepAlive(true);

    //Send Hello to the gameServer
    var data = new NetworkHandshake(NetworkMessage.Kinds.Handshake.Action.Hello, NetworkMessage.Kinds.Handshake.ClientType.GameScreen);
    this.webSocketSend(data);
    this.connectedCallback();
};

//Reinit / Init the game
GameScreenFactory.prototype.initGame = function() {
    console.log("webSocketOnMessage", event, {
        result: 'gamescreen_is_asked_to_init'
    });
    this.pictureFromPlayerID = 0;
    this.gameScreenState = GameScreenState.ScreenSaver;
    this.gameInformation = new NetworkGameInformation(
        NetworkMessage.Kinds.GameInformation.Action.GameServer,
        false,
        "Guest", 0, 0,
        "Guest", 0, 0,
        0, 0
    );

    //Camera Feed Init
    Webcam.set({
        width: 640,
        height: 480,
        dest_width: 640, //TODO: Control the quality as soon we have IXP info
        dest_height: 480, //TODO: Control the quality as soon we have IXP info
        image_format: 'jpeg', //TODO: Control the quality as soon we have IXP info
        force_flash: false, //Note: Do not change to true or the page will be laggy
        jpeg_quality: 90 //TODO: Control the quality as soon we have IXP info
    });

    Webcam.attach(this.cameraFeedID); //If you change the DOM don't forget the ID

    this.initializationCallback();
}

//WebSocket On Message CallBack
GameScreenFactory.prototype.webSocketOnMessage = function(event) {
    console.log("webSocketOnMessage", event, {
        result: 'message_received'
    });

    try {
        var networkData = JSON.parse(event.data);

        //Init / Reinit network call
        if (
            networkData.identifier == NetworkMessage.Identifier.Initialization &&
            networkData.action == NetworkMessage.Kinds.Initialization.Action.GameScreen
        ) {
            this.initGame();
        }

        //Game Information
        if (
            networkData.identifier == NetworkMessage.Identifier.GameInformation &&
            networkData.action == NetworkMessage.Kinds.GameInformation.Action.GameScreen
        ) {
            this.gameInformation.player1_name = networkData.player1_name;
            this.gameInformation.player1_rpm = Math.ceil(parseInt(networkData.player1_rpm));
            this.gameInformation.player1_kmh = Math.ceil(parseInt(networkData.player1_kmh));
            this.gameInformation.player2_name = networkData.player2_name;
            this.gameInformation.player2_rpm = Math.ceil(parseInt(networkData.player2_rpm));
            this.gameInformation.player2_kmh = Math.ceil(parseInt(networkData.player2_kmh));
            this.gameInformation.players_teamNumber = networkData.players_teamNumber;
            console.log("webSocketOnMessage", this.gameInformation, {
                result: 'gameinformation_updated'
            });
            this.updateGameInformationCallback(
                this.gameInformation.player1_name, this.gameInformation.player1_rpm, this.gameInformation.player1_kmh,
                this.gameInformation.player2_name, this.gameInformation.player2_rpm, this.gameInformation.player2_kmh,
                this.gameInformation.players_teamNumber
            );
        }

        //Camera Feed call
        if (
            networkData.identifier == NetworkMessage.Identifier.CameraFeed &&
            networkData.action == NetworkMessage.Kinds.CameraFeed.Action.GameScreen
        ) {
            console.log("webSocketOnMessage", event, {
                result: 'gamescreen_need_to_update_data'
            });
            this.gameInformation.player1_name = networkData.player1_name;
            this.gameInformation.player2_name = networkData.player2_name;
            this.gameInformation.players_teamNumber = networkData.players_teamNumber;
            this.updateUserInformationCallback(
                this.gameInformation.player1_name,
                this.gameInformation.player2_name,
                this.gameInformation.players_teamNumber
            );
        }

        if (
            networkData.identifier == NetworkMessage.Identifier.CameraFeed &&
            networkData.action == NetworkMessage.Kinds.CameraFeed.Action.GameScreen &&
            this.gameScreenState == GameScreenState.ScreenSaver
        ) {
            console.log("webSocketOnMessage", event, {
                result: 'gamescreen_need_to_display_camera'
            });
            this.gameScreenState = GameScreenState.CameraFeed;
            this.cameraFeedCallback();
        }

        //Camera Picture Call from Player 1
        if (
            networkData.identifier == NetworkMessage.Identifier.PictureCapturePlayer1 &&
            networkData.action == NetworkMessage.Kinds.PictureCapturePlayer1.Action.GameScreen &&
            this.gameScreenState == GameScreenState.CameraFeed
        ) {
            console.log("webSocketOnMessage", event, {
                result: 'gamescreen_need_to_capture_a_photo'
            });
            this.pictureFromPlayerID = 1;
            this.pictureCaptureCallback(this.pictureFromPlayerID);
        }

        //Camera Picture Call from Player 2
        if (
            networkData.identifier == NetworkMessage.Identifier.PictureCapturePlayer2 &&
            networkData.action == NetworkMessage.Kinds.PictureCapturePlayer2.Action.GameScreen &&
            this.gameScreenState == GameScreenState.CameraFeed
        ) {
            console.log("webSocketOnMessage", event, {
                result: 'gamescreen_need_to_capture_a_photo'
            });
            this.pictureFromPlayerID = 2;
            this.pictureCaptureCallback(this.pictureFromPlayerID);
        }


        //Game Call
        if (
            networkData.identifier == NetworkMessage.Identifier.PlayerReady &&
            networkData.action == NetworkMessage.Kinds.PlayerReady.Action.GameScreen &&
            this.gameScreenState == GameScreenState.CameraFeed
        ) {
            console.log("webSocketOnMessage", event, {
                result: 'gamescreen_is_asked_to_launch_game'
            });
            this.gameScreenState = GameScreenState.Tutorial;
            this.gameStartCallback();
        }

        //GameEnded With Position
        if (
            networkData.identifier == NetworkMessage.Identifier.GameEnded &&
            networkData.action == NetworkMessage.Kinds.GameEnded.Action.GameScreen
        ) {
            console.log("webSocketOnMessage", event, {
                result: 'gamescreen_game_is_eneded'
            });
            this.gameEndedCallback(parseInt(networkData.players_position));
        }


    } catch (e) {}
};

//WebSocket On Error CallBack
GameScreenFactory.prototype.webSocketOnError = function(event) {
    console.warn("webSocketOnError", event, {
        result: 'error_occured'
    });
    this.isWebSocketHaveError = true;
};


//Send a message to the server 
GameScreenFactory.prototype.webSocketSend = function(data) {
    if (this.isConnected) {
        try {
            var networkData = JSON.stringify(data);
            this.webSocketInstance.send(networkData);
            console.log("webSocketSend", networkData, {
                result: 'success'
            });
        } catch (e) {
            console.warn("webSocketSend", data, {
                result: 'parse failed'
            });
        }
    } else {
        console.warn("webSocketSend", data, {
            result: 'network failed'
        });
    }
};

//Update the current level on the game server
GameScreenFactory.prototype.gameInformationLevel = function(level) {
    console.log("gameInformationLevel", null, {
        result: 'call'
    });
    this.gameInformation.players_teamLevel = parseInt(level);

    console.log("gameInformationLevel", this.gameInformation, {
        result: 'sent'
    });
    this.webSocketSend(this.gameInformation);
};


GameScreenFactory.prototype.gameInformationTutorialEnded = function() {
    console.log("gameInformationTutorialEnded", null, {
        result: 'call'
    });

    this.gameInformation.isTutorialEnded = true;
    this.gameInformation.players_teamLevel = 1;
    var data = jQuery.extend(true, {}, this.gameInformation);
    data.action = NetworkMessage.Kinds.GameInformation.Action.TutorialEnded;
    this.gameScreenState = GameScreenState.Game;
    console.log("gameInformationTutorialEnded", data, {
        result: 'sent'
    });
    this.webSocketSend(data);
    this.gameTutorialEndedCallback();
};



GameScreenFactory.prototype.gameInformationGameEnded = function(players_teamLevel, players_maxSpeed, players_souvenir, players_totalRPM) {
    console.log("gameInformationGameEnded", null, {
        result: 'call'
    });

    var data = new NetworkGameEnded(
        NetworkMessage.Kinds.GameEnded.Action.GameServer,
        players_teamLevel,
        players_maxSpeed,
        players_souvenir,
        0,
        players_totalRPM
    );

    this.gameScreenState = GameScreenState.Ending;
    console.log("gameInformationGameEnded", data, {
        result: 'sent'
    });
    this.webSocketSend(data);
};

//Take the picture and send it to the gameServer
GameScreenFactory.prototype.cameraFeedTakePicture = function() {
    console.log("CameraFeedTakePicture", null, {
        result: 'call'
    });

    var players_souvenir = this.takePicture();

    console.log("CameraFeedTakePicture", players_souvenir, {
        result: 'sent'
    });

    var data = null;
    if (this.pictureFromPlayerID == 1) {
        data = new NetworkPictureCapturePlayer1(
            NetworkMessage.Kinds.PictureCapturePlayer1.Action.Captured,
            players_souvenir
        );
    } else {
        data = new NetworkPictureCapturePlayer2(
            NetworkMessage.Kinds.PictureCapturePlayer2.Action.Captured,
            players_souvenir
        );
    }
    this.webSocketSend(data);
    return players_souvenir;
};


GameScreenFactory.prototype.takePicture = function() {
    console.log("TakePicture", null, {
        result: 'call'
    });

    var players_souvenir = "";

    try {
        Webcam.snap(function(data_uri) {
            players_souvenir = data_uri;
            console.log("TakePicture", null, {
                result: 'success'
            });
        });
    } catch (e) {
        console.warn("TakePicture", e, {
            result: 'failed'
        });
    }

    return players_souvenir;
};



//Ping the server 
GameScreenFactory.prototype.ping = function() {
    var ping = new NetworkPing();
    this.webSocketSend(ping);
};


//Keep Alive the connect
GameScreenFactory.prototype.keepAlive = function(state) {
    if (typeof state === "undefined") {
        state = true;
    } else {
        this.isKeepingAlive = state;
    }

    window.clearInterval(this.keepAliveInstance);
    this.keepAliveInstance = window.setInterval(
        function() {
            if (GameScreenCore.getInstance().isKeepingAlive) {
                GameScreenCore.getInstance().ping();
            } else {
                window.clearInterval(GameScreenCore.getInstance().keepAliveInstance);
            }
        },
        4500
    );
};

var GameScreenCore = (function() {
    var instance;

    function createInstance() {
        var _instance = new GameScreenFactory();
        return _instance;
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
