import style from "../Style/Home.module.css";
import React, { useEffect, useRef, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
var geolocate = new mapboxgl.GeolocateControl();

const users = [
  {
    id: 1,
    name: "Muartdha",
    coordinates: [-77.038659, 38.931567],
    image: "https://placekitten.com/g/40/40/",
    color: "#ff9800",
  },
  {
    id: 2,
    name: "Ali",
    coordinates: [44.31, 33.36],
    image: "https://placekitten.com/g/50/50/",
    color: "#e91e63",
  },
];
const Home = (props) => {
  let lant, lat;
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
  useEffect(() => {
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
      rel="stylesheet"
    />;

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYW1tYXIteWFzaXIiLCJhIjoiY2tnemI5ZGg0MTI2eTJ1b2V1czFodjc5NyJ9.0vCsyYA-dbvDXbfYcGdV7A";
    var map = new mapboxgl.Map({
      container: "theMap",
      style: "mapbox://styles/ammar-yasir/ckjiz2ac404sr19nxbunmg4g2",
      center: [44.313388, 33.365859],
      zoom: 10,
    });
    //TODO: add user cordinate
    // map.addControl(geolocate);
    // geolocate.on("geolocate", function (e) {
    //   var lon = e.coords.longitude;
    //   var lat = e.coords.latitude;
    //   var position = [lon, lat];
    //   console.log("position");
    // });
    // if (navigator.geolocation) {
    //   console.log("test");
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     lant = position.coords.longitude;
    //     lat = position.coords.latitude;
    //   });
    //   console.log(lant);
    // }
    ///////////////
    map.on("load", function () {
      users.map((user) => {
        var el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = `url(${user.image})`;
        el.style.width = "40px";
        el.style.height = "40px";
        el.style.borderRadius = "50%";
        el.style.borderColor = user.color;
        el.style.borderWidth = "2px";
        el.style.borderStyle = "solid";

        new mapboxgl.Marker(el)
          .setLngLat(user.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<h1>${user.name}</h1>`))
          .addTo(map);
      });
    });

    // map.on("load", function () {
    //   map.addSource("places", {
    //     type: "geojson",
    //     data: {
    //       type: "FeatureCollection",
    //       features: [
    //         {
    //           type: "Feature",
    //           properties: {
    //             description:
    //               '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
    //             icon: "theatre",
    //           },
    //           geometry: {
    //             type: "Point",
    //             coordinates: [-77.038659, 38.931567],
    //           },
    //         },
    //       ],
    //     },
    //   });
    // });
    // map.on("mouseenter", "places", function () {
    //   map.getCanvas().style.cursor = "pointer";
    // });
    // map.on("mouseleave", "places", function () {
    //   map.getCanvas().style.cursor = "";
    // });
  });
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("File Name");
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const [open, setOpen] = React.useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2MjE1NjIxfQ.1DtLQa4Iu1GnKiAV43QG1r-vLCxLLss13rc6vvk8a_A"
    );
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("long", lant);
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
      {open ? (
        <Snackbar open={open} autoHideDuration={5000}>
          <Alert severity="success"> The file success uploaded!</Alert>
        </Snackbar>
      ) : (
        console.log("correct info!")
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
                {filename}
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
        <div id="theMap" className={style.map}></div>
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
