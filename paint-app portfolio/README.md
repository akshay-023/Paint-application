# Paint-application

Overview

The Paint App is a React drawing application that's simple yet packed full of features. Users can draw freehand shapes, customize brushes and export creations to images. For practicing the digital art or playing around with what you can possible do creatively, this App is just great.
________________________________________
##Features

Customizable Brush Settings

  •	Select a color from the Color Picker as your brush color.
  
  •	Adjust brush width (3-20px).
  
  •	Control brush opacity to create transparent effects.
  
Undo/Redo Functionality

  •	Undo or redo your last actions.
  
Save Canvas

  •	One-click publishing of PNG image of your drawing.
  
Customizable Canvas Size

  •	Responsive canvas dimensions.
  
Keyboard Shortcuts

  •	Ctrl+Z: Undo.
  
  •	Ctrl+Y: Redo.
  
  •	Ctrl+S: Save the canvas.

##Screenshots/GIFs 

 ![Screenshot 2024-12-05 135256](https://github.com/user-attachments/assets/2fb1c7ac-eaeb-4118-8ae0-1cf2ee090040)
 ![Screenshot 2024-12-05 135856](https://github.com/user-attachments/assets/7e4d6758-c588-4c64-8ce1-8ecb6ac6472a)
_______________________________________
##Setup/Installation

Prerequisites

•	Node. You need to have node. js and npm installed on your machine.

•	Those include a text editor (say VSCode) and git installed on your environment.

#Steps

1.	Clone the Repository:
   
git clone https://github.com/yourusername/paint-app.git  

cd paint-app  

3.	Install Dependencies:
   
npm install  

5.	Run the Application:
   
npm start  

Open your browser and visit http://localhost:3000 to view the app.
________________________________________
##Challenges and Solutions

1. Missing Dependency Warnings
 
•	Challenge: React warned about missing dependencies in useCallback and useEffect.

•	Solution: Memoized dependent functions (undo, redo, redrawCanvas, and saveCanvas) using useCallback, ensuring they are stable and included in dependency arrays.

2. Maintaining Undo/Redo Functionality
   
•	Challenge: Managing the state of strokes and ensuring proper canvas redraw during undo/redo actions.

•	Solution: Implemented an array-based approach to store stroke history and created a redrawCanvas function for efficient canvas updates.

3. Dynamic Canvas Resizing
   
•	Challenge: Allowing the user to dynamically resize the canvas while maintaining previous drawings.

•	Solution: Used React state to store canvas dimensions and adjusted the canvas size dynamically.
________________________________________
##Future Enhancements

•	Add advanced shape tools (e.g., rectangles, circles, polygons).

•	Enable layer management for professional-grade editing.

•	Add collaboration features for real-time drawing.

•	Integrate animations or GIF creation from drawings.
________________________________________
##License

This project is licensed under the MIT License. See the LICENSE file for details.
