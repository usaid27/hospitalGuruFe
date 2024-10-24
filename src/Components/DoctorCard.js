import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// import DocProfile from "./DocProfile";

function DoctorCard(props) {
  

  return (
    <>
    <div className="dt-card" style={{cursor:"pointer"}}>
      <img src={props.img} alt={props.item.name} className="dt-card-img" />
      <p className="dt-card-name">{props.item.name}</p>
      <p className="dt-card-title">{props.item.specialization}</p>
      <p className="dt-card-stars">
        <FontAwesomeIcon
          icon={faStar}
          style={{ color: "#F7BB50", paddingRight: "6px" }}
        />
        {props.stars}
        <span className="dt-card-reviews"> ({props.reviews}+ Reviews)</span>
      </p>
    </div>
    
    </>
  );
}

export default DoctorCard;
