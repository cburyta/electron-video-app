var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
dbVersion = 1.0;
var db_name = "client-video-database";
var video_obj = "client-video-object";
var video_key = "client-video-key";
var video_file = "offline.mp4";
// var video_file_offline_mp4 = video_file;

var video_url = 'http://127.0.0.1:8081/index.php/get-blob/1';
// var video_url = 'http://192.168.0.24:8081/index.php/get-blob/1';
var db;

// setup the db request
var request = indexedDB.open(db_name, dbVersion);

/**
 * Handle success callback
 */
request.onsuccess = function (event) {
    console.log('request.onsuccess');
    db = request.result;
    db.onerror = function (event) {};
    var transaction = db.transaction([video_obj], "readwrite");

    if (db.setVersion) {
        console.log('db.setVersion == true');

        if (db.version != dbVersion) {

            var setVersion = db.setVersion(dbVersion);

            setVersion.onsuccess = function () {
                createObjectStore(db);
                isVideoAvailableOffline(transaction);
            };

        } else {
            isVideoAvailableOffline(transaction);
        }

    } else {
        console.log('db.setVersion == false');

        isVideoAvailableOffline(transaction);
    }
};

/**
 * Error callback
 */
request.onerror = function (event) {
    console.log('request.onerror');
    alert("Something went wrong while establishing connection with database");  
};

/**
 * DB Upgrade detected callback
 */
request.onupgradeneeded = function (event) {
    console.log('onupgradeneeded');
    createObjectStore(event.target.result);
};


var getVideoDataStream = function (video_file) {
    console.log('getVideoDataStream');

    var xhr = new XMLHttpRequest(),
        binary_data;

    xhr.open("GET", video_url, true);
    xhr.responseType = "blob";
    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            binary_data = xhr.response;
            console.log('Video downloaded, saving in the database');
            putDataInDb(binary_data);
        }
    }, false);
    xhr.send();
};

/**
 * This is called early on, to determin if we can lod the video offline or if we need
 * to download it from the server
 */
var isVideoAvailableOffline = function(transaction) {
    console.log('isVideoAvailableOffline');

    transaction.objectStore(video_obj).get(video_key).onsuccess = function (event){
        if (typeof(event.target.result) != "undefined") {
            // the video is in the database and available offline
            // this is where the video is loaded from the database,
            // into the video object src.
            var binary_encoded = event.target.result;
            var URL = window.URL || window.webkitURL;
            var videoURL = URL.createObjectURL(binary_encoded);
            var video = document.querySelectorAll('video');
            video[0].src = videoURL;
       } else {
            // if the video is not available offline, we'll call this function
            // to download it, and this function als saves the video so the next
            // time we check it's available offline
            getVideoDataStream(video_file);
       }
   };
};

var createObjectStore = function (dataBase) {
    console.log('createObjectStore');
    dataBase.createObjectStore(video_obj);
};

var putDataInDb = function (blob) {
    console.log('putDataInDb');
    var transaction = db.transaction([video_obj], "readwrite");
    var put = transaction.objectStore(video_obj).put(blob, video_key);
    console.log('blob', blob);
    isVideoAvailableOffline(transaction);
};

// onclick of the 'delete local content' button we need to be sure to remove data local
document.getElementById("deleteLocal").addEventListener("click", function (e) {
    // report on the success of opening the transaction
    var transaction = db.transaction([video_obj], "readwrite");
    transaction.oncomplete = function(event) { console.log('Transaction completed: database modification finished'); };
    transaction.onerror = function(event) { console.log('Transaction not opened due to error: ' + transaction.error); };

    var objectStore = transaction.objectStore(video_obj);
    var objectStoreRequest = objectStore.delete(video_key);

    objectStoreRequest.onsuccess = function(event) {
        // report the success of our delete operation
        console.log('Record deleted');

        // reloaad the page
        window.location.reload();
    };
});

