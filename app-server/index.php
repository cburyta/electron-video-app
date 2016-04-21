<?php

// web/index.php
require_once __DIR__.'/vendor/autoload.php';

// mimic a database list of videos
$video_database = array(
    1 => 'offline.mp4',
);

$app = new Silex\Application();

$app->get('/get-blob/{id}', function ($id) use ($app, $video_database) {

    $video_id = intval($id);
    $video_file = null;
    $video_path = null;

    // look for the video in the video database, build the path to the video
    if (array_key_exists($video_id, $video_database)) {
        $video_file = $video_database[$video_id];
        $video_path = __DIR__  . DIRECTORY_SEPARATOR . 'videos' . DIRECTORY_SEPARATOR . $video_file;
        $video_content_type = mime_content_type($video_path);
    }

    // 404 if the video isn't in the database, or if the video file does not exist
    if (!$video_path || !file_exists($video_path)) {
        return $app->abort(404, 'Video not found');
    }


    // stream the video

    $stream = function () use ($video_path) {
        readfile($video_path);
    };

    return $app->stream($stream, 200, array('Content-Type' => $video_content_type));

    // // return the video as a string
    // $parts_to_fetch = 5;
    // $parts = array();
    // $part_offset = 0;
    // $part_maxlen = 10;
    // while ($part = file_get_contents($video_path, false, null, $part_offset, $part_maxlen)) {
    //     $parts[] = $part;
    //     $part_offset = $part_offset + 1;
    // }
    // var_dump($parts);exit;
    // // return the string
    // return $app->json(array(
    //     'test' => 'data',
    //     'content' => $parts,
    //     'Content-Type' => $video_content_type
    // ));

});

$app->run();
