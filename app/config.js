var config = {};

if (PRODUCTION) {
    config.api = 'api/';
} else {
    config.api = 'http://localhost/projects/jcubic/compickr/api/';
}
export default config;
