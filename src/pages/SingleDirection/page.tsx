import {FC, useEffect} from 'react'
import {useParams} from "react-router-dom";
import {DirectionService} from "../../services/Direction";


const SingleDirection: FC = () => {
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await DirectionService.getDirectionRequest({id})
      }
    }

    fetchData()
  }, []);

  return <div>Single direction</div>
}

export default SingleDirection