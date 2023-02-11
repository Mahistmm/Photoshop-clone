import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Slider from "./components/slider/Slider";
import * as htmlimage from "html-to-image";
import * as downloaded from "downloadjs"

const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value:100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
];

const App = () => {
  const [image, setImage] = useState(null);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [selectedindex, setSelectedindex] = useState(0);

  const selected = options[selectedindex];

  const handleChange = (event) => {
    console.log(event.target.files);
    const imageurl = URL.createObjectURL(event.target.files[0]);
    setImage(imageurl);
  };

  const appllyfilter = () => {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit}) `;
    });
    return {
      filter: filters.join(" "),
      backgroundImage: `url(${image})`,
    };
  };

  const sliderchange = ({ target }) => {
    setOptions((preOptions) => {
      return preOptions.map((option, index) => {
        if (index!==selectedindex) return option;
        return {...option,value:target.value };
      });
    });
  };

  const downloadimage = ()=>{
    htmlimage.toPng(document.getElementById('image')).then((downloadurl)=>[
      downloaded(downloadurl,`${Date.now()}.png`)
    ])
  }

  return (
    <div className="app">
      {image ? (
        <div className="main-image" id="image" style={appllyfilter()} />
      ) : (
        <div className="upload-image">
          <h1>Photoshop</h1>
          <input type="file" accept="image/*" onChange={handleChange} />
        </div>
      )}

      <div className="sidebar">
        {options.map((option, index) => {
          return (
            <Sidebar
              key={index}
              name={option.name}
              active={index === selectedindex}
              handleclick={() => setSelectedindex(index)}
            />
          );
        })}
        <button onClick={downloadimage} className='download'>Download</button>
      </div>
      <Slider
        min={selected.range.min}
        max={selected.range.max}
        value={selected.value}
        handleChange={sliderchange}
      />
    </div>
  );
};

export default App;
