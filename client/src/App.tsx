import React from 'react';
import './App.css';
import { Route, Routes, Switch, useHistory, useLocation } from "react-router-dom";
import { getJSONData } from "./Tools/Toolkit";
import { JSONData, Technology, Course } from "./Tools/data.model";
import Error from "./components/Error/Error";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import Roster from "./components/Roster/Roster";

const RETRIEVE_SCRIPT:string = "http://localhost:8080/get";

function App() {

  // ---------------------------------------------- event handlers
  const onResponse = (result:JSONData) => {
    setLoading(false);
    setCourses(result.courses);
    setTechnologies(result.technologies);
  };

  const onError = () => console.log("*** Error has occured during AJAX data transmission");

  // ---------------------------------------------- lifecycle hooks

  React.useEffect(() => {
    // getting json from api
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  } , []);

  // --------------------------------------------- state setup
  const [technologies, setTechnologies] = React.useState<Technology[]>([]);
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true); 

  // const fetchData = () => {
  //   // had to use this function for the loading overlay and data 
  //   setLoading(true);
  //   getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  // }

  return (
    <div className="main">

      <LoadingOverlay bgColor="#2ea77f" spinnerColor="#FFFFFF" enabled={loading} />

      <div className="header">
            _Technology Roster : Course Admin
      </div>

      {(technologies.length > 0 && courses.length > 0) ?
          <Switch>
            <Route path="/">
              <Roster technologies={technologies} courses={courses} setLoading={loading} />
            </Route>

            <Route>
              <Error/>
            </Route>

            {/* <Route path="/list"
              element={ <List technologies={technologies} courses={courses} fetchData={fetchData} setLoading={setLoading}/> }
              />
            <Route path="/tech/delete/:id"
              element={ <DeleteTech technologies={technologies} courses={courses} fetchData={fetchData} setLoading={setLoading}/> }
              />
            <Route path="/tech/add"
              element={ <AddTech technologies={technologies} courses={courses} fetchData={fetchData} setLoading={setLoading}/> }
              />
            <Route path="/course/delete/:id"
              element={ <DeleteCourse technologies={technologies} courses={courses} fetchData={fetchData} setLoading={setLoading}/> }
              />
            <Route path="/course/add"
              element={ <AddCourse technologies={technologies} courses={courses} fetchData={fetchData} setLoading={setLoading}/> }
              />
            <Route path="/course/edit/:id"
              element={ <EditCourse technologies={technologies} courses={courses} fetchData={fetchData} setLoading={setLoading}/> }
              />
            <Route path="/tech/edit/:id"
              element={ <EditTech technologies={technologies} courses={courses} fetchData={fetchData} setLoading={setLoading}/> }
              /> */}
        </Switch>
      :
        <div className="error">There are currently no technologies and courses in the database :(</div>}

        <div className="footer">Web App powered by 
        <span className="footer__stack">MERN Stack</span>
        </div>
    </div>
  );
}

export default App;
