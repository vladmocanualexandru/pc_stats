import axios from 'axios';

export default class Api{
    
    public static getSystemInfo(){
        return axios.get(`${process.env.REACT_APP_SERVER}/pcstats_aggregator/get-system-info`)
        .then(res => {
            return res.data;
        }).catch(error => {
            throw error;
          });
    }

    public static getSystemStatus(){
        return axios.get(`${process.env.REACT_APP_SERVER}/pcstats_aggregator/get-system-status`)
        .then(res => {
            return res.data;
        }).catch(error => {
            throw error;
          });
    }
}