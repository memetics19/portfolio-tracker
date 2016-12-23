// Server configuration data

module.exports = {

    'baseUri' : '/account-management/api',
    'database': 'localhost:27017/pt-account',
    // Security
    'jwt' : {
        'tokenHeaderName' : 'x-access-token',
    	'secret' : 'MySuperSecretKey',
        'issuer': 'b2mcomputing',
        'timeout': 600,  // 10 minutes
        'audience': 'PortfolioTracker',
        'subject' : 'noreply@b2mcomputing.com',
        'saltRounds' : 10,
    }
};