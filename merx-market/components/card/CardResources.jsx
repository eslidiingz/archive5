


function CardResources(props) {

    return (
      <>
              <div className="card">
                <img className="card-img-top img-card" 
                src={props.img} 
                alt="Card image"/>
                <div>
                  <p className="text05 mt-2">{props.title}</p>
                </div>
              </div>
      </>
    )
  }
  export default CardResources
  