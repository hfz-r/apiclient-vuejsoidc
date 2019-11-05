/* eslint-disable */
import Manager from '../services/IdentityService';

const service = new Manager();

const state = {
  signed_in: null,
  user: null,
  profile: null,
  role: null,
  id_token: null,
  session_state: null,
  access_token: null,
  scopes: null,
  new_token: null,
  errors: null
};

const getters = {
  user: state => state.user,
  profile: state => state.profile,
  signedIn: state => state.signed_in,
  idToken: state => state.id_token,
  sessionState: state => state.session_state,
  accessToken: state => state.access_token,
  scopes: state => state.scopes,
  role: state => state.role,
  newToken: state => state.new_token
};

const actions = {
  // Redirect of the current window to the authorization endpoint.
  signIn(context) {
    service.signinRedirect().catch(function(err) {
      context.commit('setError', err);
    });
  },

  // Redirect of the current window to the end session endpoint
  signOut(context) {
    service
      .signoutRedirect()
      .then(function(resp) {
        console.log('signed out', resp);
      })
      .catch(function(err) {
        context.commit('setError', err);
      });
  },

  // Renew the token manually
  renewToken(context) {
    return new Promise((resolve, reject) => {
      service
        .signinSilent()
        .then(function(user) {
          if (user == null) {
            context.dispatch('signIn');
          } else {
            context.commit('setNewToken', user);
            context.commit('setUser', user);
            context.commit('setProfile', user.profile);
            context.commit('setIdToken', user.id_token);
            context.commit('setSessionState', user.session_state);
            context.commit('setAcessToken', user.access_token);
            context.commit('setScopes', user.scopes);
            context.commit('setRole', user.profile.role);
            return resolve(user);
          }
        })
        .catch(function(err) {
          context.commit('setError', err);
          return reject(err);
        });
    });
  },

  // Get the user who is logged in
  fetchUser(context) {
    return new Promise((resolve, reject) => {
      service
        .getUser()
        .then(function(user) {
          if (user == null) {
            context.dispatch('signIn');
            context.commit('setUser', null);
            return resolve(null);
          } else {
            context.commit('setUser', user);
            return resolve(user);
          }
        })
        .catch(function(err) {
          context.commit('setError', err);
          return reject(err);
        });
    });
  },

  // Check if there is any user logged in
  fetchSignedIn(context) {
    return new Promise((resolve, reject) => {
      service
        .getUser()
        .then(function(user) {
          if (user == null) {
            context.dispatch('signIn');
            context.commit('setSignedIn', null);
            return resolve(false);
          } else {
            context.commit('setSignedIn', true);
            return resolve(true);
          }
        })
        .catch(function(err) {
          context.commit('setError', err);
          return reject(err);
        });
    });
  },

  // Get the profile of the user logged in
  fetchProfile(context) {
    return new Promise((resolve, reject) => {
      service
        .getUser()
        .then(function(user) {
          if (user == null) {
            context.dispatch('signIn');
            context.commit('setProfile', null);
            return resolve(null);
          } else {
            context.commit('setProfile', user.profile);
            return resolve(user.profile);
          }
        })
        .catch(function(err) {
          context.commit('setError', err);
          return reject(err);
        });
    });
  },

  // Get the token id
  fetchIdToken(context) {
    return new Promise((resolve, reject) => {
      service
        .getUser()
        .then(function(user) {
          if (user == null) {
            context.dispatch('signIn');
            context.commit('setIdToken', null);
            return resolve(null);
          } else {
            context.commit('setIdToken', user.id_token);
            return resolve(user.id_token);
          }
        })
        .catch(function(err) {
          context.commit('setError', err);
          return reject(err);
        });
    });
  },

  // Get the session state
  fetchSessionState(context) {
    return new Promise((resolve, reject) => {
      service
        .getUser()
        .then(function(user) {
          if (user == null) {
            context.dispatch('signIn');
            context.commit('setSessionState', null);
            return resolve(null);
          } else {
            context.commit('setSessionState', user.session_state);
            return resolve(user.session_state);
          }
        })
        .catch(function(err) {
          context.commit('setError', err);
          return reject(err);
        });
    });
  },

  // Get the access token of the logged in user
  fetchAcessToken(context) {
    return new Promise((resolve, reject) => {
      service
        .getUser()
        .then(function(user) {
          if (user == null) {
            context.dispatch('signIn');
            context.commit('setAcessToken', null);
            return resolve(null);
          } else {
            context.commit('setAcessToken', user.access_token);
            return resolve(user.access_token);
          }
        })
        .catch(function(err) {
          context.commit('setError', err);
          return reject(err);
        });
    });
  },

  // Takes the scopes of the logged in user
  fetchScopes(context) {
    return new Promise((resolve, reject) => {
      service
        .getUser()
        .then(function(user) {
          if (user == null) {
            context.dispatch('signIn');
            context.commit('setScopes', null);
            return resolve(null);
          } else {
            context.commit('setScopes', user.scopes);
            return resolve(user.scopes);
          }
        })
        .catch(function(err) {
          context.commit('setError', err);
          return reject(err);
        });
    });
  },

  // Get the user roles logged in
  fetchRole(context) {
    return new Promise((resolve, reject) => {
      service
        .getUser()
        .then(function(user) {
          if (user == null) {
            context.dispatch('signIn');
            context.commit('setRole', null);
            return resolve(null);
          } else {
            context.commit('setRole', user.profile.role);
            return resolve(user.profile.role);
          }
        })
        .catch(function(err) {
          context.commit('setError', err);
          return reject(err);
        });
    });
  }
};

const mutations = {
  setError(state, error) {
    state.error = error && error.message ? error.message : error;
  },
  setUser(state, user) {
    state.user = validator.logToken(user);
  },
  setSignedIn(state, signedin) {
    state.signed_in = validator.logToken(signedin);
  },
  setProfile(state, profile) {
    state.profile = validator.logToken(profile);
  },
  setIdToken(state, idtoken) {
    state.id_token = validator.logToken(idtoken);
  },
  setSessionState(state, sessionstate) {
    state.session_state = validator.logToken(sessionstate);
  },
  setAcessToken(state, accesstoken) {
    state.access_token = validator.logToken(accesstoken);
  },
  setScopes(state, scopes) {
    state.scopes = validator.logToken(scopes);
  },
  setRole(state, role) {
    state.role = role;
  },
  setNewToken(state, newtoken) {
    state.new_token = validator.logToken(newtoken);
  }
};

const validator = {
  logToken() {
    for (let index = 0; index < arguments.length; index++) {
      const msg = arguments[index];
      if (msg instanceof Error) {
        msg = 'Error: ' + msg.message;
      } else if (typeof msg !== 'string') {
        msg = JSON.stringify(msg, null, 2);
      }
      return msg;
    }
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
