# Phillies Take Home Assignment
Create a dashboard that displays useful Trackman data without being overwhelming to the user.

## Motivation
As a former pitcher, my focus was always on repeatability. The better I could repeat my mechanics from pitch to pitch, the more effective I became in attacking hitters. I chose to display velocity, movement, usage, and release because when it comes to post game reviews, these are the metrics I would focus on first.

## Installation
```sh
npm install
npm run dev
```

If you have `bun` installed on your device you can run these commands instead:
```sh
bun install
bun dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the development server running. Your console will also output the URL.

## Usage
The dashboard is broken up into 4 sections: velocity, movement, usage, and release. Each section has a chart that displays the data. Each chart has interactive elements to it whether it be a tooltip or filtering by pitch type. 

### Controls
- **Current Pitcher**: Select a pitcher from the dropdown to view their data.
- **Pitch Type**: Select a pitch type from the tabs to filter the charts by that pitch type. Only available pitches will be displayed in the tabs.
- **Data Type**: On the right side of the screen will be a toggle to switch between visual charts or raw data. The raw data will be displayed in a table format.

### Velocity Chart
The velocity chart displays the average and peak velocity in the top right of its container. The chart itself is a line chart that displays the velocity of each pitch thrown. Hovering over a data point will display a tooltip with the velocity and pitch type.

### Movement Chart
The movement chart displays the average horizontal break and induced vertical break. I chose induced vertical break because it factors in gravity.  The chart itself is a scatter plot that displays the horizontal and vertical movement of each pitch thrown. Hovering over a data point will display a tooltip with the horizontal and vertical movement and pitch type. The chart also has a toggle in the top right of its container to show all pitches or just the one selected in the pitch type toggle.

### Usage Chart
The usage chart displays the percentage of pitches thrown for each pitch type. The chart itself is a bar chart that displays the percentage of each pitch type thrown. Hovering over a bar will display a tooltip with the pitch type and percentage. There are additional containers below the chart that display the percentage of each pitch thrown.

### Release Chart
The release chart displays the release side and release height. The chart itself is a scatter plot that displays the release side and release height of each pitch thrown. Hovering over a data point will display a tooltip with the release side, release height, and pitch type. The chart also has a toggle in the top right of its container to show all pitches or just the one selected in the pitch type toggle.

#### Post Game Notes
There is a section below the charts for the user to enter post game review notes. Considering it is a 'post game reporting dashboard', I assumed there is an api in place to save the notes. It is not functional in this demo.

## Tech Stack
- React
- [Recharts](https://recharts.org/en-US/) - Chart library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Vite](https://vitejs.dev/) - Build tool

## Personal Notes
I chose these particular packages to build the dashboard because I have previous experience with them and the final product would be a good representation of my skillset. I reviewed the docs for Shiny and Dash as well and I am confident I could learn them quickly if needed. I also recognize that `python` is the preferred language for digesting data of this nature. I have some experience with `python` but I am more comfortable with `javascript` and `typescript`. I have no doubt I could learn the necessary tech stack to build applications like this if needed. 