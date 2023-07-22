import axios from "axios";

const staticIp = "localhost:8080";
const base_url = `http://${staticIp}/rovista/api`;

class RoaApi {
    getOverview() {
        return axios.get(base_url+'/overview');
    }

    getAsSpecificRatio(asn_id){
        return axios.get(base_url+`/AS-roa-ratios/${asn_id}`)
    }
}

export default new RoaApi();