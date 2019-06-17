import React from "react";

import "./Driver.css";
import Lonely from "./lonely girl.jpg";
import { Row, Col, Button } from "react-bootstrap";
import FormD from "./FormD";

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <img
            src={
              "https://images.all-free-download.com/images/graphiclarge/adult_asphalt_blur_boy_car_606349.jpg"
            }
            alt="logo"
            className="img-responsive img-thumbnail mt-5 Lonely"
          />
        </div>

        <div className="col">
          <div className=" TopTxt ">
            <p> ACCOUNT LOGIN </p>
          </div>
          <FormD className="Log" />
          <div className="row">
            <Button
              color="success"
              size="md"
              className=" ml-5 my-3 w-50 bg-success rounded-0  "
            >
              Sign In
            </Button>
          </div>
          <div className="  Forgot ">
            <p>
              Forgot{" "}
              <a href="" style={{ color: "green ", fontSize: 17 }}>
                {" "}
                Username/Password ?{" "}
              </a>
            </p>
          </div>
          <div className=" SignUp ">
            <a href="" style={{ color: "green ", fontSize: 19 }}>
              {" "}
              SignUp{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
