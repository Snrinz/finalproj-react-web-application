import history from './history';

class Auth {
    url = "/api/user/";
    profile = {};
    signin = (data, error) => { // data consists of email and password
      let option = {  
        method: 'POST', headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
      fetch (`${this.url}signin`, option)
      .then(result => {
        if (result.ok) return result.json()
        else throw result;
      })
      .then(result => {
        if (result) {
            let {user} = result;
            localStorage.setItem('token', user.token);
            localStorage.setItem('id_token', user._id);
            let expiresAt = JSON.stringify((user.expiresIn * 1000 + new Date().getTime()))
            localStorage.setItem('expiresAt', expiresAt)
            this.profile = user
            history.replace('/authcheck') 
      }})
      .catch(async err => {
        let msg = await err.json(); 
        error({globalError: msg.errors.global}) 
      })
    };
    getToken = (token) => localStorage.getItem(token)? localStorage.getItem(token): null;
    getProfile = () => {
      let token = this.getToken('token');
      let id = this.getToken('id_token');
      let option = {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
      }
      if(token && id) {
        let user = fetch (`${this.url}/user/${id}`, option)
                        .then(result => {
                          if(result && result.ok) 
                              return result.json()   // result will be {user: {}}
                            else return null;
                        })
        this.profile = user
      }
      else this.profile = null
      return this.profile
    };
    signout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('id_token')
      localStorage.removeItem('expiresAt')
      setTimeout(() => { history.push('/authcheck') }, 600);
    };
    isAuthenticated = () => {
      let expiresAt = JSON.parse(this.getToken('expiresAt'))
      return expiresAt && (new Date().getTime() < expiresAt)
    }
}

export default Auth;