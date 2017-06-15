<?php

error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
ini_set('display_errors', 'On');

require('vendor/phpflickr/phpFlickr.php');

header('Content-Type: application/json');

$config = json_decode(file_get_contents('../config.json'));
$flickr = new phpFlickr($config->flickr->key, $config->flickr->secret, true);

if (isset($_GET['username'])) {

    if (preg_match("/^[0-9]+@/", $_GET['username'])) {
        $id = $_GET['username'];
    } else {
        $person = $flickr->people_findByUsername($_GET['username']);

        if (!$person) {
            die(json_encode(array('error' => $flickr->getErrorMsg())));
        }
        $id = $person['id'];
    }
    $info = $flickr->people_getInfo($id);

    $total_count = $info['photos']['count']['_content'];
    $base = $flickr->urls_getUserPhotos($id);

    $count = isset($_GET['count']) ? intval($_GET['count']) : 10;

    $page = isset($_GET['page']) ? $_GET['page'] : NULL;

    $photos = $flickr->people_getPublicPhotos($id, NULL, NULL, $count, $page);

    $response = array_map(function($photo) use ($base, $flickr) {
        return array(
            'thumb' => $flickr->buildPhotoURL($photo, "Square"),
            'url' => $base . $photo['id'],
            'big' => $flickr->buildPhotoURL($photo),
            'id' => $photo['id']
        );
    }, (array)$photos['photos']['photo']);

    echo json_encode(array(
        'count' => $total_count,
        'pictures' => $response,
        'id' => $id
    ));
} else if (isset($_GET['picture'])) {
    $sizes = $flickr->photos_getSizes($_GET['picture']);
    foreach ($sizes as $picture) {
        if ($picture['label'] == 'Square') {
            $thumb = $picture['source'];
        } else if ($picture['label'] == 'Medium') {
            $big = $picture['source'];
        }
    }
    echo json_encode(array(
        'big' => $big,
        'thumb' => $thumb
    ));
}

?>
