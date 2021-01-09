import style from "../Style/Home.module.css";
import React, { useEffect, useRef, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const Home = (props) => {
  const [lng, setLng] = useState(44.313388);
  const [lat, setLat] = useState(33.365859);
  const service = useRef(null);
  const about = useRef(null);
  const [value, setValue] = useState("Please write an note to printer.");
  const toAbout = () => {
    about.current.scrollIntoView();
    about.current.focus();
  };
  const toService = () => service.current.scrollIntoView();
  const handleText = (e) => {
    setValue(e.target.value);
  };
  const theMap = useRef(null);
  const history = useHistory();
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLng(position.coords.latitude);
        setLat(position.coords.longitude);
      });
    }
    if (!localStorage.getItem("blog_token")) {
      history.push("/");
    }

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYW1tYXIteWFzaXIiLCJhIjoiY2tnemI5ZGg0MTI2eTJ1b2V1czFodjc5NyJ9.0vCsyYA-dbvDXbfYcGdV7A";
    var map = new mapboxgl.Map({
      container: theMap.current,
      style: "mapbox://styles/ammar-yasir/ckjpmbykr4hgj19t4br6p8a7q",
      center: [lng, lat],
      zoom: 10,
    });

    map.on("load", function () {
      var el = document.createElement("div");
      el.className = style.marker;
      new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);
    });
  }, []);
  const [file, setFile] = useState("");
  const handleFile = (e) => setFile(e.target.files[0]);
  const [open, setOpen] = React.useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem("blog_token"));
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("long", lat);
    formdata.append("lat", lat);
    formdata.append("total", "5000");
    formdata.append("note", value);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    try {
      fetch("https://iq-printer.herokuapp.com/order", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status) setOpen(true);
          else setOpen(false);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {open && (
        <Snackbar open={open} autoHideDuration={5000}>
          <Alert severity="success"> The file success uploaded!</Alert>
        </Snackbar>
      )}
      <div className={style.contaner}>
        <div className={style.buttonContaint}>
          <div className={style.groupButton}>
            <form onSubmit={onSubmit}>
              <input
                type="file"
                className={style.input}
                onChange={handleFile}
              />
              <button type="submit" className={style.button}>
                Upload File
              </button>
            </form>
            <button className={style.button} onClick={toService}>
              Our Servce
            </button>

            <button className={style.button} onClick={toAbout}>
              About Us
            </button>
            <textarea
              className={style.textarea}
              value={value}
              onChange={handleText}
            />
          </div>
        </div>
        <div ref={theMap} className={style.map}></div>
      </div>
      <section ref={service} className={style.section}>
        <strong>Service</strong> Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Voluptatem nulla quae nemo sed neque. Mollitia, ex
        praesentium libero modi, aliquam voluptatem quidem provident beatae
        autem perspiciatis eveniet esse, perferendis iste! Placeat qui pariatur
        omnis quaerat quas culpa adipisci, natus sit minima! Cupiditate eum
        laboriosam in non quos voluptas esse officia a quas illo, voluptatum
        impedit alias? Ipsum et quas autem? Perspiciatis cumque sequi quae modi
        accusantium deleniti, quo ipsum debitis sunt ullam assumenda ut dolores
        cum omnis soluta? Accusantium molestias reprehenderit repudiandae ex
        deleniti exercitationem eaque officiis quas consectetur reiciendis!
      </section>

      <section ref={about} className={style.section}>
        <strong>About Us</strong> Who you are - What matters to you.- What you
        do. -How you do it.- Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Magnam animi numquam atque facere, molestiae doloremque possimus
        id, excepturi dolor eveniet repellat, eligendi officiis nihil aut vero
        ducimus temporibus obcaecati mollitia.
      </section>
    </>
  );
};
export default Home;
