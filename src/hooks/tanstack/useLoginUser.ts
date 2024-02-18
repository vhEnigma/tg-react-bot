import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "../../constants/tanstack.ts";
import {UserService} from "../../services/User";
import {TokenService} from "../../services/TokenService";

const useLoginUser = (tgData:string) => {
    console.log(tgData, 'TG DATA')
    const {data:token} = useQuery({
        queryKey: [QUERY_KEYS.loginUser, tgData],
        queryFn: () => UserService.loginUserRequest(tgData),
        select: ({token}) => token
    })

    if (token) {
        TokenService.saveToken(token)
    }
}

export default useLoginUser