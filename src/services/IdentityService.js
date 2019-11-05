/* eslint-disable */
import Oidc from 'oidc-client';
import 'babel-polyfill';

var mgr = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore(),
  authority: process.env.VUE_APP_AUTHORITY,
  client_id: process.env.VUE_APP_CLIENT_ID,
  redirect_uri: window.location.origin + '/callback.html',
  response_type: 'id_token token',
  // scope: 'openid profile address roles identityserver4api country subscriptionlevel offline_access',
  scope: 'openid profile sms_api offline_access',
  post_logout_redirect_uri: window.location.origin + '/index.html',
  silent_redirect_uri: window.location.origin + '/silent-renew.html',
  accessTokenExpiringNotificationTime: 10,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
});

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

mgr.events.addUserLoaded(function(user) {
  console.log('New User Loaded：', arguments);
  console.log('access_token: ', user.access_token);
});

mgr.events.addAccessTokenExpiring(function() {
  console.log('AccessToken Expiring：', arguments);
});

mgr.events.addAccessTokenExpired(function() {
  console.log('AccessToken Expired：', arguments);
  alert('Session expired. Going out!');
  mgr
    .signoutRedirect()
    .then(function(resp) {
      console.log('signed out', resp);
    })
    .catch(function(err) {
      console.log(err);
    });
});

mgr.events.addSilentRenewError(function() {
  console.error('Silent Renew Error：', arguments);
});

mgr.events.addUserSignedOut(function() {
  alert('Going out!');
  console.log('UserSignedOut：', arguments);
  mgr
    .signoutRedirect()
    .then(function(resp) {
      console.log('signed out', resp);
    })
    .catch(function(err) {
      console.log(err);
    });
});

export default class IdentityService {
  signinSilent() {
    return mgr.signinSilent();
  }
  signinRedirect() {
    return mgr.signinRedirect();
  }
  signoutRedirect() {
    return mgr.signoutRedirect();
  }
  getUser() {
    return mgr.getUser();
  }
}
