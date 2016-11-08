var config = {
    host: 'https://jiy.zizhujy.com',
    port: ':60001',
    serviceUrls: {
        wordpress: {
            addPost: '/wordpress/add-post'
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (angular) {
    angular.module('jiyConfig', ['ng.utils'])
        .run(['$rootScope', 'leavesTrimmer', function ($rootScope, leavesTrimmer) {
            config.serviceUrls = leavesTrimmer.prepend(config.serviceUrls, config.host + config.port);
            $rootScope.config = config;
        }])
    ;
}