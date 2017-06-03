<?php

error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
ini_set('display_errors', 'On');

if (isset($_GET['username'])) {

    require('vendor/phpflickr/phpFlickr.php');

    $config = json_decode(file_get_contents('../config.json'));
    $flickr = new phpFlickr($config->flickr->key, $config->flickr->secret, true);

    $person = $flickr->people_findByUsername($_GET['username']);
    $base = $flickr->urls_getUserPhotos($person['id']);

    $count = isset($_GET['count']) ? intval($_GET['count']) : 10;

    $photos = $flickr->people_getPublicPhotos($person['id'], NULL, NULL, $count);

    $response = array_map(function($photo) use ($base, $flickr) {
        return array(
            'thumb' => $flickr->buildPhotoURL($photo, "Square"),
            'url' => $base . $photo['id'],
            'big' => $flickr->buildPhotoURL($photo)
        );
    }, (array)$photos['photos']['photo']);
    header('Content-Type: application/json');
    echo json_encode($response);
}

?>
