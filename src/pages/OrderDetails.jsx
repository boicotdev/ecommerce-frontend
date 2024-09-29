import {useParams} from "react-router-dom";

function OrderDetails() {
  const {id} = useParams()
  return (
    <h1>order {id}</h1>
    )
}

export default OrderDetails;