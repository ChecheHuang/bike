import React from 'react'
import location from '../../images/location.png'
import { Link } from 'react-router-dom'
export default function FindBikeLane({ item,setBikeLane }) {
  const { RouteName, Direction, City, Town, CyclingLength } = item
  var distance = ""
  if (Direction !== undefined) {
    distance += Direction
  }
  if (CyclingLength !== undefined) {
    distance += (CyclingLength / 1000).toFixed(2).toString() + "公里"
  }
  const bikeLane=()=>{
    
    setBikeLane(item)
  }
  return (

    <Link onClick={bikeLane} to="/findMap" style={{ textDecoration: 'none' }}>
      <div className='findBikeLane'>
        <div className='bikeLaneName'>{RouteName}</div>
        <div>
          <div className='details'>
            <div className="distance">{distance}</div>
            <div className="cityAndTown">
              <div className="location">
                <img src={location} alt="" />
              </div>
              <div className="city">{City}</div>
              {Town!==undefined && <div className="town">{Town}</div>}
            </div>
          </div>
        </div>
      </div>
    </Link>

  )
}
