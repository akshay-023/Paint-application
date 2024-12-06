// import React, { useRef, useState, useEffect } from 'react';
// import 'tailwindcss/tailwind.css'; // Assuming you have Tailwind CSS set up

// const ErrorAlert = ({ children }) => (
//   <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm">
//     {children}
//   </div>
// );

// const BrushSettingsForm = ({ setLineColor, setLineWidth, setLineOpacity }) => {
//   const [formValues, setFormValues] = useState({
//     color: "#000000",
//     width: "5",
//     opacity: "10"
//   });
  
//   const [errors, setErrors] = useState({});

//   const validateForm = (name, value) => {
//     switch (name) {
//       case 'width':
//         return value >= 3 && value <= 20 ? '' : 'Brush Width must be between 3 and 20';
//       case 'opacity':
//         return value >= 1 && value <= 100 ? '' : 'Brush Opacity must be between 1 and 100';
//       default:
//         return '';
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const error = validateForm(name, value);
    
//     setFormValues(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     setErrors(prev => ({
//       ...prev,
//       [name]: error
//     }));

//     if (!error) {
//       // Update canvas settings
//       switch (name) {
//         case 'color':
//           setLineColor(value);
//           break;
//         case 'width':
//           setLineWidth(value);
//           break;
//         case 'opacity':
//           setLineOpacity(value / 100);
//           break;
//         default:
//           console.warn(`Unexpected form field: ${name}`);
//       }
//     }
//   };

//   return (
//     <form className="flex flex-col items-center">
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
//           Brush Color
//         </label>
//         <input 
//           type="color" 
//           name="color" 
//           id="color" 
//           value={formValues.color} 
//           onChange={handleChange} 
//           className="border rounded p-2"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="width">
//           Brush Width
//         </label>
//         <input 
//           type="number" 
//           name="width" 
//           id="width" 
//           value={formValues.width} 
//           min="3" 
//           max="20" 
//           onChange={handleChange} 
//           className="border rounded p-2"
//         />
//         {errors.width && <ErrorAlert>{errors.width}</ErrorAlert>}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="opacity">
//           Brush Opacity
//         </label>
//         <input 
//           type="number" 
//           name="opacity" 
//           id="opacity" 
//           value={formValues.opacity} 
//           min="1" 
//           max="100" 
//           onChange={handleChange} 
//           className="border rounded p-2"
//         />
//         {errors.opacity && <ErrorAlert>{errors.opacity}</ErrorAlert>}
//       </div>
//     </form>
//   );
// };

// const App = () => {
//   const canvasRef = useRef(null);
//   const ctxRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
  
//   const [lineWidth, setLineWidth] = useState(5);
//   const [lineColor, setLineColor] = useState("black");
//   const [lineOpacity, setLineOpacity] = useState(0.1);
  
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";
//     ctx.globalAlpha = lineOpacity;
//     ctx.strokeStyle = lineColor;
//     ctx.lineWidth = lineWidth;
//     ctxRef.current = ctx;
//   }, [lineColor, lineOpacity, lineWidth]);

//   const startDrawing = (e) => {
//     ctxRef.current.beginPath();
//     ctxRef.current.moveTo(
//       e.nativeEvent.offsetX,
//       e.nativeEvent.offsetY
//     );
//     setIsDrawing(true);
//   };

//   const endDrawing = () => {
//     ctxRef.current.closePath();
//     setIsDrawing(false);
//   };

//   const draw = (e) => {
//     if (!isDrawing) return;
//     ctxRef.current.lineTo(
//       e.nativeEvent.offsetX,
//       e.nativeEvent.offsetY
//     );
//     ctxRef.current.stroke();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center">
//       <h1 className="font-['Lobster'] text-5xl text-blue-600 my-6">Paint App</h1>
//       <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
//         <BrushSettingsForm
//           setLineColor={setLineColor}
//           setLineWidth={setLineWidth}
//           setLineOpacity={setLineOpacity}
//         />
//         <canvas
//           onMouseDown={startDrawing}
//           onMouseUp={endDrawing}
//           onMouseMove={draw}
//           ref={canvasRef}
//           width={1280}
//           height={720}
//           className="border border-gray-200"
//         />
//       </div>
//     </div>
//   );
// };

// export default App;










import React, { useRef, useState, useEffect, useCallback } from 'react';
import './App.css';

const BrushSettingsForm = ({ setLineColor, setLineWidth, setLineOpacity, setCanvasSize }) => {
  const [formValues, setFormValues] = useState({
    color: "#000000",
    width: "5",
    opacity: "100",
    widthCanvas: "800", // Smaller canvas width
    heightCanvas: "600", // Smaller canvas height
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "color":
        setLineColor(value);
        break;
      case "width":
        setLineWidth(Number(value));
        break;
      case "opacity":
        setLineOpacity(Number(value) / 100);
        break;
      case "widthCanvas":
      case "heightCanvas":
        setCanvasSize((prev) => ({
          ...prev,
          [name === "widthCanvas" ? "width" : "height"]: Number(value),
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="controls">
      <label>
        Brush Color:
        <input type="color" name="color" value={formValues.color} onChange={handleChange} />
      </label>
      <label>
        Brush Width:
        <input
          type="number"
          name="width"
          value={formValues.width}
          min="3"
          max="20"
          onChange={handleChange}
        />
      </label>
      <label>
        Brush Opacity:
        <input
          type="range"
          name="opacity"
          value={formValues.opacity}
          min="1"
          max="100"
          onChange={handleChange}
        />
      </label>
      <label>
        Canvas Width:
        <input
          type="number"
          name="widthCanvas"
          value={formValues.widthCanvas}
          onChange={handleChange}
        />
      </label>
      <label>
        Canvas Height:
        <input
          type="number"
          name="heightCanvas"
          value={formValues.heightCanvas}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

const App = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("#000000");
  const [lineOpacity, setLineOpacity] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 }); // Smaller canvas size
  const [strokes, setStrokes] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = lineOpacity;
    ctxRef.current = ctx;
  }, [lineColor, lineWidth, lineOpacity, canvasSize]);

  const redrawCanvas = useCallback((strokesToDraw) => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    strokesToDraw.forEach(({ points, color, width, opacity }) => {
      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = width;
      ctxRef.current.globalAlpha = opacity;
      ctxRef.current.beginPath();
      points.forEach((point, index) => {
        if (index === 0) ctxRef.current.moveTo(point.x, point.y);
        else ctxRef.current.lineTo(point.x, point.y);
      });
      ctxRef.current.stroke();
    });
  }, []);

  const undo = useCallback(() => {
    if (strokes.length === 0) return;
    const updatedStrokes = [...strokes];
    const removedStroke = updatedStrokes.pop();
    setStrokes(updatedStrokes);
    setRedoStack((prev) => [...prev, removedStroke]);
    redrawCanvas(updatedStrokes);
  }, [strokes, redrawCanvas]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const updatedRedoStack = [...redoStack];
    const restoredStroke = updatedRedoStack.pop();
    setStrokes((prev) => [...prev, restoredStroke]);
    setRedoStack(updatedRedoStack);
    redrawCanvas([...strokes, restoredStroke]);
  }, [redoStack, strokes, redrawCanvas]);

  const saveCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
  }, []);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setStrokes((prev) => [...prev, { points: [], color: lineColor, width: lineWidth, opacity: lineOpacity }]);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
    setStrokes((prev) => {
      const updatedStrokes = [...prev];
      updatedStrokes[updatedStrokes.length - 1].points.push({ x: offsetX, y: offsetY });
      return updatedStrokes;
    });
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    setRedoStack([]);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.ctrlKey && e.key === "z") undo();
      if (e.ctrlKey && e.key === "y") redo();
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        saveCanvas();
      }
    },
    [undo, redo, saveCanvas]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="app">
      <h1>Paint App</h1>
      <BrushSettingsForm
        setLineColor={setLineColor}
        setLineWidth={setLineWidth}
        setLineOpacity={setLineOpacity}
        setCanvasSize={setCanvasSize}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        className="canvas"
        style={{
          border: "1px solid black",
          display: "block",
          margin: "0 auto",
        }}
      />
      <div className="shortcuts">
        <p>Shortcuts:</p>
        <ul>
          <li>Ctrl+Z: Undo</li>
          <li>Ctrl+Y: Redo</li>
          <li>Ctrl+S: Save as Image</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
