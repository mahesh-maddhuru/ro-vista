import axios from "axios";

const staticIp = "ec2-3-15-251-42.us-east-2.compute.amazonaws.com";
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