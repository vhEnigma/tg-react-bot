import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "../../constants/tanstack.ts";
import {UserService} from "../../services/User";
import {TokenService} from "../../services/TokenService";

const useLoginUser = (tgData:string) => {
    const {data:token, isLoading} = useQuery({
        queryKey: [QUERY_KEYS.loginUser, tgData],
        queryFn: () => UserService.loginUserRequest(tgData),
        select: ({token}) => token
    })

    if (token) {
        TokenService.saveToken(token)
    }

    return {isLoading}
}

export default useLoginUser