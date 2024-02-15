import {FC, useEffect} from 'react'
import {useParams} from "react-router-dom";
import {DirectionService} from "../../services/Direction";


const SingleDirection: FC = () => {
  const params = useParams()

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        await DirectionService.getDirectionRequest(params.id)
      }
    }

    fetchData()
  }, []);
  console.log(params)
  return <div>Single direction ${params.id}</div>
}

export default SingleDirection