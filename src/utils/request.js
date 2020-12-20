import axios from 'axios';

axios.interceptors.request.use(config => {
    const passURL = ['/api/login', '/api/register'];
    
    if(passURL.includes(config.url))
    {
        return config;
    }
  
    const token = localStorage.getItem('storeTOKEN');
    if(token)
    {   
        config.headers.Authorization = 'Bearer ' + token;
    }
    else
    {
        // console.log('reachhere')
        delete config.headers.Authorization;
    }
    return config;
})

axios.interceptors.response.use(response=>
{

    const {status, msg} = response.data;
    if(status === 1 && msg === 'TOKEN has some error')
    {
        window.location.href='./login';
    }
    return response;
});

export default axios;
 