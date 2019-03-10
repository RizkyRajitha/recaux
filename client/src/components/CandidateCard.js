import React from "react";

const CandidateCard = props => {
  return (
    <div>
      
      <div class="card  bg-light mb-3 w-75">
        <div class="card-body">
          <h4 class="card-title">{props.name}</h4>
          <p class="card-text">
            <ul>
              <li>job spechification :{props.jobspec}</li>
              <li>email :{props.email} </li>
            </ul>
          </p>
          <a href="/candidate/" class="btn btn-primary">
            view
          </a>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
