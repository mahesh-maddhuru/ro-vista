import axios from "axios";
import config from "../config.js"
const base_url = `http://${config.hostname}/rovista/api`;

class RoaApi {
    getOverview() {
        return axios.get(base_url+'/overview');
    }

    getAsSpecificRatio(asn_id){
        return axios.get(base_url+`/AS-roa-ratios/${asn_id}`)
    }
}

export default new RoaApi();